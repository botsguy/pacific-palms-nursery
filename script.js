// ===== SCROLL REVEAL SYSTEM =====
    // Function: initReveal()
    // Purpose: Trigger fade-up animations for sections and cards using IntersectionObserver
    function initReveal() {
      const items = document.querySelectorAll('.section-reveal, .reveal-item, .gallery-item, .species-card');
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16 });
      items.forEach((el, i) => { el.style.transitionDelay = (i % 6) * 0.08 + 's'; io.observe(el); });
    }

    // ===== HERO SLIDESHOW =====
    // Function: initSlideshow()
    // Purpose: Auto-advance crossfade slideshow with dots and arrow controls
    function initSlideshow() {
      const slides = [...document.querySelectorAll('.slide')];
      const dotsWrap = document.getElementById('hero-dots');
      let index = 0, timer;
      slides.forEach((_, i) => { const d = document.createElement('button'); d.className = 'dot'; d.ariaLabel = 'Go to slide ' + (i + 1); d.onclick = () => go(i); dotsWrap.appendChild(d); });
      const dots = [...dotsWrap.children];
      function render() { slides.forEach((s,i)=>s.classList.toggle('active',i===index)); dots.forEach((d,i)=>d.classList.toggle('active',i===index)); }
      function go(i){ index = (i + slides.length) % slides.length; render(); reset(); }
      function next(){ go(index + 1); }
      function reset(){ clearInterval(timer); timer = setInterval(next, 4000); }
      document.getElementById('hero-prev').onclick = () => go(index - 1);
      document.getElementById('hero-next').onclick = () => go(index + 1);
      const hero = document.getElementById('home');
      hero.addEventListener('mouseenter', () => clearInterval(timer));
      hero.addEventListener('mouseleave', reset);
      render(); reset();
    }

    // ===== LIGHTBOX GALLERY =====
    // Function: initLightbox()
    // Purpose: Open clicked gallery images in fullscreen overlay
    function initLightbox() {
      const box = document.getElementById('lightbox'), img = document.getElementById('lightbox-img');
      document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => { img.src = item.dataset.full; img.alt = item.querySelector('img').alt; box.classList.remove('hidden'); box.classList.add('flex'); }));
      document.getElementById('lightbox-close').onclick = () => { box.classList.add('hidden'); box.classList.remove('flex'); img.src = ''; };
      box.addEventListener('click', e => { if(e.target === box) document.getElementById('lightbox-close').click(); });
    }

    // ===== MOBILE MENU TOGGLE =====
    // Function: toggleMobileMenu()
    // Purpose: Show or hide the mobile navigation menu
    function toggleMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
    }

    // ===== FLOATING CALL BUTTON =====
    // Function: initFloatingCall()
    // Purpose: Reveal call-to-action after scrolling 600px
    function initFloatingCall() {
      const btn = document.getElementById('floating-call');
      window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 600), { passive: true });
      btn.onclick = () => window.location.href = 'tel:6235806933';
    }

    // ===== HASH ROUTING =====
    // Function: initHashRouting()
    // Purpose: Support navigation to page anchors while preserving smooth scrolling
    function initHashRouting() {
      document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.replaceState(null, '', '#' + id); }
      }));
    }

    // ===== TESTIMONIAL ROTATOR =====
    // Function: initTestimonials()
    // Purpose: Rotate visible testimonial emphasis on smaller screens
    function initTestimonials() {
      const cards = [...document.querySelectorAll('.testimonial-card')];
      let i = 0;
      setInterval(() => { cards.forEach((c, idx) => c.style.transform = idx === i ? 'translateY(-4px) scale(1.01)' : 'none'); i = (i + 1) % cards.length; }, 3000);
    }

    // ===== SPECIES FILTERS =====
    // Function: initFilters()
    // Purpose: Filter species cards by category
    function initFilters() {
      const buttons = [...document.querySelectorAll('.species-filter')];
      const cards = [...document.querySelectorAll('.species-card')];
      buttons.forEach(btn => btn.addEventListener('click', () => {
        buttons.forEach(b => b.className = 'species-filter px-4 py-2 rounded-full bg-white border border-black/10');
        btn.className = 'species-filter px-4 py-2 rounded-full bg-[#1a3a2a] text-white';
        const f = btn.dataset.filter;
        cards.forEach(c => c.style.display = (f === 'all' || c.dataset.type.includes(f)) ? '' : 'none');
      }));
    }

    // ===== INIT =====
    document.getElementById('nav-menu-toggle').addEventListener('click', toggleMobileMenu);
    window.addEventListener('DOMContentLoaded', () => { initReveal(); initSlideshow(); initLightbox(); initFloatingCall(); initHashRouting(); initTestimonials(); initFilters(); });