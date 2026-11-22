const carousel = document.querySelector('.hero');
const slides = [...carousel.querySelectorAll('.slide')];
const controls = carousel.querySelector('.controls');
const dots = [...controls.querySelectorAll('.dots button')];
const status = carousel.querySelector('#status');
// const elements = document.getElementsByTagName('section');
const header = document.getElementById('home');
const newItem = document.createElement('span');
newItem.textContent = 'Orange';
header.prepend(newItem);
console.log(header);
let activeSlide = 0;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, position) => {
    const isActive = position === activeSlide;
    slide.hidden = !isActive;
    dots[position].setAttribute('aria-pressed', String(isActive));
  });

  const title = dots[activeSlide].getAttribute('aria-label');
  status.textContent = `Слайд ${activeSlide + 1} от ${slides.length}. ${title}`;
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});
controls.querySelector('#prev').addEventListener('click', () => showSlide(activeSlide - 1));
controls.querySelector('#next').addEventListener('click', () => showSlide(activeSlide + 1));
carousel.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  const direction = event.key === 'ArrowLeft' ? -1 : 1;
  showSlide(activeSlide + direction);
  if (dots.includes(document.activeElement)) dots[activeSlide].focus();
});
carousel.querySelectorAll('.slide a').forEach((link) => {
  link.addEventListener('click', () => {
    const article = document.querySelector(link.hash);
    article.querySelector('details').open = true;
  });
});
controls.hidden = false;

