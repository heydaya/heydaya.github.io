// const Memo_Ji = "Memory-Game";
// const assets = [
//   "/",
//   "/index.html",
//   "/style.css",
//   "/main.js",
//   "/images/grinning_face_with_smiling_eyes.gif",
//   "/images/alien.gif",
//   "/images/birthday_cake.gif",
//   "/images/cowboy_hat_face.gif",
//   "/images/face_with_tears_of_joy.gif",
//   "/images/fire.gif",
//   "/images/hear_no_evil_monkey.gif",
//   "/images/loudly_crying_face.gif",
//   "/images/oncoming_police_car.gif",
//   "/images/smiling_face_with_horns.gif",
//   "/images/robot.gif",
//   "/images/rolling_on_the_floor_laughing.gif",
//   "/images/shushing_face.gif",
//   "/images/sparkling_heart.gif",
//   "/images/woozy_face.gif",
//   "/images/cover.png",
//   "/images/unicorn.gif",
//   "/images/trophy.gif",
//   "/images/unicorn-right.gif",
//   "/images/partying_face.gif",
//   "/images/loudly_crying_face.gif",
//   "/images/broken_heart.gif"
// ];

// self.addEventListener("install", installEvent => {
//   installEvent.waitUntil(
//     caches.open(Memo_Ji).then(cache => {
//       cache.addAll(assets);
//     })
//   );
// });

// self.addEventListener("fetch", fetchEvent => {
//   fetchEvent.respondWith(
//     caches.match(fetchEvent.request).then(res => {
//       return res || fetch(fetchEvent.request);
//     })
//   );
// });


var staticCacheName = "Memo_Ji";
 
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(["/"]);
    })
  );
});
 
self.addEventListener("fetch", function (event) {
  console.log(event.request.url);
 
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});