// service-worker.js
const CACHE_NAME = 'grocery-app-cache-v1';
const urlsToCache = [
    '/',
    '/lab/Grocery%20App/index.html',
    '/lab/Grocery%20App/styles.css',
    '/lab/Grocery%20App/app.js',
    // Add other assets (images, fonts) if needed
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});