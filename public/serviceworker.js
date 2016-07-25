var VERSION = 'v2';
var STATIC_CONTENT = [
    './',
    './index.html',
    './styles.css',
    './serviceworker.js',
    './channelswitcher.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
    'https://fonts.googleapis.com/css?family=Russo+One'
];


if(navigator.serviceWorker) {
    navigator.serviceWorker.register('./serviceworker.js', {scope: './'})
        .then(function(serviceWorkerRegistration){
            console.log("Registration phase suceeded", serviceWorkerRegistration)
        })
        .catch(function (err) {
            console.log("Something went wrong with the Service Worker Registration", err);
        });
}

self.addEventListener('install', function (event) {
    console.log("Installation phase succeeded", event);
    event.waitUntil(
        caches.open(VERSION)
            .then(function (cache) {
                console.log('Adding static content to our cache');
                return cache.addAll(STATIC_CONTENT);
            })
    );
});



self.addEventListener('activate', function(event){
    console.log("Activation phase succeeded", event);
});

self.addEventListener('fetch', function(event){
    console.log("Now we are fetching http resources", event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request, {mode: 'cors'})
                    .then(function(response){
                        cacheResponse(event.request, response.clone());
                        return response;
                    })
            }));
});

function cacheResponse(request, response){
    caches.open(VERSION).then(function(cache){
        console.log('Adding resource to cache', request);
        cache.put(request, response);
    })
}

