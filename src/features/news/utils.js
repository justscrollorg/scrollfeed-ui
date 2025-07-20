// News feature utilities

/**
 * Format date for display
 * @param {string} dateString 
 * @returns {string}
 */
export const formatPublishDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 24 * 7) {
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  } catch (error) {
    return 'Unknown date';
  }
};

/**
 * Extract domain from URL
 * @param {string} url 
 * @returns {string}
 */
export const extractDomain = (url) => {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch (error) {
    return 'Unknown source';
  }
};

/**
 * Truncate text to specified length
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Validate image URL
 * @param {string} imageUrl 
 * @returns {boolean}
 */
export const isValidImageUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== 'string') return false;
  
  try {
    const url = new URL(imageUrl);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Get placeholder image based on topic
 * @param {string} topic 
 * @returns {string}
 */
export const getPlaceholderImage = (topic = 'general') => {
  const placeholders = {
    sports: 'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=Sports+News',
    technology: 'https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Tech+News',
    politics: 'https://via.placeholder.com/400x200/EF4444/FFFFFF?text=Politics',
    business: 'https://via.placeholder.com/400x200/10B981/FFFFFF?text=Business',
    health: 'https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=Health',
    general: 'https://via.placeholder.com/400x200/6B7280/FFFFFF?text=News',
  };
  
  return placeholders[topic.toLowerCase()] || placeholders.general;
};

/**
 * Get region display name
 * @param {string} regionCode 
 * @returns {string}
 */
export const getRegionDisplayName = (regionCode) => {
  const regionNames = {
    us: 'United States',
    in: 'India',
    de: 'Germany',
    fr: 'France',
    gb: 'United Kingdom',
    jp: 'Japan',
    br: 'Brazil',
    ca: 'Canada',
    kr: 'South Korea',
    ru: 'Russia',
  };
  
  return regionNames[regionCode.toLowerCase()] || regionCode.toUpperCase();
};

/**
 * Generate news cache key
 * @param {string} region 
 * @param {number} page 
 * @param {number} limit 
 * @param {string} [query] 
 * @returns {string}
 */
export const generateNewsCacheKey = (region, page, limit, query = '') => {
  return `news_${region}_${page}_${limit}_${query}`.toLowerCase();
};

/**
 * Validate news article data
 * @param {Object} article 
 * @returns {boolean}
 */
export const isValidNewsArticle = (article) => {
  return (
    article &&
    typeof article === 'object' &&
    typeof article.title === 'string' &&
    article.title.trim() !== '' &&
    typeof article.url === 'string' &&
    article.url.trim() !== ''
  );
};

/**
 * Filter articles by keywords
 * @param {Array} articles 
 * @param {string} keywords 
 * @returns {Array}
 */
export const filterArticlesByKeywords = (articles, keywords) => {
  if (!keywords || keywords.trim() === '') return articles;
  
  const searchTerms = keywords.toLowerCase().split(' ').filter(term => term.length > 2);
  
  return articles.filter(article => {
    const searchText = `${article.title} ${article.description || ''}`.toLowerCase();
    return searchTerms.some(term => searchText.includes(term));
  });
};
