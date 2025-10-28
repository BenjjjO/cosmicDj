// Booking/contact form validation and feedback
try {
  const bookingForm = document.querySelector('.booking__form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = bookingForm.elements['name']?.value.trim() || '';
      const email = bookingForm.elements['email']?.value.trim() || '';
      const event = bookingForm.elements['event']?.value.trim() || '';
      const details = bookingForm.elements['details']?.value.trim() || '';
      const msg = document.getElementById('form-msg');
      if (!name || !email || !event || !details) {
        msg.textContent = 'Please fill in all fields.';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        msg.textContent = 'Please enter a valid email address.';
        return;
      }
      msg.textContent = 'Thank you! Your booking request has been sent.';
      bookingForm.reset();
      setTimeout(() => { msg.textContent = ''; }, 4000);
    });
  }
} catch (err) {
  console.error('Booking form error:', err);
}
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const navSearch = document.getElementById("nav-search");

// Improve placeholder to be DJ/marketing-oriented
const searchInput = navSearch.querySelector('input');
if (searchInput) searchInput.setAttribute('placeholder', 'Search tracks or services');

navSearch.addEventListener("click", (e) => {
  navSearch.classList.toggle("open");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content div", {
  duration: 1000,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".deals__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".about__card", {
  duration: 1000,
  interval: 500,
  delay: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,
});

// Dark mode toggle logic
const darkToggle = document.getElementById('dark-toggle');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    const root = document.documentElement;
    const isLight = root.getAttribute('data-theme') === 'light';
    root.setAttribute('data-theme', isLight ? 'dark' : 'light');
    darkToggle.innerHTML = isLight ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>';
  });
  // Set initial theme based on system preference
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
    darkToggle.innerHTML = '<i class="ri-sun-line"></i>';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkToggle.innerHTML = '<i class="ri-moon-line"></i>';
  }
}
     
/* ===== Custom Scroll Effects ===== */

// Create a slim progress bar at the top of the page
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

// IntersectionObserver reveal for several blocks
const revealSelectors = ['.header__content > div', '.deals__card', '.about__card', '.product__card', '.client__card'];
const revealNodes = document.querySelectorAll(revealSelectors.join(','));
revealNodes.forEach((n) => n.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealNodes.forEach((n) => revealObserver.observe(n));

// Parallax for header image
const parallaxImg = document.querySelector('.header__image img[data-parallax]');

function handleParallax() {
  if (!parallaxImg) return;
  const speed = parseFloat(parallaxImg.getAttribute('data-parallax')) || 0.2;
  // Move the image slightly based on page scroll
  const y = window.scrollY * speed;
  parallaxImg.style.transform = `translateY(${y}px)`;
}

// Combined optimized scroll handler using requestAnimationFrame
let scrollTick = false;
function onScroll() {
  if (scrollTick) return;
  scrollTick = true;
  window.requestAnimationFrame(() => {
    // progress
    const doc = document.documentElement;
    const scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const pct = (scrollTop / (scrollHeight || 1)) * 100;
    progressBar.style.width = pct + '%';

    // parallax
    handleParallax();

    scrollTick = false;
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

// initialize progress width and parallax on load
window.addEventListener('load', () => {
  onScroll();
});

/* ===== End custom scroll effects ===== */