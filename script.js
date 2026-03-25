tailwind.config = {
      theme: {
        extend: {
          colors: {
            forest: '#1a3a2a',
            sand: '#c9a84c',
            ink: '#2b2f2c'
          },
          fontFamily: {
            display: ['Playfair Display', 'serif'],
            body: ['Lato', 'sans-serif']
          },
          boxShadow: {
            luxe: '0 18px 60px rgba(26,58,42,.18)'
          }
        }
      }
    }

// ===== MOBILE MENU TOGGLE =====
    // Function: toggleMobileMenu()
    // Purpose: Show/hide navigation menu on mobile devices
    // Triggers: Click on hamburger menu button
    function toggleMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      const button = document.getElementById('nav-menu-toggle');
      const isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      button.setAttribute('aria-expanded', String(!isOpen));
    }

    // ===== HASH ROUTING =====
    // Function: setActivePage()
    // Purpose: Display the routed section based on URL hash for SPA-like navigation
    function setActivePage() {
      const hash = window.location.hash || '#home';
      const pageMap = {
        '#home': 'home',
        '#care': 'care',
        '#species': 'species-list'
      };
      document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
      const target = document.getElementById(pageMap[hash] || 'home');
      if (target) target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const mobileMenu = document.getElementById('mobile-menu');
      mobileMenu.classList.add('hidden');
      document.getElementById('nav-menu-toggle').setAttribute('aria-expanded', 'false');
    }

    // ===== NAVIGATION EVENT WIRING =====
    // Function: bindNavigation()
    // Purpose: Connect desktop and mobile menu interactions to route changes
    function bindNavigation() {
      document.getElementById('nav-menu-toggle').addEventListener('click', toggleMobileMenu);
      window.addEventListener('hashchange', setActivePage);
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function () {
          const mobileMenu = document.getElementById('mobile-menu');
          mobileMenu.classList.add('hidden');
          document.getElementById('nav-menu-toggle').setAttribute('aria-expanded', 'false');
        });
      });
    }

    // ===== INITIALIZATION =====
    // Function: initApp()
    // Purpose: Start routing and UI interactions after DOM content is ready
    function initApp() {
      bindNavigation();
      setActivePage();
    }

    document.addEventListener('DOMContentLoaded', initApp);