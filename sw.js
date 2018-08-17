/**
 * Service worker functions
 */

const CACHE_NAME = 'restaurant-static-v1';

// Install event listener function from https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        '/',
        'index.html',
        'restaurant.html',
        '/css/styles.css',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/js/app.js',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js'
      ]);
    }).catch(function(error) {
      // registration failed
      console.log('Cache add all failed with ' + error);
    })
  );
});


// Fetch event listener function from https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        let responseClone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    }).catch(function(error) {
      console.log('Fetch failed with ' + error);
    })
  );
});


// Activate event listener function from https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
