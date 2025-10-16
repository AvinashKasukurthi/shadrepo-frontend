/**
 * Utility functions for UTM parameter handling
 */

/**
 * Default UTM parameters configuration
 */
export const DEFAULT_UTM_PARAMS = {
  source: 'shadrepo',
  medium: 'website',
  campaign: 'github-contribution',
};

/**
 * Adds UTM parameters to a URL
 * @param {string} url - The base URL
 * @param {Object} customParams - Custom UTM parameters to override defaults
 * @returns {string} URL with UTM parameters
 */
export function addUTMParams(url, customParams = {}) {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams();

    // Merge default params with custom params
    const allParams = { ...DEFAULT_UTM_PARAMS, ...customParams };

    // Add UTM parameters to URL search params
    Object.entries(allParams).forEach(([key, value]) => {
      if (value) {
        params.set(`utm_${key}`, value);
      }
    });

    // Merge with existing query parameters
    const existingParams = new URLSearchParams(urlObj.search);
    existingParams.forEach((value, key) => {
      if (!key.startsWith('utm_')) {
        params.set(key, value);
      }
    });

    urlObj.search = params.toString();
    return urlObj.toString();
  } catch (error) {
    console.error('Error adding UTM parameters:', error);
    return url; // Return original URL if there's an error
  }
}

/**
 * Predefined UTM parameter sets for different contexts
 */
export const UTM_CONTEXTS = {
  github_contribution: {
    source: 'shadrepo',
    medium: 'banner',
    campaign: 'github-contribution',
  },
  hero_banner: {
    source: 'shadrepo',
    medium: 'hero',
    campaign: 'main-cta',
  },
  navigation: {
    source: 'shadrepo',
    medium: 'nav',
    campaign: 'site-navigation',
  },
  registry_click: {
    source: 'shadrepo',
    medium: 'registry-card',
    campaign: 'external-registry',
  },
};