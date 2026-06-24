document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('presentation');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnIndex = document.getElementById('btn-index');
  const menuIndex = document.getElementById('menu-index');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const indexItems = Array.from(document.querySelectorAll('.index-item'));
  
  let currentSlide = 0;
  
  // Navigation function
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    
    // Deactivate previous active slide & index item
    slides[currentSlide].classList.remove('active');
    indexItems[currentSlide].classList.remove('active');
    
    // Set new index
    currentSlide = index;
    
    // Activate new slide & index item
    slides[currentSlide].classList.add('active');
    indexItems[currentSlide].classList.add('active');
    
    // Sync URL hash
    history.replaceState(null, null, '#' + slides[currentSlide].id);
    
    // Scroll active item in index menu into view
    const activeItem = indexItems[currentSlide];
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  // Next slide
  function nextSlide() {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }

  // Previous slide
  function prevSlide() {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Prevent hijacking key events if typing in form elements (safety fallback)
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      return;
    }
    
    switch(e.code) {
      case 'Space':
      case 'ArrowRight':
      case 'PageDown':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(slides.length - 1);
        break;
      case 'KeyF':
        e.preventDefault();
        toggleFullscreen();
        break;
    }
  });

  // Touch Swipe Navigation (for tablet projection support)
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50; // pixels
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide(); // Swipe left -> Next slide
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide(); // Swipe right -> Previous slide
    }
  }

  // Click controls
  btnPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    prevSlide();
  });
  
  btnNext.addEventListener('click', (e) => {
    e.stopPropagation();
    nextSlide();
  });

  // Fullscreen support
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        btnFullscreen.textContent = 'Esci';
      }).catch(err => {
        console.error(`Errore attivazione schermo intero: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  btnFullscreen.addEventListener('click', toggleFullscreen);

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      btnFullscreen.textContent = 'Schermo Intero';
    }
  });

  // Index Menu controls
  btnIndex.addEventListener('click', (e) => {
    e.stopPropagation();
    menuIndex.classList.toggle('active');
  });

  // Close index menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuIndex.contains(e.target) && e.target !== btnIndex) {
      menuIndex.classList.remove('active');
    }
  });

  // Link index items to slide transitions
  indexItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const slideIndex = parseInt(item.getAttribute('data-slide'), 10);
      goToSlide(slideIndex);
      menuIndex.classList.remove('active');
    });
  });

  // Handle URL hashes on page load
  function initFromHash() {
    const hash = window.location.hash;
    if (hash) {
      const slideId = hash.substring(1);
      const targetIndex = slides.findIndex(s => s.id === slideId);
      if (targetIndex !== -1) {
        goToSlide(targetIndex);
        return;
      }
    }
    goToSlide(0);
  }  // Listen to hashchange events (e.g. browser history back/forward)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash) {
      const slideId = hash.substring(1);
      const targetIndex = slides.findIndex(s => s.id === slideId);
      if (targetIndex !== -1 && targetIndex !== currentSlide) {
        goToSlide(targetIndex);
      }
    }
  });

  // Dynamic 16:9 Canvas scaling logic
  function adjustScale() {
    const baseWidth = 1920;
    const baseHeight = 1080;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Scale factor
    const scale = Math.min(windowWidth / baseWidth, windowHeight / baseHeight);
    
    container.style.transform = `translateX(-50%) scale(${scale})`;
  }
  
  // Call once immediately
  adjustScale();
  
  // Call on resize
  window.addEventListener('resize', adjustScale);

  // Initialize presentation
  initFromHash();
});
