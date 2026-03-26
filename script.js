// ===== HERO SLIDESHOW =====
    // Function: initHeroSlideshow()
    // Purpose: Auto-advance slideshow, pause on hover, and control dots/arrows.
    const slides = Array.from(document.querySelectorAll('.slide'));
    const dotsWrap = document.getElementById('dots');
    let slideIndex = 0, slideTimer, paused = false;
    slides.forEach((_, i) => { const b = document.createElement('button'); b.className = 'w-3 h-3 rounded-full border border-[var(--gold)]'; b.setAttribute('aria-label', `Go to slide ${i+1}`); b.addEventListener('click', () => goToSlide(i)); dotsWrap.appendChild(b); });
    const dots = Array.from(dotsWrap.children);
    function updateSlides(){ slides.forEach((s,i)=>s.classList.toggle('active', i===slideIndex)); dots.forEach((d,i)=>d.classList.toggle('bg-[var(--gold)]', i===slideIndex)); dots.forEach((d,i)=>d.classList.toggle('bg-white/30', i!==slideIndex)); }
    function goToSlide(i){ slideIndex=(i+slides.length)%slides.length; updateSlides(); }
    function nextSlide(){ goToSlide(slideIndex+1); }
    function startSlides(){ slideTimer=setInterval(()=>{ if(!paused) nextSlide(); },5000); }
    document.getElementById('prevSlide').addEventListener('click',()=>goToSlide(slideIndex-1));
    document.getElementById('nextSlide').addEventListener('click',()=>goToSlide(slideIndex+1));
    document.getElementById('heroSlideshow').addEventListener('mouseenter',()=>paused=true);
    document.getElementById('heroSlideshow').addEventListener('mouseleave',()=>paused=false);
    updateSlides(); startSlides();

    // ===== MOBILE MENU TOGGLE =====
    // Function: toggleMobileMenu()
    // Purpose: Show/hide navigation menu on mobile devices.
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('hidden') === false;
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    // ===== SECTION REVEAL ANIMATIONS =====
    // Function: observeSections()
    // Purpose: Fade and translate sections/cards into view on scroll.
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('section-visible'); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section-hidden').forEach(el => {
      const delay = el.dataset.delay; if(delay) el.style.transitionDelay = `${delay}s`;
      io.observe(el);
    });

    // ===== HASH ROUTING =====
    // Function: showPage()
    // Purpose: Toggle #home, #care, and #species views from navigation clicks.
    const views = Array.from(document.querySelectorAll('.page-view'));
    function showPage(id){
      views.forEach(v => v.classList.toggle('hidden', v.id !== id));
      window.scrollTo({top:0,behavior:'smooth'});
      document.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      mobileMenu.classList.add('hidden'); menuBtn.setAttribute('aria-expanded','false');
    }
    function handleRoute(){ const id = location.hash.replace('#','') || 'home'; showPage(['home','care','species'].includes(id) ? id : 'home'); }
    window.addEventListener('hashchange', handleRoute);
    handleRoute();

    // ===== LIGHTBOX GALLERY =====
    // Function: initLightbox()
    // Purpose: Open gallery images fullscreen with prev/next controls.
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const galleryImages = [
      'https://drive.google.com/uc?export=view&id=1wG-8Uz9T8UrEn5Hx_aTagw7rrXKgnwHh',
      'https://drive.google.com/uc?export=view&id=1n9Ub0-odwjS2pBOHPTw1j1GvWH1rkf5F',
      'https://drive.google.com/uc?export=view&id=1I_GrKf5oYjK15FT6bzaYZt5nWse1e9GZ',
      'https://drive.google.com/uc?export=view&id=1wC90RjuXdSXAwMX_oDepmQLOqiLSV3XQ',
      'https://drive.google.com/uc?export=view&id=1j3zVhzwwxwhqJuT-X43uVa-GpSDVUlYL'
    ];
    let lightIndex = 0;
    function openLightbox(i){ lightIndex=i; lightboxImg.src=galleryImages[lightIndex]; lightbox.classList.add('open'); document.body.style.overflow='hidden'; }
    function closeLightbox(){ lightbox.classList.remove('open'); document.body.style.overflow=''; }
    function shiftLightbox(dir){ lightIndex=(lightIndex+dir+galleryImages.length)%galleryImages.length; lightboxImg.src=galleryImages[lightIndex]; }
    document.querySelectorAll('.gallery-item').forEach(btn => btn.addEventListener('click', ()=>openLightbox(Number(btn.dataset.index))));
    document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
    document.getElementById('lightPrev').addEventListener('click', ()=>shiftLightbox(-1));
    document.getElementById('lightNext').addEventListener('click', ()=>shiftLightbox(1));
    lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });

    // ===== SPECIES FILTERS =====
    // Function: filterSpecies()
    // Purpose: Filter species cards by category tab.
    document.querySelectorAll('.filter-tab').forEach(tab => tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.className='filter-tab rounded-full bg-white border border-slate-300 px-5 py-2 font-bold text-slate-700');
      tab.className='filter-tab rounded-full bg-[var(--forest)] text-white px-5 py-2 font-bold';
      const filter = tab.dataset.filter;
      document.querySelectorAll('.species-item').forEach(item => {
        item.classList.toggle('hide', filter !== 'all' && item.dataset.type !== filter);
      });
    }));

    // ===== FLOATING CALL BUTTON =====
    // Function: revealCallButton()
    // Purpose: Slide in call-to-action after page scroll threshold.
    const floatingCall = document.getElementById('floatingCall');
    window.addEventListener('scroll', () => { floatingCall.classList.toggle('show', window.scrollY > 600); });

    // ===== CONTACT FORM =====
    // Function: handleFormSubmit()
    // Purpose: Append contact data to a URL with parameters when submitted.
    document.getElementById('contactForm').addEventListener('submit', function(e){
      e.preventDefault();
      const fd = new FormData(this);
      const params = new URLSearchParams({
        full_name: fd.get('full_name') || '',
        email: fd.get('email') || '',
        phone: fd.get('phone') || '',
        agent: '48257001',
        custom_field_id: fd.get('custom_field') || '',
        message: fd.get('message') || '',
        tags: 'pacific-palms-nursery,phoenix'
      });
      window.location.href = `mailto:pacificpalmsaz@yahoo.com?subject=${encodeURIComponent('Pacific Palms Nursery Contact')}&body=${encodeURIComponent(params.toString())}`;
    });