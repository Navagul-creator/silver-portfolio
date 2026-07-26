// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 12);
}, { passive:true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .frame');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Project case-study toggles
document.querySelectorAll('.p-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const detail = btn.parentElement.querySelector('.p-detail');
    const isOpen = btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.querySelector('.btn-label').textContent = isOpen ? 'Hide case study' : 'Read case study';
    detail.style.maxHeight = isOpen ? detail.scrollHeight + 'px' : 0;
  });
});

// Active nav (scrollspy) — emerald highlight follows scroll position
const navAnchors = Array.from(document.querySelectorAll('.nav-links a[data-nav]'));
const navSections = navAnchors
  .map(a => document.getElementById(a.dataset.nav))
  .filter(Boolean);

function updateActiveNav(){
  const scrollPos = window.scrollY + 140;
  let currentId = navSections[0] ? navSections[0].id : null;
  navSections.forEach(sec => {
    if (sec.offsetTop <= scrollPos) currentId = sec.id;
  });
  navAnchors.forEach(a => a.classList.toggle('active', a.dataset.nav === currentId));
}
window.addEventListener('scroll', updateActiveNav, { passive:true });
window.addEventListener('load', updateActiveNav);
