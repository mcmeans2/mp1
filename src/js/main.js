/* Your JS here. */
document.addEventListener('DOMContentLoaded', () => {
console.log("%c✨ Moon Prism Power ✨", "color: #00e5ff; font-size: 14px; font-weight: bold; text-shadow: 0 0 5px #b388ff;");
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('navbar-scrolled');
    } else {
      header.classList.remove('navbar-scrolled');
    }

    const navHeight = header.offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 10;
    const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;

    if (reachedBottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[navLinks.length - 1].classList.add('active');
      return;
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // console.log("Tracking section:", currentSectionId);

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const navHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Modal 
  const modalBackdrop = document.getElementById('modal-backdrop');
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (openModalBtn && modalBackdrop && closeModalBtn) {
    openModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.add('hidden');
    });

    modalBackdrop.addEventListener('click', e => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.add('hidden');
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) {
        modalBackdrop.classList.add('hidden');
      }
    });
  }

  // Carousel
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  let currentSlideIndex = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  if (slides.length > 0 && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      showSlide(currentSlideIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      showSlide(currentSlideIndex);
    });
  }
});