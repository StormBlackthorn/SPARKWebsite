const CAROUSEL_SLIDES = [
    {
        src: "styles/assets/classroom_images/1.png",
        alt: "SPARK club activity"
    },
    {
        src: "styles/assets/classroom_images/2.png",
        alt: "Students learning STEM"
    },
    {
        src: "styles/assets/classroom_images/3.png",
        alt: "Volunteer teaching session"
    }
];

const CAROUSEL_AUTOPLAY_MS = 7500;

const ARROW_ICON_PREV = `<svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

const ARROW_ICON_NEXT = `<svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

function createCarouselArrow(direction, label) {
    const arrow = UI.element("button", {
        type: "button",
        class: `carousel-arrow ${direction}`,
        "aria-label": label
    });
    arrow.innerHTML = direction === "prev" ? ARROW_ICON_PREV : ARROW_ICON_NEXT;
    return arrow;
}

function createCarouselPauseControl() {
    const controls = UI.element("div", { class: "carousel-controls" });
    const pauseButton = UI.element("div", {
        class: "carousel-pause",
        role: "button",
        tabindex: "0",
        "aria-label": "Pause carousel"
    });

    pauseButton.innerHTML = `
        <svg width="50" height="50" viewBox="0 0 250 250" class="circular-progress" aria-hidden="true">
            <circle class="fg"></circle>
        </svg>
        <img class="carousel-pause-icon" src="styles/assets/pause.svg" alt="" width="32" height="32">
    `;

    UI.add(controls, pauseButton);
    return { controls, pauseButton };
}

function initCarouselBehavior(carousel) {
    const track = carousel.querySelector(".carousel-track");
    const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
    const prevButton = carousel.querySelector(".carousel-arrow.prev");
    const nextButton = carousel.querySelector(".carousel-arrow.next");
    const pauseButton = carousel.querySelector(".carousel-pause");
    const pauseIcon = carousel.querySelector(".carousel-pause-icon");
    const circularProgress = carousel.querySelector(".circular-progress");
    const slideCount = dots.length;

    let currentIndex = 0;
    let paused = false;
    let startTime = null;
    let pausedTime = 0;
    let animationFrame = null;

    function setSlide(index) {
        currentIndex = ((index % slideCount) + slideCount) % slideCount;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
            const isCurrent = i === currentIndex;
            dot.classList.toggle("current", isCurrent);
            dot.setAttribute("aria-selected", isCurrent ? "true" : "false");
        });
    }

    function step(direction) {
        setSlide(currentIndex + direction);
    }

    function resetAutoplay() {
        startTime = null;
        pausedTime = 0;
        circularProgress.style.setProperty("--progress", "0");
    }

    function animate(timestamp) {
        if (!startTime) startTime = timestamp - pausedTime;
        if (paused) return;

        let progress = (timestamp - startTime) / CAROUSEL_AUTOPLAY_MS;

        if (progress >= 1) {
            step(1);
            startTime = timestamp;
            progress = 0;
        }

        circularProgress.style.setProperty("--progress", (progress * 100).toString());
        animationFrame = requestAnimationFrame(animate);
    }

    function togglePause() {
        paused = !paused;
        pauseIcon.src = paused ? "styles/assets/play.svg" : "styles/assets/pause.svg";
        pauseIcon.alt = paused ? "Play" : "Pause";
        pauseButton.setAttribute("aria-label", paused ? "Play carousel" : "Pause carousel");

        if (paused) {
            pausedTime = performance.now() - startTime;
        } else {
            startTime = performance.now() - pausedTime;
            animationFrame = requestAnimationFrame(animate);
        }
    }

    prevButton.addEventListener("click", () => {
        step(-1);
        resetAutoplay();
    });

    nextButton.addEventListener("click", () => {
        step(1);
        resetAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            setSlide(index);
            resetAutoplay();
        });
    });

    pauseButton.addEventListener("click", togglePause);
    pauseButton.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            togglePause();
        }
    });

    setSlide(0);
    animationFrame = requestAnimationFrame(animate);
}

function renderCarousel() {
    const carousel = UI.element("div", {
        class: "carousel",
        "aria-label": "Photo carousel"
    });

    const { controls } = createCarouselPauseControl();
    const prevButton = createCarouselArrow("prev", "Previous slide");
    const nextButton = createCarouselArrow("next", "Next slide");

    const viewport = UI.element("div", { class: "carousel-viewport" });
    const track = UI.element("div", { class: "carousel-track" });

    CAROUSEL_SLIDES.forEach((slide) => {
        UI.add(track, UI.component("carousel-slide", slide));
    });

    UI.add(viewport, track);

    const dots = UI.element("div", {
        class: "carousel-dots",
        role: "tablist",
        "aria-label": "Carousel slides"
    });

    CAROUSEL_SLIDES.forEach((_, index) => {
        UI.add(dots, UI.component("carousel-dot", {
            index,
            label: `Slide ${index + 1}`,
            current: index === 0
        }));
    });

    UI.add(carousel, [controls, prevButton, viewport, nextButton, dots]);
    initCarouselBehavior(carousel);

    return carousel;
}
