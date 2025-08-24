/**
 * Tool Assets Utilities with Error Handling
 * Academy NoCode - Robust asset management with fallbacks
 */

import { Tool } from '../data/toolsData';

/**
 * Asset paths configuration
 */
const ASSET_PATHS = {
  logos: '/img/tools/logos',
  legacyLogos: '/img/tools',
  screenshots: '/img/tools/screenshots',
  placeholders: '/img/tools'
} as const;

/**
 * Default fallback assets
 */
const FALLBACKS = {
  logo: '/img/tools/default-tool-logo.svg',
  screenshot: '/img/tools/placeholder-screenshot.png'
} as const;

/**
 * Get the best available logo for a tool with comprehensive fallback logic
 */
export const getToolLogo = (tool: Tool, preferHq: boolean = true): string => {
  // 1. Try high-quality logo if preferred and available
  if (preferHq && tool.logoHq) {
    return tool.logoHq;
  }

  // 2. Try basic logo
  if (tool.logo) {
    return tool.logo;
  }

  // 3. Try to construct expected logo path
  const expectedHqLogo = `${ASSET_PATHS.logos}/${tool.id}-logo.svg`;
  const expectedLegacyLogo = `${ASSET_PATHS.legacyLogos}/${tool.id}-logo.svg`;

  // Return expected path (browser will handle 404)
  return expectedHqLogo;
};

/**
 * Get logo with error handling for React components
 */
export const getToolLogoWithFallback = (tool: Tool): {
  primary: string;
  fallback: string;
  alt: string;
} => {
  return {
    primary: getToolLogo(tool, true),
    fallback: FALLBACKS.logo,
    alt: `${tool.name} logo`
  };
};

/**
 * Get the primary screenshot with fallback logic
 */
export const getToolPrimaryScreenshot = (tool: Tool): string => {
  if (tool.screenshots && tool.screenshots.length > 0) {
    return tool.screenshots[0];
  }

  // Try to construct expected screenshot path
  const expectedScreenshot = `${ASSET_PATHS.screenshots}/${tool.id}-homepage.png`;
  return expectedScreenshot;
};

/**
 * Get screenshot with error handling for React components
 */
export const getToolScreenshotWithFallback = (tool: Tool): {
  primary: string;
  fallback: string;
  alt: string;
} => {
  return {
    primary: getToolPrimaryScreenshot(tool),
    fallback: FALLBACKS.screenshot,
    alt: `${tool.name} screenshot`
  };
};

/**
 * Get all available screenshots for a tool
 */
export const getToolScreenshots = (tool: Tool): string[] => {
  if (tool.screenshots && tool.screenshots.length > 0) {
    return tool.screenshots;
  }

  // Return expected screenshots
  const expectedScreenshots = [
    `${ASSET_PATHS.screenshots}/${tool.id}-homepage.png`
  ];

  return expectedScreenshots;
};

/**
 * Validate if an asset likely exists (basic URL validation)
 */
export const isValidAssetPath = (path: string): boolean => {
  if (!path) return false;
  
  // Check if it's a valid asset path
  const validExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.webp'];
  const hasValidExtension = validExtensions.some(ext => path.toLowerCase().endsWith(ext));
  
  // Check if it starts with expected paths
  const startsWithAssetPath = path.startsWith('/img/tools/') || path.startsWith('/img/');
  
  return hasValidExtension && startsWithAssetPath;
};

/**
 * Asset quality assessment
 */
export interface AssetQuality {
  hasHqLogo: boolean;
  hasBasicLogo: boolean;
  hasScreenshots: boolean;
  hasHomepageScreenshot: boolean;
  screenshotCount: number;
  quality: 'high' | 'medium' | 'basic' | 'poor';
}

