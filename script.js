/**
 * CareerBoost CV Landing Page - Interactive Scripts
 * Handles:
 * 1. Stripe Payment Links integration (Zero-backend Stripe checkout)
 * 2. WhatsApp dynamic message generator
 * 3. FAQ Accordion
 * 4. Template Filter Tabs
 * 5. Mobile Navigation Menu
 */

// =========================================================================
// 1. CONFIGURATION (Edit these links with your actual Stripe & WhatsApp info)
// =========================================================================
const CONFIG = {
  // Your international phone number with country code (e.g. 15551234567 or 8801700000000)
  whatsappNumber: "1234567890", 

  // Put your Stripe Payment Links here (generated in 2 mins from Stripe Dashboard)
  // Format: "https://buy.stripe.com/..."
  stripeLinks: {
    "Basic CV Package": "https://buy.stripe.com/test_basic_cv_499",
    "Professional CV": "https://buy.stripe.com/test_pro_cv_999",
    "CV + Cover Letter": "https://buy.stripe.com/test_cv_cover_1499",
    "CV + LinkedIn Revamp": "https://buy.stripe.com/test_cv_linkedin_1999",
    "Complete Job Package": "https://buy.stripe.com/test_complete_bundle_2499"
  }
};

// =========================================================================
// 2. Stripe Checkout Modal & Payment Link Handling
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("stripeModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalPackageTitle = document.getElementById("modalPackageTitle");
  const modalPackagePrice = document.getElementById("modalPackagePrice");
  const modalStripeLink = document.getElementById("modalStripeLink");
  const modalWhatsAppLink = document.getElementById("modalWhatsAppLink");

  const stripePayButtons = document.querySelectorAll(".stripe-pay-btn");

  stripePayButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const packageName = btn.getAttribute("data-package") || "Professional CV";
      const price = btn.getAttribute("data-price") || "4.99";
      
      // Determine Stripe link
      const targetStripeLink = CONFIG.stripeLinks[packageName] || btn.getAttribute("data-stripe-link");

      // Set modal content
      modalPackageTitle.textContent = packageName;
      modalPackagePrice.textContent = `$${price}`;
      modalStripeLink.href = targetStripeLink;

      // Set dynamic WhatsApp order message
      const encodedMsg = encodeURIComponent(
        `Hi! I would like to order the "${packageName}" for $${price}. Please share payment and order requirements.`
      );
      modalWhatsAppLink.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`;

      // Open modal
      openModal();
    });
  });

  function openModal() {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "auto";
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // =========================================================================
  // 3. FAQ Accordion Toggle
  // =========================================================================
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = item.querySelector(".accordion-content");
      const isActive = item.classList.contains("active");

      // Close all other accordion items
      document.querySelectorAll(".accordion-item").forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherContent = otherItem.querySelector(".accordion-content");
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove("active");
        content.style.maxHeight = null;
      } else {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Open first FAQ by default
  if (accordionHeaders.length > 0) {
    accordionHeaders[0].click();
  }

  // =========================================================================
  // 4. Template Filter Tabs
  // =========================================================================
  const tabButtons = document.querySelectorAll(".template-tab-btn");
  const templateCards = document.querySelectorAll(".template-card");

  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabButtons.forEach((b) => b.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-filter");

      templateCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.4s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // =========================================================================
  // 5. Mobile Menu Toggle
  // =========================================================================
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const icon = mobileToggle.querySelector("i");
      if (navMenu.classList.contains("open")) {
        icon.className = "fa-solid fa-xmark";
      } else {
        icon.className = "fa-solid fa-bars";
      }
    });

    // Close mobile menu when clicking a link
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        const icon = mobileToggle.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      });
    });
  }

  // Update static WhatsApp links in the page with the configured phone number
  document.querySelectorAll('a[href*="YOUR_PHONE_NUMBER"]').forEach((a) => {
    a.href = a.href.replace("YOUR_PHONE_NUMBER", CONFIG.whatsappNumber);
  });
});
