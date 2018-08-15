

// Register service worker function from https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/sw.js', { scope: '/js/' })
  .then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}
