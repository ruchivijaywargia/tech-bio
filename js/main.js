/* ============================================
   Ruchi Vijaywargia — Tech Bio
   Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Animated Number Counters ---
  function animateCounters() {
    const counters = document.querySelectorAll('.metric-number[data-target]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.getAttribute('data-target'));
            const decimals = (target % 1 !== 0) ? 1 : 0;
            const duration = 2000;
            const startTime = performance.now();

            function easeOutQuart(t) {
              return 1 - Math.pow(1 - t, 4);
            }

            function update(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = easeOutQuart(progress);
              const current = easedProgress * target;

              el.textContent = current.toFixed(decimals);

              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                el.textContent = target.toFixed(decimals);
              }
            }

            requestAnimationFrame(update);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  // --- Navigation Scroll Behavior ---
  function initNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuToggle = document.getElementById('menu-toggle');
    const sections = document.querySelectorAll('section[id]');

    // Shrink nav on scroll
    function onScroll() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Active section highlighting
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Close mobile menu on link click
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (menuToggle) {
          menuToggle.checked = false;
        }
      });
    });
  }

  // --- Staggered Skill Tag Animation ---
  function initSkillAnimations() {
    const skillCategories = document.querySelectorAll('.skill-category');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.tag');
            tags.forEach((tag, index) => {
              tag.style.opacity = '0';
              tag.style.transform = 'translateY(10px)';
              setTimeout(() => {
                tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
              }, index * 60);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    skillCategories.forEach((category) => observer.observe(category));
  }

  // --- Initialize Everything ---
  function init() {
    animateCounters();
    initNavigation();
    initSkillAnimations();

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic',
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
