const staticCacheName = 'static-cache-v3';
const dynamicCacheName = 'dynamic-cache-v1';


const staticAssets = [
    './',
    './index.html',
    './offline.html',
    './src/img/site-images/interactive/delivery_order_mobile.png',
    '/icons/icon-128x128.png',
    '/icons/icon-192x192.png',
    '/bundles/index.css',
    '/bundles/index.js',
];

self.addEventListener('install', async e => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);

    console.log('Service worker has been installed');
})

self.addEventListener('activate', async e => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (staticCacheName !== key) {
            await caches.delete(key);
        }
    });

    await Promise.all(checkKeys);

    console.log('Service worker has been activated');
})

self.addEventListener('fetch', async e => {
    // console.log(`Fetch ${e.request.url}`);

    // e.respondWith(caches.match(e.request).then(cachedResponse => {
    //     return cachedResponse || fetch(e.request)
    // }));

    e.respondWith(checkCache(e.request));
})

async function checkCache(req) {
    const cachedResponse = await caches.match(req);

    return cachedResponse || checkOnline(req)
}

async function checkOnline(req) {
    const cache = await caches.open(dynamicCacheName);

    try {
        const res = await fetch(req);
        await cache.put(req, res.clone())
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);

        if (cachedRes) {
            return cachedRes;
        } else if (req.url.indexOf('.html') !== -1) {
            return caches.match('./offline.html');
        } else {
            return caches.match('./src/img/site-images/interactive/delivery_order_mobile.png');
        }
    }
}