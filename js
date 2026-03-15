const galleryData = {
  untitled: {
    title: 'Untitled',
    images: Array.from({ length: 12 }, (_, index) => ({
      src: `images/work/untitled/untitled${String(index + 1).padStart(2, '0')}.jpeg`,
      alt: `Untitled ${index + 1} by Gio Rios`,
    })),
  },
  'slow-light-still-water': {
    title: 'Slow Light, Still Water',
    images: Array.from({ length: 5 }, (_, index) => ({
      src: `images/work/slow-light-still-water/slow-light-still-water${String(index + 1).padStart(2, '0')}.jpeg`,
      alt: `Slow Light, Still Water ${index + 1} by Gio Rios`,
    })),
  },
  travel: {
    title: 'Travel',
    images: Array.from({ length: 6 }, (_, index) => ({
      src: `images/work/travel/travel${String(index + 1).padStart(2, '0')}.jpeg`,
      alt: `Travel ${index + 1} by Gio Rios`,
    })),
  },
  people: {
    title: 'People',
    images: Array.from({ length: 9 }, (_, index) => ({
      src: `images/work/people/people${String(index + 1).padStart(2, '0')}.jpeg`,
      alt: `People ${index + 1} by Gio Rios`,
    })),
  },
};

const printsData = [
  {
    title: 'Broken Down',
    src: 'images/prints/broken-down.jpeg',
    sizes: 'A4 £25 / A3 £40',
  },
  {
    title: 'Take a Seat',
    src: 'images/prints/take-a-seat.jpeg',
    sizes: 'A4 £25 / A3 £40',
  },
  {
    title: 'Red Room',
    src: 'images/prints/red-room.jpeg',
    sizes: 'A4 £25 / A3 £40',
  },
];

function initMenuToggle() {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function initGalleryPage() {
  const grid = document.getElementById('gallery-grid');
  const title = document.getElementById('gallery-title');
  if (!grid || !title) return;

  const params = new URLSearchParams(window.location.search);
  const category = params.get('category') || 'untitled';
  const gallery = galleryData[category];

  if (!gallery) {
    title.textContent = 'Work';
    grid.innerHTML = '<p>Gallery not found.</p>';
    return;
  }

  document.title = `${gallery.title} — Gio Rios`;
  title.textContent = gallery.title;

  grid.innerHTML = gallery.images
    .map(
      (image) => `
        <figure class="gallery-card">
          <img src="${image.src}" alt="${image.alt}" loading="lazy" />
        </figure>
      `
    )
    .join('');

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox?.querySelector('.lightbox-image');
  const closeButton = lightbox?.querySelector('.lightbox-close');

  if (!lightbox || !lightboxImage || !closeButton) return;

  grid.querySelectorAll('.gallery-card img').forEach((image) => {
    image.addEventListener('click', () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.src = '';
  };

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

function initPrintsPage() {
  const printsList = document.getElementById('prints-list');
  if (!printsList) return;

  printsList.innerHTML = printsData
    .map(
      (print) => `
        <article class="print-item">
          <img src="${print.src}" alt="${print.title} print by Gio Rios" loading="lazy" />
          <div class="print-meta">
            <h3>${print.title}</h3>
            <p>${print.sizes}</p>
            <p>Unframed</p>
            <a class="print-button" href="mailto:bygiorios@gmail.com?subject=${encodeURIComponent(`Print Enquiry — ${print.title}`)}">Enquire</a>
          </div>
        </article>
      `
    )
    .join('');
}

initMenuToggle();
initGalleryPage();
initPrintsPage();
