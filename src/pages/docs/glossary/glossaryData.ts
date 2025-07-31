// data/glossaryData.ts

/**
 * Define a estrutura de um único item no glossário.
 * Exportar o tipo é uma boa prática para que outros arquivos
 * possam usá-lo com segurança.
 */
export interface GlossaryEntry {
  term: string
  definition: string
}

/**
 * Array contendo todos os termos e definições do glossário.
 * Este é o array que será importado e renderizado pela página.
 */
export const glossaryData: GlossaryEntry[] = [
  // Os 5 originais
  {
    term: 'API (Application Programming Interface)',
    definition:
      'A set of rules and tools that allows different software applications to communicate with each other.',
  },
  {
    term: 'Webhook',
    definition:
      'An automated message sent from apps when something happens. It has a message (payload) and is sent to a unique URL—a webhook URL.',
  },
  {
    term: 'Endpoint',
    definition:
      'The specific URL where an API can be accessed by a client. Each endpoint corresponds to a specific function or resource.',
  },
  {
    term: 'JSON (JavaScript Object Notation)',
    definition:
      'A lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate.',
  },
  {
    term: 'SDK (Software Development Kit)',
    definition:
      'A collection of software development tools in one installable package, facilitating the creation of applications for a specific platform.',
  },
  // 15 novos exemplos
  {
    term: 'Authentication',
    definition:
      'The process of verifying the identity of a user or service. It answers the question, "Who are you?".',
  },
  {
    term: 'Authorization',
    definition:
      'The process of determining whether an authenticated user has permission to access a specific resource. It answers the question, "What are you allowed to do?".',
  },
  {
    term: 'REST (Representational State Transfer)',
    definition:
      'An architectural style for designing networked applications, relying on a stateless, client-server communication protocol, almost always HTTP.',
  },
  {
    term: 'HTTP Status Code',
    definition:
      'A three-digit number included in an HTTP response from a server, indicating the outcome of the request (e.g., 200 OK, 404 Not Found, 500 Internal Server Error).',
  },
  {
    term: 'Payload',
    definition:
      'The actual data packed in a request or response body. In a POST request, for example, the payload is the data you want to send to the server.',
  },
  {
    term: 'Rate Limiting',
    definition:
      'A strategy for limiting network traffic. It puts a cap on how often someone can repeat an action within a certain timeframe to prevent system abuse.',
  },
  {
    term: 'Idempotency',
    definition:
      'A property of an API operation where making the same request multiple times produces the same result as making it once, without unintended side effects.',
  },
  {
    term: 'CRUD',
    definition:
      'An acronym for the four basic functions of persistent storage: Create, Read, Update, and Delete.',
  },
  {
    term: 'Bearer Token',
    definition:
      'A type of access token used for authentication. The "bearer" of the token is granted access to the associated resources, with no further proof of identity required.',
  },
  {
    term: 'OAuth 2.0',
    definition:
      'An industry-standard protocol for authorization. It enables a third-party application to obtain limited access to an HTTP service on behalf of a resource owner.',
  },
  {
    term: 'CORS (Cross-Origin Resource Sharing)',
    definition:
      'A security mechanism that allows a web page to make requests to a domain different from the one that served the page, which is normally forbidden by browsers.',
  },
  {
    term: 'Query Parameter',
    definition:
      'A set of parameters attached to the end of a URL, used to filter, sort, or paginate results from an API. They are separated by the "?" character.',
  },
  {
    term: 'Path Parameter',
    definition:
      'A variable part of a URL path used to point to a specific resource within a collection, such as an item ID (e.g., /users/{userId}).',
  },
  {
    term: 'Middleware',
    definition:
      'Software that acts as a bridge between an operating system or database and applications, especially on a network. In APIs, it often handles tasks like logging or authentication for every request.',
  },
  {
    term: 'Latency',
    definition:
      'The time delay between a cause and its effect. In networking, it is the time it takes for a data packet to travel from its source to its destination.',
  },
]