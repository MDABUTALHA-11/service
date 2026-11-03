/**
 * CareerForge — Premium CV Landing Page
 * Interactive JS: Scroll Reveal, Accordion, Mobile Nav
 *
 * The $4.99 Stripe Payment Link is hardcoded directly in the HTML <a> tags.
 * No JS redirect needed — it opens directly on Stripe's hosted checkout page.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. SCROLL REVEAL (Intersection Observer)
  // ============================================================
  const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-delay]');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // ============================================================
  // 2. STICKY NAV — add shadow on scroll
  // ============================================================
  const nav = document.getElementById('nav');

  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
    } else {
      nav.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // ============================================================
  // 3. MOBILE HAMBURGER MENU
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      // Animate hamburger bars
      const bars = hamburger.querySelectorAll('span');
      if (isOpen) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });

    // Close when a link is clicked
    navMenu.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelectorAll('span').forEach(b => {
          b.style.transform = '';
          b.style.opacity   = '';
        });
      });
    });
  }

  // ============================================================
  // 4. FAQ ACCORDION
  // ============================================================
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion__header');
    const body   = item.querySelector('.accordion__body');

    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      accordionItems.forEach((other) => {
        other.classList.remove('open');
        const otherBody = other.querySelector('.accordion__body');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ item on load
  if (accordionItems.length > 0) {
    const first = accordionItems[0];
    const firstBody = first.querySelector('.accordion__body');
    first.classList.add('open');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }

  // ============================================================
  // 5. MARQUEE — pause on hover
  // ============================================================
  const marqueeTrack = document.querySelector('.marquee-strip__track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  // ============================================================
  // 6. SMOOTH ACTIVE NAV HIGHLIGHT ON SCROLL
  // ============================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((sec) => sectionObserver.observe(sec));

});
