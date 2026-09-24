// 정글 점프 탐험대 — 앱처럼 설치하기 위한 서비스 워커
// 항상 인터넷의 새 버전을 먼저 가져오고, 인터넷이 없을 때만 저장해 둔 버전을 보여줘요.
const CACHE = 'jungle-jump-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./')))
  );
});
