/* Hero slideshow (below), then menu, scrollspy, lightbox, footer year. No dependencies.
   - Automatic rotation (default 6 s, set data-interval on the section)
   - Pauses on hover, keyboard focus, hidden tab, and via the Pause button
   - Starts paused when the visitor prefers reduced motion
   - Previous/next arrows, six dots, ArrowLeft/ArrowRight keys, touch swipe */
(function () {
  "use strict";

  function init(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll(".hs-slide"));
    var dots = Array.prototype.slice.call(root.querySelectorAll(".hs-dot"));
    var prevBtn = root.querySelector(".hs-prev");
    var nextBtn = root.querySelector(".hs-next");
    var pauseBtn = root.querySelector(".hs-pause");
    var titleEl = root.querySelector(".hs-title");
    var subEl = root.querySelector(".hs-sub");
    var live = root.querySelector(".hs-live");
    var stage = root.querySelector(".hs-stage");
    var count = slides.length;
    if (!count) return;

    var interval = parseInt(root.getAttribute("data-interval"), 10) || 6000;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var index = 0;
    var timer = null;
    var userPaused = reduce.matches; // reduced motion: do not auto-rotate unless the visitor starts it
    var hovering = false;
    var focusInside = false;

    function loadImage(slide) {
      var img = slide.querySelector("img");
      if (img && img.getAttribute("loading") === "lazy") img.setAttribute("loading", "eager");
    }

    function schedule() {
      window.clearTimeout(timer);
      timer = null;
      if (!userPaused && !hovering && !focusInside && !document.hidden) {
        timer = window.setTimeout(function () { goTo(index + 1, false); }, interval);
      }
    }

    function updatePauseButton() {
      if (!pauseBtn) return;
      pauseBtn.setAttribute("aria-pressed", userPaused ? "true" : "false");
      pauseBtn.setAttribute("aria-label", userPaused ? "Start automatic slide rotation" : "Pause automatic slide rotation");
    }

    function goTo(n, manual) {
      index = (n + count) % count;
      slides.forEach(function (s, i) {
        var on = i === index;
        s.classList.toggle("is-active", on);
        s.setAttribute("aria-hidden", on ? "false" : "true");
      });
      dots.forEach(function (d, i) {
        var on = i === index;
        d.classList.toggle("is-active", on);
        if (on) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
      });
      var active = slides[index];
      loadImage(active);
      loadImage(slides[(index + 1) % count]); // preload the next photo
      if (titleEl) titleEl.textContent = active.getAttribute("data-title") || "";
      if (subEl) subEl.textContent = active.getAttribute("data-sub") || "";
      if (live) {
        // Announce only when the visitor moved the slide, or rotation is paused; never during autoplay.
        live.setAttribute("aria-live", manual || userPaused ? "polite" : "off");
        live.textContent = "Slide " + (index + 1) + " of " + count + ": " + (active.getAttribute("data-title") || "");
      }
      schedule();
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(index - 1, true); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(index + 1, true); });
    dots.forEach(function (d, i) { d.addEventListener("click", function () { goTo(i, true); }); });

    if (pauseBtn) {
      pauseBtn.addEventListener("click", function () {
        userPaused = !userPaused;
        updatePauseButton();
        schedule();
      });
    }

    root.addEventListener("mouseenter", function () { hovering = true; schedule(); });
    root.addEventListener("mouseleave", function () { hovering = false; schedule(); });
    root.addEventListener("focusin", function () { focusInside = true; schedule(); });
    root.addEventListener("focusout", function (e) {
      if (!root.contains(e.relatedTarget)) { focusInside = false; schedule(); }
    });
    document.addEventListener("visibilitychange", schedule);

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1, true); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1, true); }
    });

    // Touch swipe on the photograph
    var startX = null, startY = null;
    stage.addEventListener("touchstart", function (e) {
      var t = e.changedTouches[0]; startX = t.clientX; startY = t.clientY;
    }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var t = e.changedTouches[0], dx = t.clientX - startX, dy = t.clientY - startY;
      startX = startY = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) goTo(index + (dx < 0 ? 1 : -1), true);
    }, { passive: true });

    // Follow changes to the reduced-motion setting while the page is open
    var onMotionChange = function () { if (reduce.matches) { userPaused = true; updatePauseButton(); } schedule(); };
    if (reduce.addEventListener) reduce.addEventListener("change", onMotionChange);
    else if (reduce.addListener) reduce.addListener(onMotionChange);

    root.classList.add("is-ready");
    updatePauseButton();
    goTo(0, false);
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll(".hero-slider"), init);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

