document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // Nav scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
    updateActiveLink();
  }, { passive: true });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Active nav link on scroll (top nav + bottom nav)
  const sections = document.querySelectorAll('section[id]');
  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const id = section.getAttribute('id');
      const topLink = document.querySelector(`.nav-link[href="#${id}"]`);
      const bottomLink = document.querySelector(`.nav-bottom-link[href="#${id}"]`);
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const isActive = scrollPos >= top && scrollPos < bottom;
      if (topLink) topLink.classList.toggle('active', isActive);
      if (bottomLink) bottomLink.classList.toggle('active', isActive);
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });


  // Staggered delays for grouped elements
  document.querySelectorAll('.timeline-item.reveal').forEach((el, i) => { el.dataset.delay = i * 120; });
  document.querySelectorAll('.education-card.reveal').forEach((el, i) => { el.dataset.delay = i * 80; });
  document.querySelectorAll('.project-card.reveal').forEach((el, i) => { el.dataset.delay = i * 100; });
  document.querySelectorAll('.skill-category.reveal').forEach((el, i) => { el.dataset.delay = i * 80; });
  document.querySelectorAll('.about-card').forEach((el, i) => { el.dataset.delay = i * 70; });

  document.querySelectorAll('.reveal, .fade-in').forEach(el => observer.observe(el));

  // Trigger initial state
  updateActiveLink();
});
