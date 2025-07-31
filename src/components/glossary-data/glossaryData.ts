// data/glossaryData.ts

/**
 * Define a estrutura de um único item no glossário.
 * A propriedade 'status' é opcional.
 */
export interface GlossaryEntry {
  id: number
  term_en_US: string
  term_pt_BR: string
  term_es_MX: string
  definition: string
  approvalDate: string
  status?: 'obsolete' | 'notRecommended' // Propriedade opcional adicionada
}

// Helper para gerar datas aleatórias
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const getRandomApprovalDate = (): string => {
  const randomMonth = months[Math.floor(Math.random() * months.length)]
  return `${randomMonth} 2025`
}

/**
 * Array contendo todos os termos e definições do glossário.
 */
export const glossaryData: GlossaryEntry[] = [
  {
    id: 1,
    term_en_US: 'API (Application Programming Interface)',
    term_pt_BR: 'API (Interface de Programação de Aplicações)',
    term_es_MX: 'API (Interfaz de Programación de Aplicaciones)',
    definition:
      'A set of rules and tools that allows different software applications to communicate with each other.',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 2,
    term_en_US: 'Webhook',
    term_pt_BR: 'Webhook',
    term_es_MX: 'Webhook',
    definition:
      'An automated message sent from apps when something happens. It has a message (payload) and is sent to a unique URL—a webhook URL.',
    approvalDate: getRandomApprovalDate(),
    status: 'obsolete', // Exemplo de status
  },
  {
    id: 3,
    term_en_US: 'Endpoint',
    term_pt_BR: 'Endpoint (Ponto de Extremidade)',
    term_es_MX: 'Endpoint (Punto de Conexión)',
    definition:
      'The specific URL where an API can be accessed by a client. Each endpoint corresponds to a specific function or resource.',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 4,
    term_en_US: 'JSON (JavaScript Object Notation)',
    term_pt_BR: 'JSON (Notação de Objeto JavaScript)',
    term_es_MX: 'JSON (Notación de Objeto de JavaScript)',
    definition:
      'A lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate.',
    approvalDate: getRandomApprovalDate(),
    status: 'notRecommended', // Exemplo de status
  },
  {
    id: 5,
    term_en_US: 'SDK (Software Development Kit)',
    term_pt_BR: 'SDK (Kit de Desenvolvimento de Software)',
    term_es_MX: 'SDK (Kit de Desarrollo de Software)',
    definition:
      'A collection of software development tools in one installable package, facilitating the creation of applications for a specific platform.',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 6,
    term_en_US: 'Authentication',
    term_pt_BR: 'Autenticação',
    term_es_MX: 'Autenticación',
    definition:
      'The process of verifying the identity of a user or service. It answers the question, "Who are you?".',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 7,
    term_en_US: 'Authorization',
    term_pt_BR: 'Autorização',
    term_es_MX: 'Autorización',
    definition:
      'The process of determining whether an authenticated user has permission to access a specific resource. It answers the question, "What are you allowed to do?".',
    approvalDate: getRandomApprovalDate(),
    status: 'obsolete', // Exemplo de status
  },
  {
    id: 8,
    term_en_US: 'REST (Representational State Transfer)',
    term_pt_BR: 'REST (Transferência de Estado Representacional)',
    term_es_MX: 'REST (Transferencia de Estado Representacional)',
    definition:
      'An architectural style for designing networked applications, relying on a stateless, client-server communication protocol, almost always HTTP.',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 9,
    term_en_US: 'HTTP Status Code',
    term_pt_BR: 'Código de Status HTTP',
    term_es_MX: 'Código de Estado HTTP',
    definition:
      'A three-digit number included in an HTTP response from a server, indicating the outcome of the request (e.g., 200 OK, 404 Not Found, 500 Internal Server Error).',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 10,
    term_en_US: 'Payload',
    term_pt_BR: 'Carga Útil (Payload)',
    term_es_MX: 'Carga Útil (Payload)',
    definition:
      'The actual data packed in a request or response body. In a POST request, for example, the payload is the data you want to send to the server.',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 11,
    term_en_US: 'Rate Limiting',
    term_pt_BR: 'Limitação de Taxa',
    term_es_MX: 'Límite de Tasa',
    definition:
      'A strategy for limiting network traffic. It puts a cap on how often someone can repeat an action within a certain timeframe to prevent system abuse.',
    approvalDate: getRandomApprovalDate(),
    status: 'notRecommended', // Exemplo de status
  },
  {
    id: 12,
    term_en_US: 'Idempotency',
    term_pt_BR: 'Idempotência',
    term_es_MX: 'Idempotencia',
    definition:
      'A property of an API operation where making the same request multiple times produces the same result as making it once, without unintended side effects.',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 13,
    term_en_US: 'CRUD',
    term_pt_BR: 'CRUD',
    term_es_MX: 'CRUD',
    definition:
      'An acronym for the four basic functions of persistent storage: Create, Read, Update, and Delete.',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 14,
    term_en_US: 'Bearer Token',
    term_pt_BR: 'Token de Portador (Bearer Token)',
    term_es_MX: 'Token de Portador (Bearer Token)',
    definition:
      'A type of access token used for authentication. The "bearer" of the token is granted access to the associated resources, with no further proof of identity required.',
    approvalDate: getRandomApprovalDate(),
    status: 'obsolete', // Exemplo de status
  },
  {
    id: 15,
    term_en_US: 'OAuth 2.0',
    term_pt_BR: 'OAuth 2.0',
    term_es_MX: 'OAuth 2.0',
    definition:
      'An industry-standard protocol for authorization. It enables a third-party application to obtain limited access to an HTTP service on behalf of a resource owner.',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 16,
    term_en_US: 'CORS (Cross-Origin Resource Sharing)',
    term_pt_BR: 'CORS (Compartilhamento de Recursos de Origem Cruzada)',
    term_es_MX: 'CORS (Intercambio de Recursos de Origen Cruzado)',
    definition:
      'A security mechanism that allows a web page to make requests to a domain different from the one that served the page, which is normally forbidden by browsers.',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 17,
    term_en_US: 'Query Parameter',
    term_pt_BR: 'Parâmetro de Consulta',
    term_es_MX: 'Parámetro de Consulta',
    definition:
      'A set of parameters attached to the end of a URL, used to filter, sort, or paginate results from an API. They are separated by the "?" character.',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 18,
    term_en_US: 'Path Parameter',
    term_pt_BR: 'Parâmetro de Caminho',
    term_es_MX: 'Parámetro de Ruta',
    definition:
      'A variable part of a URL path used to point to a specific resource within a collection, such as an item ID (e.g., /users/{userId}).',
    approvalDate: getRandomApprovalDate(),
    status: 'notRecommended', // Exemplo de status
  },
  {
    id: 19,
    term_en_US: 'Middleware',
    term_pt_BR: 'Middleware',
    term_es_MX: 'Middleware',
    definition:
      'Software that acts as a bridge between an operating system or database and applications, especially on a network. In APIs, it often handles tasks like logging or authentication for every request.',
    approvalDate: getRandomApprovalDate(),
  },
  {
    id: 20,
    term_en_US: 'Latency',
    term_pt_BR: 'Latência',
    term_es_MX: 'Latencia',
    definition:
      'The time delay between a cause and its effect. In networking, it is the time it takes for a data packet to travel from its source to its destination.',
    approvalDate: getRandomApprovalDate(),
  },
]
