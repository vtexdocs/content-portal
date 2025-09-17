import axios from 'axios';

const crowdinToken = process.env.CROWDIN_TOKEN;
const englishGlossaryID = process.env.CROWDIN_ENGLISH_GLOSSARY_ID;
// Removidos spanishGlossaryID e portugueseGlossaryID

const baseURL = 'https://api.crowdin.com';

const CONCEPTS_ENDPOINT_BASE = (glossaryId: string) => `${baseURL}/api/v2/glossaries/${glossaryId}/concepts`;
const TERMS_ENDPOINT_BASE = (glossaryId: string) => `${baseURL}/api/v2/glossaries/${glossaryId}/terms`;


// --- Type Definitions based on your provided API responses ---

interface CrowdinConceptApiResponse {
    data: Array<{
        data: {
            id: number;
            userId: number;
            glossaryId: number;
            subject: string | null;
            definition: string;
            translatable: boolean;
            note: string | null;
            url: string | null;
            figure: string | null;
            languagesDetails: any[];
            createdAt: string;
            updatedAt: string;
        };
    }>;
}

interface CrowdinTermApiResponse {
    data: Array<{
        data: {
            id: number;
            userId: number;
            glossaryId: number;
            languageId: string;
            text: string;
            description: string | null;
            partOfSpeech: string | null;
            status: 'active' | 'not recommended' | 'obsolete' | null; // Tipos de status da API Crowdin
            type: string | null;
            gender: string | null;
            note: string | null;
            url: string | null;
            conceptId: number;
            lemma: string | null;
            createdAt: string;
            updatedAt: string;
        };
    }>;
}

interface ConceptData {
    id: number;
    definition: string;
}

interface TermData {
    id: number;
    text: string;
    languageId: string;
    conceptId: number;
    status: 'active' | 'not recommended' | 'obsolete' | null; // Tipos de status da API Crowdin
}

// O tipo foi ajustado para conter apenas o termo em inglês e refletir os status mapeados ou null
export interface FormattedGlossaryEntry {
    id: number;
    definition: string;
    term_en_US: { text: string; status: 'obsolete' | 'not_recommended' | null }; // Status mapeados ou null
}

// --- Generic Fetching Functions ---

const fetchAllPaginatedData = async <T>(url: string): Promise<T[]> => {
    if (!crowdinToken) {
        console.error('Crowdin API Token is not set. Cannot fetch data from:', url);
        return [];
    }

    let allData: T[] = [];
    let offset = 0;
    const limit = 500; // Aumentamos o limite para tentar buscar mais dados por chamada

    try {
        while (true) {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${crowdinToken}`,
                },
                params: {
                    limit: limit,
                    offset: offset,
                },
            });

            const dataBatch = response.data?.data?.map((item: any) => item.data) || [];

            allData = allData.concat(dataBatch);

            if (dataBatch.length < limit) {
                break; // Parar se a quantidade de dados for menor que o limite, indicando o final
            }
            offset += limit;
        }
        return allData;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', error.response?.data || error.message);
        }
        return [];
    }
};

const fetchConcepts = async (glossaryId: string): Promise<ConceptData[]> => {
    if (!glossaryId) {
        console.error('Glossary ID is not provided for fetching concepts.');
        return [];
    }
    const rawConcepts = await fetchAllPaginatedData<CrowdinConceptApiResponse['data'][number]['data']>(
        CONCEPTS_ENDPOINT_BASE(glossaryId)
    );
    return rawConcepts.map(concept => ({
        id: concept.id,
        definition: concept.definition,
    }));
};

const fetchTerms = async (glossaryId: string): Promise<TermData[]> => {
    if (!glossaryId) {
        console.error('Glossary ID is not provided for fetching terms.');
        return [];
    }
    const rawTerms = await fetchAllPaginatedData<CrowdinTermApiResponse['data'][number]['data']>(
        TERMS_ENDPOINT_BASE(glossaryId)
    );
    return rawTerms.map(term => ({
        id: term.id,
        text: term.text,
        languageId: term.languageId,
        conceptId: term.conceptId,
        status: term.status,
    }));
};


export const getCrowdinGlossaryData = async (): Promise<FormattedGlossaryEntry[]> => {
    if (!englishGlossaryID) {
        console.error('Crowdin English Glossary ID is not set in .env.local.');
        return [];
    }

    console.log("Fetching Crowdin glossary data for English only...");

    try {
        const concepts = await fetchConcepts(englishGlossaryID);
        console.log(`Fetched ${concepts.length} concepts for English.`);
        if (concepts.length === 0) {
            console.warn("No concepts fetched for English. Returning empty glossary data.");
            return [];
        }

        const englishTerms = await fetchTerms(englishGlossaryID);
        console.log(`Fetched ${englishTerms.length} English terms.`);

        const termMapEn = new Map<number, TermData>();
        englishTerms.forEach(term => termMapEn.set(term.conceptId, term));

        const formattedData: FormattedGlossaryEntry[] = [];

        for (const concept of concepts) {
            const englishTerm = termMapEn.get(concept.id);

            if (englishTerm) {
                // Mapeia o status da API do Crowdin para o formato interno
                const mapCrowdinStatus = (crowdinStatus: TermData['status']): 'obsolete' | 'not_recommended' | null => {
                    if (crowdinStatus === 'obsolete') return 'obsolete';
                    if (crowdinStatus === 'not recommended') return 'not_recommended';
                    return null; // Retorna explicitamente null para qualquer outro status (incluindo 'active' e null da API)
                };

                formattedData.push({
                    id: concept.id,
                    definition: concept.definition || '', // Garante que a definição nunca seja undefined
                    term_en_US: {
                        text: englishTerm.text,
                        status: mapCrowdinStatus(englishTerm.status),
                    },
                });
            } else {
                console.warn(`Concept ID ${concept.id} missing English term.`);
            }
        }
        console.log(`Formatted ${formattedData.length} English glossary entries.`);
        return formattedData;
    } catch (error) {
        console.error('Unhandled error in getCrowdinGlossaryData:', error);
        return [];
    }
};