export const assessAssetQuality = (tool: Tool): AssetQuality => {
  const hasHqLogo = Boolean(tool.logoHq && isValidAssetPath(tool.logoHq));
  const hasBasicLogo = Boolean(tool.logo && isValidAssetPath(tool.logo));
  const hasScreenshots = tool.screenshots.length > 0;
  const hasHomepageScreenshot = tool.screenshots.some(s => 
    s.includes('homepage') || s.includes(tool.id)
  );
  const screenshotCount = tool.screenshots.length;

  // Calculate overall quality
  let quality: AssetQuality['quality'] = 'poor';
  
  if (hasHqLogo && hasHomepageScreenshot && screenshotCount >= 2) {
    quality = 'high';
  } else if ((hasHqLogo || hasBasicLogo) && hasScreenshots) {
    quality = 'medium';
  } else if (hasHqLogo || hasBasicLogo || hasScreenshots) {
    quality = 'basic';
  }

  return {
    hasHqLogo,
    hasBasicLogo,
    hasScreenshots,
    hasHomepageScreenshot,
    screenshotCount,
    quality
  };
};

/**
 * Batch asset validation for multiple tools
 */
export const validateToolsAssets = (tools: Tool[]) => {
  const results = tools.map(tool => ({
    tool: {
      id: tool.id,
      name: tool.name
    },
    assets: assessAssetQuality(tool),
    logos: {
      primary: getToolLogo(tool),
      fallback: FALLBACKS.logo
    },
    screenshots: {
      primary: getToolPrimaryScreenshot(tool),
      all: getToolScreenshots(tool),
      fallback: FALLBACKS.screenshot
    }
  }));

  const summary = {
    total: tools.length,
    byQuality: {
      high: results.filter(r => r.assets.quality === 'high').length,
      medium: results.filter(r => r.assets.quality === 'medium').length,
      basic: results.filter(r => r.assets.quality === 'basic').length,
      poor: results.filter(r => r.assets.quality === 'poor').length
    },
    withHqLogos: results.filter(r => r.assets.hasHqLogo).length,
    withScreenshots: results.filter(r => r.assets.hasScreenshots).length,
    withHomepageScreenshots: results.filter(r => r.assets.hasHomepageScreenshot).length
  };

  return {
    results,
    summary
  };
};

/**
 * React component helper for handling image load errors
 */
export const createImageErrorHandler = (fallbackSrc: string) => {
  return (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    if (target.src !== fallbackSrc) {
      target.src = fallbackSrc;
    }
  };
};

/**
 * Preload critical assets
 */
export const preloadToolAssets = (tool: Tool): Promise<void[]> => {
  const assetsToPreload = [
    getToolLogo(tool),
    getToolPrimaryScreenshot(tool)
  ].filter(Boolean);

  const preloadPromises = assetsToPreload.map(src => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Don't fail the promise on 404
      img.src = src;
    });
  });

  return Promise.all(preloadPromises);
};

/**
 * Generate srcSet for responsive images
 */
export const generateLogoSrcSet = (tool: Tool): string => {
  const logo = getToolLogo(tool);
  const fallback = FALLBACKS.logo;
  
  // For SVG logos, return single source
  if (logo.endsWith('.svg') || fallback.endsWith('.svg')) {
    return `${logo} 1x`;
  }
  
  // For raster images, could generate multiple sizes
  return `${logo} 1x, ${logo} 2x`;
};

/**
 * Asset status monitoring
 */
export interface AssetStatus {
  loaded: boolean;
  error: boolean;
  loading: boolean;
}

export const createAssetStatusTracker = () => {
  const statuses = new Map<string, AssetStatus>();
  
  const trackAsset = (src: string) => {
    if (statuses.has(src)) {
      return statuses.get(src)!;
    }
    
    const status: AssetStatus = {
      loaded: false,
      error: false,
      loading: true
    };
    
    statuses.set(src, status);
    
    // Test if asset loads
    const img = new Image();
    img.onload = () => {
      status.loaded = true;
      status.loading = false;
      status.error = false;
    };
    img.onerror = () => {
      status.loaded = false;
      status.loading = false;
      status.error = true;
    };
    img.src = src;
    
    return status;
  };
  
  const getAssetStatus = (src: string) => {
    return statuses.get(src) || { loaded: false, error: false, loading: false };
  };
  
  return {
    trackAsset,
    getAssetStatus,
    getAll: () => new Map(statuses)
  };
};

/**
 * Export configuration for easy access
 */
export const TOOL_ASSET_CONFIG = {
  paths: ASSET_PATHS,
  fallbacks: FALLBACKS,
  supportedFormats: {
    logos: ['.svg', '.png'],
    screenshots: ['.png', '.jpg', '.jpeg', '.webp']
  }
} as const;