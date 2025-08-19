// Service Worker for CopyHelix.ai - Mobile Performance Optimization
// Optimized for Brazilian 3G/4G networks

const CACHE_NAME = 'copyhelix-v1.0.0';
const STATIC_CACHE = 'copyhelix-static-v1';
const DYNAMIC_CACHE = 'copyhelix-dynamic-v1';
const IMAGE_CACHE = 'copyhelix-images-v1';

// Resources to cache immediately (critical path)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/favicon.ico'
];

// Dynamic content patterns for intelligent caching
const CACHE_STRATEGIES = {
  // Static assets - Cache First
  static: {
    pattern: /\.(js|css|woff2?|png|jpg|jpeg|svg|ico)$/,
    strategy: 'CacheFirst',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxEntries: 100
  },
  
  // API calls - Network First with fallback
  api: {
    pattern: /\/api\//,
    strategy: 'NetworkFirst',
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxEntries: 50
  },
  
  // Images - Cache First with compression awareness
  images: {
    pattern: /\.(png|jpg|jpeg|webp|gif|svg)$/,
    strategy: 'CacheFirst',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxEntries: 200
  },
  
  // Pages - Network First for fresh content
  pages: {
    pattern: /^https:\/\/copyhelix\.ai\//,
    strategy: 'NetworkFirst',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    maxEntries: 30
  }
};

// Install event - Cache critical resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker for mobile optimization');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== IMAGE_CACHE &&
              cacheName !== CACHE_NAME
            ) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - Intelligent caching based on connection
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(handleRequest(request));
});

// Main request handler with connection-aware strategies
async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Determine caching strategy based on request type
    const strategy = getCachingStrategy(request);
    
    switch (strategy.name) {
      case 'CacheFirst':
        return await cacheFirst(request, strategy);
      case 'NetworkFirst':
        return await networkFirst(request, strategy);
      case 'StaleWhileRevalidate':
        return await staleWhileRevalidate(request, strategy);
      default:
        return await networkFirst(request, strategy);
    }
  } catch (error) {
    console.error('[SW] Request failed:', error);
    return await handleOffline(request);
  }
}

// Determine caching strategy based on request pattern
function getCachingStrategy(request) {
  const url = new URL(request.url);
  
  // Check each strategy pattern
  for (const [name, config] of Object.entries(CACHE_STRATEGIES)) {
    if (config.pattern.test(url.pathname) || config.pattern.test(url.href)) {
      return { name: config.strategy, config, cacheName: getCacheName(name) };
    }
  }
  
  // Default strategy
  return { 
    name: 'NetworkFirst', 
    config: CACHE_STRATEGIES.pages, 
    cacheName: DYNAMIC_CACHE 
  };
}

// Get appropriate cache name
function getCacheName(type) {
  switch (type) {
    case 'static': return STATIC_CACHE;
    case 'images': return IMAGE_CACHE;
    default: return DYNAMIC_CACHE;
  }
}

// Cache First strategy - Good for static assets
async function cacheFirst(request, strategy) {
  const cache = await caches.open(strategy.cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Check if cache is still valid
    const cacheTime = new Date(cachedResponse.headers.get('sw-cache-time') || 0);
    const now = new Date();
    
    if (now - cacheTime < strategy.config.maxAge) {
      return cachedResponse;
    }
  }
  
  // Fetch from network and cache
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cacheResponse(cache, request, networkResponse.clone(), strategy.config);
    }
    return networkResponse;
  } catch (error) {
    // Return cached version if network fails
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network First strategy - Good for dynamic content
async function networkFirst(request, strategy) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(strategy.cacheName);
      await cacheResponse(cache, request, networkResponse.clone(), strategy.config);
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cache = await caches.open(strategy.cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale While Revalidate - Good for balance between fresh and fast
async function staleWhileRevalidate(request, strategy) {
  const cache = await caches.open(strategy.cacheName);
  const cachedResponse = await cache.match(request);
  
  // Start network request in background
  const networkPromise = fetch(request)
    .then(async (networkResponse) => {
      if (networkResponse.ok) {
        await cacheResponse(cache, request, networkResponse.clone(), strategy.config);
      }
      return networkResponse;
    })
    .catch(() => null);
  
  // Return cached version immediately if available
  if (cachedResponse) {
    // Update cache in background
    networkPromise.catch(() => {});
    return cachedResponse;
  }
  
  // Wait for network if no cache
  return await networkPromise;
}

// Cache response with metadata
async function cacheResponse(cache, request, response, config) {
  // Add cache timestamp
  const responseToCache = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      ...Object.fromEntries(response.headers.entries()),
      'sw-cache-time': new Date().toISOString()
    }
  });
  
  await cache.put(request, responseToCache);
  
  // Clean up old entries if needed
  await cleanupCache(cache, config.maxEntries);
}

// Clean up old cache entries
async function cleanupCache(cache, maxEntries) {
  const keys = await cache.keys();
  
  if (keys.length > maxEntries) {
    const sortedKeys = keys.sort((a, b) => {
      // Sort by cache time (oldest first)
      const aTime = new Date(a.headers?.get('sw-cache-time') || 0);
      const bTime = new Date(b.headers?.get('sw-cache-time') || 0);
      return aTime - bTime;
    });
    
    // Delete oldest entries
    const keysToDelete = sortedKeys.slice(0, keys.length - maxEntries);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
  }
}

// Handle offline scenarios
async function handleOffline(request) {
  const url = new URL(request.url);
  
  // For navigation requests, return cached index.html
  if (request.mode === 'navigate') {
    const cache = await caches.open(STATIC_CACHE);
    return await cache.match('/index.html') || new Response('Offline', { status: 503 });
  }
  
  // For other requests, try to find in any cache
  const cacheNames = await caches.keys();
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const response = await cache.match(request);
    if (response) {
      return response;
    }
  }
  
  // Return offline response
  return new Response('Resource not available offline', { 
    status: 503,
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Background sync for failed requests (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
      console.log('[SW] Background sync triggered');
      // Handle background sync tasks
    }
  });
}

// Push notification handling (if needed)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    console.log('[SW] Push notification received:', data);
    
    // Show notification if appropriate
    if (data.showNotification) {
      event.waitUntil(
        self.registration.showNotification(data.title, {
          body: data.body,
          icon: '/favicon.png',
          badge: '/favicon.png'
        })
      );
    }
  }
});

console.log('[SW] Service worker script loaded successfully');