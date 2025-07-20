// Feature-specific types for News (JavaScript version with JSDoc)

/**
 * @typedef {Object} NewsArticle
 * @property {string} _id
 * @property {string} title
 * @property {string} [description]
 * @property {string} url
 * @property {string} [image]
 * @property {string} publishedAt
 * @property {Object} [source]
 * @property {string} source.name
 * @property {string} [topic]
 */

/**
 * @typedef {Object} NewsMetadata
 * @property {number} totalPages
 * @property {boolean} hasNext
 * @property {boolean} hasPrev
 * @property {number} currentPage
 * @property {number} totalItems
 */

/**
 * @typedef {Object} NewsResponse
 * @property {NewsArticle[]} articles
 * @property {NewsMetadata} metadata
 */

/**
 * @typedef {Object} NewsSearchParams
 * @property {string} region
 * @property {number} page
 * @property {number} limit
 * @property {string} [query]
 */

/**
 * @typedef {Object} NewsState
 * @property {string} selectedRegion
 * @property {number} currentPage
 * @property {number} pageSize
 * @property {string} searchQuery
 */

// Export empty object to make this a module
export {};
