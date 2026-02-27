// Service Worker for Usama's Portfolio
// Enables offline functionality and PWA capabilities

const CACHE_NAME = 'usama-cv-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/offline.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/favicon.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .catch(error => console.error('Cache error:', error))
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(response => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type === 'error') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    // Cache the new resource
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
            .catch(() => {
                // Offline fallback - serve offline page
                return caches.match('/offline.html');
            })
    );
});

// Background sync for form submissions (optional)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-contact-form') {
        event.waitUntil(
            // Handle form sync
            fetchAndSync()
        );
    }
});

async function fetchAndSync() {
    try {
        // Try to send any pending data
        const pending = await getPendingData();
        if (pending) {
            await fetch('/api/submit-form', {
                method: 'POST',
                body: JSON.stringify(pending)
            });
            await clearPendingData();
        }
    } catch (error) {
        console.error('Sync failed:', error);
    }
}

// Push notification handler (optional)
self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    const options = {
        body: data.body || 'New notification',
        icon: '/profile.jpg',
        badge: '/favicon.png',
        tag: data.tag || 'notification'
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Usama"s Portfolio', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientList => {
            // Look for existing window
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            // Open new window if not found
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

// Message handler for communication from client
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('Service Worker loaded');
