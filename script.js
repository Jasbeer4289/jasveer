// Scroll reveal with staggered entrances
const revealItems = document.querySelectorAll('.reveal');
revealItems.forEach((el, index) => {
  if (el.matches('.skill-card')) {
    const siblings = [...el.parentElement.children];
    el.style.setProperty('--reveal-delay', `${(siblings.indexOf(el) % 3) * 110}ms`);
  } else if (el.matches('.project')) {
    const siblings = [...el.parentElement.children];
    el.style.setProperty('--reveal-delay', `${siblings.indexOf(el) * 90}ms`);
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -35px 0px' });
revealItems.forEach((el) => observer.observe(el));

// Reading progress and compact sticky header
const progress = document.querySelector('.scroll-progress span');
const topbar = document.querySelector('.topbar');
let ticking = false;
function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
  topbar.classList.toggle('scrolled', window.scrollY > 24);
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollUI);
    ticking = true;
  }
}, { passive: true });
updateScrollUI();

// Mobile navigation
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));

// Rotating professional roles
const roles = ['IT HARDWARE ENGINEER', 'IT ADMINISTRATOR', 'TECHNICAL SUPPORT'];
let roleIndex = 0;
setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  const target = document.getElementById('rotating-role');
  if (!target) return;
  target.classList.add('changing');
  setTimeout(() => { target.textContent = roles[roleIndex]; target.classList.remove('changing'); }, 220);
}, 2600);

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();



// Cursor-only warm-red electric sparks. No particles are emitted by cards or sections.
(() => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reducedMotion) return;
  const layer = document.createElement('div');
  layer.className = 'cursor-electric';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);
  let last = 0;
  document.addEventListener('pointermove', (event) => {
    layer.style.left = `${event.clientX}px`;
    layer.style.top = `${event.clientY}px`;
    layer.classList.add('active');
    const now = performance.now();
    if (now - last < 34) return;
    last = now;
    const count = 2 + Math.floor(Math.random() * 3);
    for (let n = 0; n < count; n++) {
      const spark = document.createElement('i');
      spark.style.setProperty('--len', `${8 + Math.random() * 19}px`);
      spark.style.setProperty('--angle', `${Math.random() * 360}deg`);
      layer.appendChild(spark);
      spark.addEventListener('animationend', () => spark.remove(), { once: true });
    }
  }, { passive: true });
  document.addEventListener('pointerleave', () => layer.classList.remove('active'));
  document.addEventListener('pointerdown', () => {
    const core = document.createElement('b');
    layer.appendChild(core);
    setTimeout(() => core.remove(), 180);
  });
})();
