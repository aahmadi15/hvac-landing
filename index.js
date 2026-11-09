/* ---------- Hero slider ---------- */
const slides = document.querySelectorAll('.hero .my-slide');
const images = document.querySelectorAll('.slide-image');
const track = document.querySelector('.image-track');
const hero = document.querySelector('.hero');
const dotsBox = document.querySelector('.dots');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let slideIndex = 0;
let timer = null;

// one dot per slide
const dots = Array.from(slides).map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Show service ${i + 1}`);
    dot.addEventListener('click', () => showSlide(i));
    dotsBox.appendChild(dot);
    return dot;
});

function showSlide(n) {
    if (!slides.length) return;

    slideIndex = (n + slides.length) % slides.length;

    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === slideIndex));
    images.forEach((img, i) => img.classList.toggle('is-active', i === slideIndex));
    dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === slideIndex);
        dot.setAttribute('aria-current', i === slideIndex ? 'true' : 'false');
    });

    track?.style.setProperty('--index', slideIndex);   // slides the photo track
}

function startRotation() {
    if (reduceMotion || timer) return;   // respect the setting, never stack timers
    timer = setInterval(() => showSlide(slideIndex + 1), 5000);
}

function stopRotation() {
    clearInterval(timer);
    timer = null;
}

hero.addEventListener('mouseenter', stopRotation);   // pause while hovering
hero.addEventListener('mouseleave', startRotation);
hero.addEventListener('focusin', stopRotation);      // pause for keyboard users too
hero.addEventListener('focusout', startRotation);

showSlide(0);
startRotation();

/* ---------- Menu button (phones) ---------- */
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
});

/* ---------- Newsletter form ---------- */
const nlForm = document.getElementById('newsletter-form');
const nlMsg = document.getElementById('newsletter-msg');

nlForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!nlForm.checkValidity()) {
        nlMsg.textContent = 'Enter a valid email and tick the consent box.';
        return;
    }

    // TODO: send nlForm's email to your email service here (Mailchimp, MailerLite, Formspree...)
    nlMsg.textContent = 'Thanks for subscribing!';
    nlForm.reset();
});