(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      navLinks.style.display = open ? "flex" : "";
    });
  }

  // Scroll reveal for sections
  var revealTargets = document.querySelectorAll(
    ".category-card, .steps li, .section-head, .browser-frame"
  );
  revealTargets.forEach(function (el) {
    el.setAttribute("data-reveal", "");
  });

  if ("IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Subtle tilt on the hero postcard stack (desktop only, motion allowed)
  var stack = document.querySelector(".hero-stack");
  if (stack && !reduceMotion && window.matchMedia("(hover: hover)").matches) {
    stack.addEventListener("mousemove", function (e) {
      var rect = stack.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      stack.style.setProperty("--tiltX", (y * -6).toFixed(2) + "deg");
      stack.style.setProperty("--tiltY", (x * 6).toFixed(2) + "deg");
      stack.style.transform =
        "perspective(800px) rotateX(var(--tiltX)) rotateY(var(--tiltY))";
    });
    stack.addEventListener("mouseleave", function () {
      stack.style.transform = "";
    });
  }
})();
