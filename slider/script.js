
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-arrow.left');
    const nextBtn = document.querySelector('.slider-arrow.right');
    const pagination = document.querySelector('.pagination');
    let currentIndex = 0;
    let intervalId;

    function goToSlide(index) {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        slider.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updatePagination();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function updatePagination() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        pagination.appendChild(dot);
    });

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    updatePagination();

    // Keyboard events
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Autoplay
    function startAutoplay() {
        intervalId = setInterval(nextSlide, 3000); // 3000ms = 3 seconds
    }

    function stopAutoplay() {
        clearInterval(intervalId);
    }

    startAutoplay();

    // Pause autoplay on mouse hover
    slider.addEventListener('mouseover', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
});