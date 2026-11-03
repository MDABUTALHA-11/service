/**
 * CareerForge — Archival Executive CV & Resume Atelier
 * Interactive Application Engine:
 * 1. Seamless mobile navigation drawer & touch handling
 * 2. Executive CV Application & Client Intake Portal
 * 3. Stripe checkout routing for all tiers ($4.99 to $24.99)
 * 4. FAQ Accordion
 * 5. Scroll Reveal animations
 */

const CONFIG = {
  // Direct Atelier Support Email
  supportEmail: "support@careerforgecv.com", 

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
  // 4. EXECUTIVE CV APPLICATION & INTAKE PORTAL
  // ============================================================
  const appForm = document.getElementById("cvApplicationForm");
  const packageSelect = document.getElementById("packageSelect");
  const confirmationBox = document.getElementById("applicationConfirmation");
  const refCodeSpan = document.getElementById("refCode");
  const confirmedTierSpan = document.getElementById("confirmedTier");
  const confirmedCheckoutBtn = document.getElementById("confirmedCheckoutBtn");
  const newApplicationBtn = document.getElementById("newApplicationBtn");

  // Pre-select package when clicking "Submit Application" from pricing cards
  document.querySelectorAll(".apply-tier-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tier = btn.getAttribute("data-tier");
      if (packageSelect && tier) {
        // Find matching option
        for (let i = 0; i < packageSelect.options.length; i++) {
          if (packageSelect.options[i].value === tier || packageSelect.options[i].text.includes(tier)) {
            packageSelect.selectedIndex = i;
            break;
          }
        }
      }
      const nameInput = document.getElementById("applicantName");
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 400);
      }
    });
  });

  // Handle application submission
  if (appForm) {
    appForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("applicantName");
      const emailInput = document.getElementById("applicantEmail");
      const roleInput = document.getElementById("targetRole");
      const notesInput = document.getElementById("applicantNotes");
      const turnaroundRadio = document.querySelector('input[name="turnaround"]:checked');

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const role = roleInput ? roleInput.value.trim() : "";
      const tier = packageSelect ? packageSelect.value : "Basic CV Package";
      const notes = notesInput ? notesInput.value.trim() : "";
      const turnaround = turnaroundRadio ? turnaroundRadio.value : "24h";

      if (!name || !email || !role) {
        alert("Please complete the required fields (Name, Email, Target Role).");
        return;
      }

      // Generate unique archival dossier reference code
      const randomRef = Math.floor(1000 + Math.random() * 9000);
      const dossierCode = `CF-2026-${randomRef}`;

      // Store in browser local storage
      try {
        localStorage.setItem("careerForgeApplication", JSON.stringify({
          dossierCode,
          name,
          email,
          role,
          tier,
          notes,
          turnaround,
          submittedAt: new Date().toISOString()
        }));
      } catch (err) {
        console.warn("Storage notice:", err);
      }

      // Find matching Stripe checkout URL for the selected package
      const checkoutUrl = CONFIG.stripeLinks[tier] || CONFIG.stripeBasicLink;

      // Update confirmation dossier UI
      if (refCodeSpan) refCodeSpan.textContent = dossierCode;
      if (confirmedTierSpan) confirmedTierSpan.textContent = tier;
      if (confirmedCheckoutBtn) confirmedCheckoutBtn.href = checkoutUrl;

      // Swap view to confirmation receipt
      appForm.style.display = "none";
      if (confirmationBox) {
        confirmationBox.classList.remove("hidden");
        confirmationBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  // Handle "Edit Details / New Submission"
  if (newApplicationBtn && appForm && confirmationBox) {
    newApplicationBtn.addEventListener("click", () => {
      confirmationBox.classList.add("hidden");
      appForm.style.display = "block";
      appForm.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

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
