self.addEventListener('install', () => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', () => {
    console.log('Service worker activated');
  });
  
  self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
  
    const title = data.title || "Dingus!";
    const body = data.body || "You got a new ding!";
    const url = data.url || "/";
  
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        data: { url: url }
      })
    );
  });
  
  self.addEventListener('notificationclick', event => {
    event.notification.close();
    const url = event.notification.data.url;
    event.waitUntil(clients.openWindow(url));
  });