/* Site behaviour: mobile menu, scrollspy, lightbox, footer year */
(function () {
  "use strict";
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn();
  }
  ready(function () {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();


    // Leadership message tabs (without JS all three messages stay visible)
    var tablist = document.querySelector(".mtablist");
    if (tablist) {
      var tabs = Array.prototype.slice.call(tablist.querySelectorAll("[role=tab]"));
      function pick(i, focus) {
        tabs.forEach(function (t, k) {
          var on = k === i;
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.tabIndex = on ? 0 : -1;
          document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
        });
        if (focus) tabs[i].focus();
      }
      tabs.forEach(function (t, k) {
        t.addEventListener("click", function () { pick(k, false); });
        t.addEventListener("keydown", function (e) {
          var n = tabs.length, k2 = null;
          if (e.key === "ArrowRight") k2 = (k + 1) % n;
          else if (e.key === "ArrowLeft") k2 = (k - 1 + n) % n;
          else if (e.key === "Home") k2 = 0;
          else if (e.key === "End") k2 = n - 1;
          if (k2 !== null) { e.preventDefault(); pick(k2, true); }
        });
      });
      pick(0, false);
    }

    // Mobile menu
    var btn = document.querySelector(".menu-btn");
    var list = document.getElementById("nav-list");
    var nav = document.querySelector(".site-nav");
    function setMenu(open) {
      list.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    if (btn && list) {
      btn.addEventListener("click", function () { setMenu(!list.classList.contains("is-open")); });
      list.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && list.classList.contains("is-open")) { setMenu(false); btn.focus(); }
      });
      document.addEventListener("click", function (e) {
        if (list.classList.contains("is-open") && !nav.contains(e.target)) setMenu(false);
      });
    }

    // Scrollspy
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-list a[href^='#']"));
    var map = {
      top: "top", about: "about", messages: "leadership",
      leadership: "leadership", academics: "academics", mcom: "academics", faculty: "faculty", staff: "faculty", administration: "faculty",
      achievements: "achievements", campus: "campus", labs: "campus", events: "events", sports: "events",
      admissions: "admissions", contact: "contact"
    };
    function mark(id) {
      var target = map[id] || id;
      links.forEach(function (a) {
        if (a.getAttribute("href") === "#" + target) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }
    if ("IntersectionObserver" in window) {
      var secs = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) mark(en.target.id); });
      }, { rootMargin: "-40% 0px -55% 0px" });
      secs.forEach(function (s) { io.observe(s); });
    }

    // Lightbox
    var box = document.querySelector(".lightbox");
    var anchors = Array.prototype.slice.call(document.querySelectorAll(".shot a"));
    if (box && typeof box.showModal === "function" && anchors.length) {
      var im = box.querySelector(".lightbox__img"), cap = box.querySelector(".lightbox__cap");
      var cur = 0, opener = null;
      function show(i) {
        cur = (i + anchors.length) % anchors.length;
        var a = anchors[cur], thumb = a.querySelector("img");
        im.src = a.getAttribute("href");
        im.alt = thumb ? thumb.alt : "";
        cap.textContent = a.getAttribute("data-caption") || "";
      }
      anchors.forEach(function (a, i) {
        a.addEventListener("click", function (e) {
          e.preventDefault(); opener = a; show(i); box.showModal();
        });
      });
      box.querySelector(".lightbox__close").addEventListener("click", function () { box.close(); });
      box.querySelector(".lightbox__prev").addEventListener("click", function () { show(cur - 1); });
      box.querySelector(".lightbox__next").addEventListener("click", function () { show(cur + 1); });
      box.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") show(cur - 1);
        else if (e.key === "ArrowRight") show(cur + 1);
      });
      box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
      box.addEventListener("close", function () { im.removeAttribute("src"); if (opener) opener.focus(); });
    }
  });
})();


/* Redesign stage 1: add a shadow to the sticky navigation once the page scrolls past the brand bar */
(function () {
  "use strict";
  var nav = document.querySelector(".site-nav");
  var bar = document.querySelector(".brandbar");
  if (!nav) return;
  var ticking = false;
  function update() {
    ticking = false;
    nav.classList.toggle("is-stuck", window.scrollY > (bar ? bar.offsetHeight : 0));
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();


/* Redesign stage 1b: slide counter and caption animation (observes the existing slider; does not change it) */
(function () {
  "use strict";
  var root = document.querySelector(".hero-slider");
  if (!root) return;
  var dots = Array.prototype.slice.call(root.querySelectorAll(".hs-dot"));
  var num = root.querySelector(".hs-count-n");
  var tot = root.querySelector(".hs-count-t");
  var text = root.querySelector(".hs-text");
  var title = root.querySelector(".hs-title");
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function sync() {
    var i = -1, k;
    for (k = 0; k < dots.length; k++) { if (dots[k].classList.contains("is-active")) { i = k; break; } }
    if (i >= 0 && num) num.textContent = pad(i + 1);
    if (tot) tot.textContent = "OF " + pad(dots.length);
  }
  function replay() {
    if (!text) return;
    text.classList.remove("is-in");
    void text.offsetWidth;
    text.classList.add("is-in");
  }
  if (window.MutationObserver) {
    var mo = new MutationObserver(sync);
    dots.forEach(function (d) { mo.observe(d, { attributes: true, attributeFilter: ["class"] }); });
    if (title) new MutationObserver(replay).observe(title, { childList: true, characterData: true, subtree: true });
  }
  sync();
})();
