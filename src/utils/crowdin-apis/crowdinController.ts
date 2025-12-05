import axios from 'axios'

const crowdinToken = process.env.CROWDIN_TOKEN
const mainGlossaryID = process.env.CROWDIN_ENGLISH_GLOSSARY_ID

const baseURL = 'https://api.crowdin.com'

const CONCEPTS_ENDPOINT_BASE = (glossaryId: string) =>
  `${baseURL}/api/v2/glossaries/${glossaryId}/concepts`
const TERMS_ENDPOINT_BASE = (glossaryId: string) =>
  `${baseURL}/api/v2/glossaries/${glossaryId}/terms`

interface CrowdinConceptApiResponse {
  data: Array<{
    data: {
      id: number
      userId: number
      glossaryId: number
      subject: string | null
      definition: string
      translatable: boolean
      note: string | null
      url: string | null
      figure: string | null
      languagesDetails: any[] //eslint-disable-line
      createdAt: string
      updatedAt: string
    }
  }>
}

interface CrowdinTermApiResponse {
  data: Array<{
    data: {
      id: number
      userId: number
      glossaryId: number
      languageId: string
      text: string
      description: string | null
      partOfSpeech: string | null
      status: 'active' | 'not recommended' | 'obsolete' | 'preferred' | null
      type: string | null
      gender: string | null
      note: string | null
      url: string | null
      conceptId: number
      lemma: string | null
      createdAt: string
      updatedAt: string
    }
  }>
}

interface ConceptData {
  id: number
  definition: string
}

export interface TermData {
  id: number
  text: string
  languageId: string
  conceptId: number
  status: 'active' | 'not recommended' | 'obsolete' | 'preferred' | null
}

export interface FormattedGlossaryEntry {
  id: number
  definition: string
  term_en_US: {
    text: string
    status: 'obsolete' | 'not_recommended' | 'preferred' | null
  } | null
  term_es_MX: {
    text: string
    status: 'obsolete' | 'not_recommended' | 'preferred' | null
  } | null
  term_pt_BR: {
    text: string
    status: 'obsolete' | 'not_recommended' | 'preferred' | null
  } | null
}

const fetchAllPaginatedData = async <T>(url: string): Promise<T[]> => {
  if (!crowdinToken) {
    console.error('Crowdin API Token is not set. Cannot fetch data from:', url)
    return []
  }

  let allData: T[] = []
  let offset = 0
  const limit = 500

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
      })

      const dataBatch = response.data?.data?.map((item: any) => item.data) || [] //eslint-disable-line

      allData = allData.concat(dataBatch)

      if (dataBatch.length < limit) {
        break
      }
      offset += limit
    }
    return allData
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error)
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error details:',
        error.response?.data || error.message
      )
    }
    return []
  }
}

const fetchConcepts = async (glossaryId: string): Promise<ConceptData[]> => {
  if (!glossaryId) {
    console.error('Glossary ID is not provided for fetching concepts.')
    return []
  }
  const rawConcepts = await fetchAllPaginatedData<
    CrowdinConceptApiResponse['data'][number]['data']
  >(CONCEPTS_ENDPOINT_BASE(glossaryId))
  return rawConcepts.map((concept) => ({
    id: concept.id,
    definition: concept.definition,
  }))
}

const fetchTerms = async (glossaryId: string): Promise<TermData[]> => {
  if (!glossaryId) {
    console.error('Glossary ID is not provided for fetching terms.')
    return []
  }
  const rawTerms = await fetchAllPaginatedData<
    CrowdinTermApiResponse['data'][number]['data']
  >(TERMS_ENDPOINT_BASE(glossaryId))
  return rawTerms.map((term) => ({
    id: term.id,
    text: term.text,
    languageId: term.languageId,
    conceptId: term.conceptId,
    status: term.status,
  }))
}

const mapCrowdinStatus = (
  crowdinStatus: TermData['status']
): 'obsolete' | 'not_recommended' | 'preferred' | null => {
  if (crowdinStatus === 'obsolete') return 'obsolete'
  if (crowdinStatus === 'not recommended') return 'not_recommended'
  if (crowdinStatus === 'preferred') return 'preferred'
  return null
}

export const getCrowdinGlossaryData = async (): Promise<
  FormattedGlossaryEntry[]
> => {
  if (!mainGlossaryID) {
    console.error(
      'Crowdin Main Glossary ID (CROWDIN_ENGLISH_GLOSSARY_ID) is not set in .env.local.'
    )
    return []
  }

  try {
    const concepts = await fetchConcepts(mainGlossaryID)
    if (concepts.length === 0) {
      console.warn('No concepts fetched. Returning empty glossary data.')
      return []
    }

    const allTermsFromMainGlossary = await fetchTerms(mainGlossaryID)

    const termMapEn = new Map<number, TermData>()
    const termMapEs = new Map<number, TermData>()
    const termMapPt = new Map<number, TermData>()

    allTermsFromMainGlossary.forEach((term) => {
      if (term.languageId === 'en') {
        termMapEn.set(term.conceptId, term)
      } else if (term.languageId === 'es-MX') {
        termMapEs.set(term.conceptId, term)
      } else if (term.languageId === 'pt-BR') {
        termMapPt.set(term.conceptId, term)
      }
    })

    const formattedData: FormattedGlossaryEntry[] = []

    for (const concept of concepts) {
      const englishTerm = termMapEn.get(concept.id)
      const spanishTerm = termMapEs.get(concept.id)
      const portugueseTerm = termMapPt.get(concept.id)

      if (!englishTerm) {
        console.warn(
          `Concept ID ${concept.id} missing English term in main glossary. Skipping entry.`
        )
        continue
      }

      formattedData.push({
        id: concept.id,
        definition: concept.definition || '',
        term_en_US: {
          text: englishTerm.text,
          status: mapCrowdinStatus(englishTerm.status),
        },
        term_es_MX: spanishTerm
          ? {
              text: spanishTerm.text,
              status: mapCrowdinStatus(spanishTerm.status),
            }
          : null,
        term_pt_BR: portugueseTerm
          ? {
              text: portugueseTerm.text,
              status: mapCrowdinStatus(portugueseTerm.status),
            }
          : null,
      })
    }
    return formattedData
  } catch (error) {
    console.error('Unhandled error in getCrowdinGlossaryData:', error)
    return []
  }
}
