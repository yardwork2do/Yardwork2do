// Scroll-reveal animations with staggered delay
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = `${i * 100}ms`;
        e.target.classList.add("visible");
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".fade-in, .slide-up").forEach(el => observer.observe(el));

  // Simple lightbox for gallery
  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.className = "lightbox-overlay";
      overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,.85);
        display:flex;align-items:center;justify-content:center;z-index:9999`;
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt;
      img.style.cssText = "max-width:90%;max-height:90%;border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.5)";
      overlay.appendChild(img);
      document.body.style.overflow = "hidden";
      overlay.addEventListener("click", () => {
        document.body.style.overflow = "";
        overlay.remove();
      });
      document.body.appendChild(overlay);
    });
  });

  // Close lightbox with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".lightbox-overlay").forEach(el => {
        document.body.style.overflow = "";
        el.remove();
      });
    }
  });
});