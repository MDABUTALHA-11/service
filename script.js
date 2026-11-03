/**
 * CareerForge — Timeless Black & White Luxury CV Service
 * Mobile-First Interactive Engine:
 * 1. Seamless mobile navigation drawer
 * 2. Instant WhatsApp direct message generator (Phone: +8801742761220)
 * 3. Stripe checkout handling ($4.99 direct link)
 * 4. FAQ Accordion
 * 5. Scroll Reveal animations
 */

const CONFIG = {
  // Client's verified WhatsApp number with country code
  whatsappNumber: "8801742761220", 

  // Primary Stripe Payment Link for $4.99 Basic CV
  stripeBasicLink: "https://buy.stripe.com/test_28E28tfb8992d4L5tu3F600",

  // Stripe Payment Links for each package
  stripeLinks: {
    "Basic CV Package": "https://buy.stripe.com/test_28E28tfb8992d4L5tu3F600",
    "Professional CV": "https://buy.stripe.com/test_dRm00l1kietm4yf7BC3F601",
    "CV + Cover Letter": "https://buy.stripe.com/test_7sYaEZ0ge70Ud4LaNO3F602",
    "CV + LinkedIn Revamp": "https://buy.stripe.com/test_4gM3cx6EC4SMfcT5tu3F603",
    "Complete Job Package": "https://buy.stripe.com/test_6oU14p1ki4SM1m3cVW3F604"
  }
};

document.addEventListener("DOMContentLoaded", () => {

  // ============================================================
  // 1. MOBILE NAVIGATION DRAWER & TOUCH ACCESSIBILITY
  // ============================================================
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navBackdrop = document.getElementById("navBackdrop");

  function openMobileNav() {
    if (!navMenu) return;
    navMenu.classList.add("open");
    if (navBackdrop) navBackdrop.classList.add("active");
    if (hamburger) {
      hamburger.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
    }
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeMobileNav() {
    if (!navMenu) return;
    navMenu.classList.remove("open");
    if (navBackdrop) navBackdrop.classList.remove("active");
    if (hamburger) {
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }
    document.body.style.overflow = "";
  }

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("open")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeMobileNav);
  }

  const drawerClose = document.getElementById("drawerClose");
  if (drawerClose) {
    drawerClose.addEventListener("click", closeMobileNav);
  }

  // Close nav on any link click
  document.querySelectorAll(".nav__link, .mobile-nav-cta").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu && navMenu.classList.contains("open")) {
      closeMobileNav();
    }
  });

  // ============================================================
  // 2. SCROLL REVEAL (Intersection Observer)
  // ============================================================
  const revealElements = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  // ============================================================
  // 3. FAQ ACCORDION (Touch friendly)
  // ============================================================
  const accordionItems = document.querySelectorAll(".accordion__item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion__header");
    const body = item.querySelector(".accordion__body");

    if (!header || !body) return;

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all others
      accordionItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
          const otherBody = other.querySelector(".accordion__body");
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        item.classList.remove("open");
        body.style.maxHeight = null;
      }
    });
  });

  // Open first item by default
  if (accordionItems.length > 0) {
    const firstItem = accordionItems[0];
    const firstBody = firstItem.querySelector(".accordion__body");
    firstItem.classList.add("open");
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + "px";
  }

  // ============================================================
  // 4. DYNAMIC WHATSAPP LINKS AUTO-INJECTION
  // ============================================================
  // Ensures any WhatsApp element uses the configured phone number
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    const currentHref = link.getAttribute("href");
    if (!currentHref.includes(CONFIG.whatsappNumber)) {
      // Preserve existing text query parameter if present
      const url = new URL(currentHref, window.location.origin);
      const textParam = url.searchParams.get("text") || "Hi! I want to order a professional CV.";
      link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(textParam)}`;
    }
  });

  // ============================================================
  // 5. STICKY NAVBAR SHADOW & SCROLL INDICATOR
  // ============================================================
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      if (nav) nav.classList.add("scrolled");
    } else {
      if (nav) nav.classList.remove("scrolled");
    }
  }, { passive: true });

});
