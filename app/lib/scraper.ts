// Web scraping utility functions for data collection
// These are placeholders for future implementation with specific data sources

export interface ScraperConfig {
  url: string;
  selector?: string;
  parser?: 'html' | 'json' | 'rss';
  timeout?: number;
}

/**
 * Fetch HTML from a URL and parse it
 * Future: Integrate with cheerio/jsdom for server-side scraping
 */
export async function fetchHTML(url: string, timeout = 10000) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
}

/**
 * Fetch and parse JSON data from API
 */
export async function fetchJSON<T>(url: string, timeout = 10000): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch JSON from ${url}:`, error);
    throw error;
  }
}

/**
 * Parse RSS feed
 * Future: Use rss parser library
 */
export async function parseRSS(feedUrl: string) {
  try {
    const xml = await fetchHTML(feedUrl);
    // Parse XML and extract items
    // This is a placeholder - use xml2js or similar library in production
    return [];
  } catch (error) {
    console.error('Failed to parse RSS:', error);
    return [];
  }
}

/**
 * Extract data from HTML using CSS selectors
 * Future: Use cheerio for server-side parsing
 */
export function parseHTMLWithSelectors(html: string, selectors: Record<string, string>) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const result: Record<string, any> = {};

  Object.entries(selectors).forEach(([key, selector]) => {
    const element = doc.querySelector(selector);
    result[key] = element?.textContent?.trim() || null;
  });

  return result;
}

/**
 * Retry failed requests with exponential backoff
 */
export async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  throw new Error('All retries failed');
}
