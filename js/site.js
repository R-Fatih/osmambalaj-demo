// OSM Ambalaj — site etkileşimleri (bağımlılıksız)
(function () {
  "use strict";

  // Mobil menü
  document.querySelectorAll("[data-menu-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var menu = document.getElementById(btn.getAttribute("aria-controls"));
      if (!menu) return;
      var open = menu.classList.toggle("hidden") === false;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.querySelector(".material-symbols-outlined").textContent = open ? "close" : "menu";
    });
  });

  // Ürün detay: küçük görsele tıklayınca ana görseli değiştir
  var main = document.querySelector("[data-gallery-main]");
  document.querySelectorAll("[data-gallery-thumb]").forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      if (!main) return;
      var src = thumb.getAttribute("data-src");
      var contain = /\.(png|svg)(\?|$)/i.test(src);
      main.src = src;
      main.classList.toggle("object-contain", contain);
      main.classList.toggle("bg-white", contain);
      main.classList.toggle("p-10", contain);
      main.classList.toggle("object-cover", !contain);
      document.querySelectorAll("[data-gallery-thumb]").forEach(function (t) {
        t.classList.remove("ring-2", "ring-primary");
      });
      thumb.classList.add("ring-2", "ring-primary");
    });
  });

  // Galeri: basit lightbox
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  if (items.length) {
    var box = document.createElement("div");
    box.className = "fixed inset-0 z-[70] bg-black/90 hidden items-center justify-center p-4";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML =
      '<button type="button" data-lb-close class="absolute top-4 right-4 text-white w-12 h-12 flex items-center justify-center" aria-label="Kapat"><span class="material-symbols-outlined text-3xl">close</span></button>' +
      '<button type="button" data-lb-prev class="absolute left-2 md:left-6 text-white w-12 h-12 flex items-center justify-center" aria-label="Önceki"><span class="material-symbols-outlined text-4xl">chevron_left</span></button>' +
      '<figure class="max-w-5xl w-full"><img data-lb-img class="max-h-[80vh] w-full object-contain rounded-lg" alt="" /><figcaption data-lb-cap class="text-white/80 text-center mt-4 text-sm"></figcaption></figure>' +
      '<button type="button" data-lb-next class="absolute right-2 md:right-6 text-white w-12 h-12 flex items-center justify-center" aria-label="Sonraki"><span class="material-symbols-outlined text-4xl">chevron_right</span></button>';
    document.body.appendChild(box);
    var img = box.querySelector("[data-lb-img]"), cap = box.querySelector("[data-lb-cap]"), index = 0;
    function show(i) {
      index = (i + items.length) % items.length;
      img.src = items[index].getAttribute("href");
      img.alt = items[index].getAttribute("data-title") || "";
      cap.textContent = items[index].getAttribute("data-title") || "";
      box.classList.remove("hidden"); box.classList.add("flex");
    }
    function hide() { box.classList.add("hidden"); box.classList.remove("flex"); }
    items.forEach(function (a, i) { a.addEventListener("click", function (e) { e.preventDefault(); show(i); }); });
    box.querySelector("[data-lb-close]").addEventListener("click", hide);
    box.querySelector("[data-lb-prev]").addEventListener("click", function () { show(index - 1); });
    box.querySelector("[data-lb-next]").addEventListener("click", function () { show(index + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) hide(); });
    document.addEventListener("keydown", function (e) {
      if (box.classList.contains("hidden")) return;
      if (e.key === "Escape") hide();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }

  // Formlar: çift gönderimi engelle
  document.querySelectorAll("form[data-once]").forEach(function (form) {
    form.addEventListener("submit", function () {
      var btn = form.querySelector("[type=submit]");
      if (btn) { btn.disabled = true; btn.dataset.label = btn.innerHTML; btn.innerHTML = "Gönderiliyor..."; }
    });
  });
})();
