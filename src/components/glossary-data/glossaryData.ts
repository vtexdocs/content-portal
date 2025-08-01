interface TermWithStatus {
  text: string
  status?: 'obsolete' | 'notRecommended'
}

export interface GlossaryEntry {
  id: number
  term_en_US: TermWithStatus
  term_pt_BR: TermWithStatus
  term_es_MX: TermWithStatus
  definition: string
}

export const glossaryData: GlossaryEntry[] = [
  {
    id: 1,
    term_en_US: { text: 'API (Application Programming Interface)' },
    term_pt_BR: { text: 'API (Interface de Programação de Aplicações)' },
    term_es_MX: { text: 'API (Interfaz de Programación de Aplicaciones)' },
    definition:
      'A set of rules and tools that allows different software applications to communicate with each other.',
  },
  {
    id: 2,
    term_en_US: { text: 'Webhook' },
    term_pt_BR: { text: 'Webhook', status: 'obsolete' }, // Status aplicado
    term_es_MX: { text: 'Webhook' },
    definition:
      'An automated message sent from apps when something happens. It has a message (payload) and is sent to a unique URL—a webhook URL.',
  },
  {
    id: 3,
    term_en_US: { text: 'Endpoint' },
    term_pt_BR: { text: 'Endpoint (Ponto de Extremidade)' },
    term_es_MX: { text: 'Endpoint (Punto de Conexión)' },
    definition:
      'The specific URL where an API can be accessed by a client. Each endpoint corresponds to a specific function or resource.',
  },
  {
    id: 4,
    term_en_US: { text: 'JSON (JavaScript Object Notation)' },
    term_pt_BR: { text: 'JSON (Notação de Objeto JavaScript)' },
    term_es_MX: {
      text: 'JSON (Notación de Objeto de JavaScript)',
      status: 'notRecommended', // Status aplicado
    },
    definition:
      'A lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate.',
  },
  {
    id: 5,
    term_en_US: { text: 'SDK (Software Development Kit)' },
    term_pt_BR: { text: 'SDK (Kit de Desenvolvimento de Software)' },
    term_es_MX: { text: 'SDK (Kit de Desarrollo de Software)' },
    definition:
      'A collection of software development tools in one installable package, facilitating the creation of applications for a specific platform.',
  },
  {
    id: 6,
    term_en_US: { text: 'Authentication' },
    term_pt_BR: { text: 'Autenticação' },
    term_es_MX: { text: 'Autenticación' },
    definition:
      'The process of verifying the identity of a user or service. It answers the question, "Who are you?".',
  },
  {
    id: 7,
    term_en_US: { text: 'Authorization', status: 'obsolete' }, // Status aplicado
    term_pt_BR: { text: 'Autorização' },
    term_es_MX: { text: 'Autorización' },
    definition:
      'The process of determining whether an authenticated user has permission to access a specific resource. It answers the question, "What are you allowed to do?".',
  },
  {
    id: 8,
    term_en_US: { text: 'REST (Representational State Transfer)' },
    term_pt_BR: { text: 'REST (Transferência de Estado Representacional)' },
    term_es_MX: { text: 'REST (Transferencia de Estado Representacional)' },
    definition:
      'An architectural style for designing networked applications, relying on a stateless, client-server communication protocol, almost always HTTP.',
  },
  {
    id: 9,
    term_en_US: { text: 'HTTP Status Code' },
    term_pt_BR: { text: 'Código de Status HTTP' },
    term_es_MX: { text: 'Código de Estado HTTP' },
    definition:
      'A three-digit number included in an HTTP response from a server, indicating the outcome of the request (e.g., 200 OK, 404 Not Found, 500 Internal Server Error).',
  },
  {
    id: 10,
    term_en_US: { text: 'Payload' },
    term_pt_BR: { text: 'Carga Útil (Payload)' },
    term_es_MX: { text: 'Carga Útil (Payload)' },
    definition:
      'The actual data packed in a request or response body. In a POST request, for example, the payload is the data you want to send to the server.',
  },
  {
    id: 11,
    term_en_US: { text: 'Rate Limiting' },
    term_pt_BR: { text: 'Limitação de Taxa', status: 'notRecommended' }, // Status aplicado
    term_es_MX: { text: 'Límite de Tasa' },
    definition:
      'A strategy for limiting network traffic. It puts a cap on how often someone can repeat an action within a certain timeframe to prevent system abuse.',
  },
  {
    id: 12,
    term_en_US: { text: 'Idempotency' },
    term_pt_BR: { text: 'Idempotência' },
    term_es_MX: { text: 'Idempotencia' },
    definition:
      'A property of an API operation where making the same request multiple times produces the same result as making it once, without unintended side effects.',
  },
  {
    id: 13,
    term_en_US: { text: 'CRUD' },
    term_pt_BR: { text: 'CRUD' },
    term_es_MX: { text: 'CRUD' },
    definition:
      'An acronym for the four basic functions of persistent storage: Create, Read, Update, and Delete.',
  },
  {
    id: 14,
    term_en_US: { text: 'Bearer Token', status: 'obsolete' }, // Status aplicado
    term_pt_BR: { text: 'Token de Portador (Bearer Token)' },
    term_es_MX: { text: 'Token de Portador (Bearer Token)' },
    definition:
      'A type of access token used for authentication. The "bearer" of the token is granted access to the associated resources, with no further proof of identity required.',
  },
  {
    id: 15,
    term_en_US: { text: 'OAuth 2.0' },
    term_pt_BR: { text: 'OAuth 2.0' },
    term_es_MX: { text: 'OAuth 2.0' },
    definition:
      'An industry-standard protocol for authorization. It enables a third-party application to obtain limited access to an HTTP service on behalf of a resource owner.',
  },
  {
    id: 16,
    term_en_US: { text: 'CORS (Cross-Origin Resource Sharing)' },
    term_pt_BR: {
      text: 'CORS (Compartilhamento de Recursos de Origem Cruzada)',
    },
    term_es_MX: { text: 'CORS (Intercambio de Recursos de Origen Cruzado)' },
    definition:
      'A security mechanism that allows a web page to make requests to a domain different from the one that served the page, which is normally forbidden by browsers.',
  },
  {
    id: 17,
    term_en_US: { text: 'Query Parameter' },
    term_pt_BR: { text: 'Parâmetro de Consulta' },
    term_es_MX: { text: 'Parámetro de Consulta' },
    definition:
      'A set of parameters attached to the end of a URL, used to filter, sort, or paginate results from an API. They are separated by the "?" character.',
  },
  {
    id: 18,
    term_en_US: { text: 'Path Parameter' },
    term_pt_BR: { text: 'Parâmetro de Caminho' },
    term_es_MX: { text: 'Parámetro de Ruta', status: 'notRecommended' }, // Status aplicado
    definition:
      'A variable part of a URL path used to point to a specific resource within a collection, such as an item ID (e.g., /users/{userId}).',
  },
  {
    id: 19,
    term_en_US: { text: 'Middleware' },
    term_pt_BR: { text: 'Middleware' },
    term_es_MX: { text: 'Middleware' },
    definition:
      'Software that acts as a bridge between an operating system or database and applications, especially on a network. In APIs, it often handles tasks like logging or authentication for every request.',
  },
  {
    id: 20,
    term_en_US: { text: 'Latency' },
    term_pt_BR: { text: 'Latência' },
    term_es_MX: { text: 'Latencia' },
    definition:
      'The time delay between a cause and its effect. In networking, it is the time it takes for a data packet to travel from its source to its destination.',
  },
]
