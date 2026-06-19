document.addEventListener('DOMContentLoaded', () => {
  // --- FADE UP ANIMATIONS ---
  const fadeElements = document.querySelectorAll('.fade-up');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // --- MOBILE MENU ---
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isActive = navLinks.classList.toggle('active');
      menuBtn.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', isActive);
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', function (e) {
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }

      const targetId = this.getAttribute('href');
      // Only smooth scroll if it's an anchor link
      if (targetId.startsWith('#')) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // --- CUSTOM CURSOR (Desktop Only) ---
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (!isTouchDevice) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      // Usiamo transform per performance
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.addEventListener('mousedown', () => {
      cursor.classList.add('cursor-click');
      // Create explosion element
      const explosion = document.createElement('div');
      explosion.classList.add('cursor-explosion');
      explosion.style.left = `${cursor.getBoundingClientRect().left}px`;
      explosion.style.top = `${cursor.getBoundingClientRect().top}px`;
      document.body.appendChild(explosion);

      setTimeout(() => explosion.remove(), 400);
    });

    document.addEventListener('mouseup', () => {
      cursor.classList.remove('cursor-click');
    });

    // Cambia stato quando si va su link o bottoni
    const interactables = document.querySelectorAll('a, button, .service-card, .case-card, .chatbot-toggle, .editorial-box, .avatar-card, label');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
  }

  // --- FAQ ACCORDION ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parent = question.parentElement;
      const isActive = parent.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  // --- FORM CONSULENZA (Mailto Intercept) ---
  const consulenzaForm = document.getElementById('consulenza-form');
  if (consulenzaForm) {
    consulenzaForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(consulenzaForm);
      let bodyText = "Ciao Socialin, ho appena compilato il modulo. Ecco i dettagli della mia richiesta:\n\n";

      // Info base
      bodyText += `Nome: ${formData.get('name') || '-'}\n`;
      bodyText += `Brand/Attività: ${formData.get('brand') || '-'}\n`;
      bodyText += `Email: ${formData.get('email') || '-'}\n`;
      bodyText += `Telefono: ${formData.get('phone') || '-'}\n\n`;

      // Dettagli progetto
      bodyText += `Servizio di interesse: ${formData.get('service_interest') || '-'}\n`;
      bodyText += `Problema principale: ${formData.get('problem') || '-'}\n`;
      bodyText += `Budget indicativo: ${formData.get('budget') || '-'}\n\n`;

      // Contatto
      bodyText += `Preferenza di contatto: ${formData.get('contact_pref') || '-'}\n`;
      bodyText += `Giorni/Orari preferiti: ${formData.get('time_pref') || '-'}\n\n`;

      bodyText += "In attesa di un vostro riscontro per prenotare la consulenza.\n";

      // Encode for mailto
      const subject = encodeURIComponent("Richiesta consulenza Socialin Communication");
      const body = encodeURIComponent(bodyText);
      const mailtoLink = `mailto:socialincreative@gmail.com?subject=${subject}&body=${body}`;

      // Visual feedback and redirect
      const submitBtn = consulenzaForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = "Email generata! Apertura in corso...";
      submitBtn.classList.add('success');

      setTimeout(() => {
        window.location.href = mailtoLink;

        setTimeout(() => {
          submitBtn.innerText = originalText;
          submitBtn.classList.remove('success');
          // Scroll smoothly to calendar section
          document.querySelector('#calendario-section').scrollIntoView({ behavior: 'smooth' });
        }, 3000);
      }, 500);

      // Nota: Per invio reale del form via email collegare Formspree, Netlify Forms, Supabase, backend Node.js o servizio CRM.
    });
  }

});
