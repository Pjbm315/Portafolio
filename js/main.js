// ============ NAVBAR SCROLL ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ============ MENÚ MÓVIL ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ============ ANIMACIÓN AL SCROLL ============
const revealElements = document.querySelectorAll(
  '.section-title, .project-card, .skill-card, .about-text, .about-image'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// ============ EFECTO TYPING ============
const typingElement = document.getElementById('typing');
if (typingElement) {
  const roles = [
    'Desarrollador Web Front-End',
    'Especialista en HTML & CSS',
    'Creador de Interfaces Modernas'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeEffect() {
    const current = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;
    
    typingElement.textContent = current.substring(0, charIndex);
    
    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => { isDeleting = true; typeEffect(); }, 2000);
      return;
    }
    
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    
    charIndex += isDeleting ? -1 : 1;
    setTimeout(typeEffect, speed);
  }
  
  typeEffect();
}

// ============ FORMULARIO DE CONTACTO (Formspree + toast) ============
const contactForm = document.getElementById('contactForm');

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const button = contactForm.querySelector('button');
  const originalText = button.innerHTML;
  
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  button.disabled = true;

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showToast('¡Mensaje enviado! Te responderé pronto.', 'success');
      contactForm.reset();
    } else {
      showToast('Hubo un error. Intenta de nuevo.', 'error');
    }
  } catch (error) {
    showToast('Error de conexión. Intenta de nuevo.', 'error');
  } finally {
    button.innerHTML = originalText;
    button.disabled = false;
  }
});