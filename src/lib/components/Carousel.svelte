<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    interface Slide {
        src: string;
        alt: string;
    }

    const slides: Slide[] = [
        {
            src: '/assets/classroom_images/1.png',
            alt: 'SPARK club activity with elementary students',
        },
        {
            src: '/assets/classroom_images/2.png',
            alt: 'Students learning hands-on STEM and coding',
        },
        {
            src: '/assets/classroom_images/3.png',
            alt: 'Dedicated high school volunteer teaching session',
        },
    ];

    const duration = 7500;

    let currentIndex = $state(0);
    let isPaused = $state(false);
    let progress = $state(0);

    let startTime: number | null = null;
    let pausedTime = 0;
    let animId: number | null = null;

    function animate(timestamp: number) {
        if (!startTime) startTime = timestamp - pausedTime;
        if (isPaused) return;

        const elapsed = timestamp - startTime;
        progress = Math.min(elapsed / duration, 1);

        if (progress >= 1) {
            nextSlide();
            startTime = timestamp;
            progress = 0;
        }

        animId = requestAnimationFrame(animate);
    }

    function resetTimer() {
        startTime = null;
        pausedTime = 0;
        progress = 0;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        resetTimer();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        resetTimer();
    }

    function goToSlide(index: number) {
        currentIndex = index;
        resetTimer();
    }

    function togglePause() {
        isPaused = !isPaused;
        if (isPaused) {
            if (startTime !== null) {
                pausedTime = performance.now() - startTime;
            }
            if (animId) cancelAnimationFrame(animId);
        } else {
            startTime = performance.now() - pausedTime;
            animId = requestAnimationFrame(animate);
        }
    }

    onMount(() => {
        animId = requestAnimationFrame(animate);
        return () => {
            if (animId) cancelAnimationFrame(animId);
        };
    });

    // Calculate stroke dashoffset for the SVG progress circle (radius = 22, circumference = ~138.2)
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = $derived(circumference - progress * circumference);
</script>

<div
    class="carousel"
    role="region"
    aria-label="Photo carousel"
    aria-roledescription="carousel"
>
    <div class="carousel-controls">
        <button
            type="button"
            class="pause-button"
            onclick={togglePause}
            aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
        >
            <svg
                width="44"
                height="44"
                viewBox="0 0 52 52"
                class="circular-progress"
                aria-hidden="true"
            >
                <circle class="bg" cx="26" cy="26" r={radius}></circle>
                <circle
                    class="fg"
                    cx="26"
                    cy="26"
                    r={radius}
                    style:stroke-dasharray={circumference}
                    style:stroke-dashoffset={strokeDashoffset}
                ></circle>
            </svg>
            <img
                src={isPaused ? '/assets/play.svg' : '/assets/pause.svg'}
                alt=""
                class="pause-icon"
            />
        </button>
    </div>

    <button
        type="button"
        class="arrows prev"
        aria-label="Previous slide"
        onclick={prevSlide}
    >
        ‹
    </button>

    <div class="slides-container">
        {#each slides as slide, i}
            {#if i === currentIndex}
                <div class="slide" transition:fade={{ duration: 300 }}>
                    <img src={slide.src} alt={slide.alt} />
                </div>
            {/if}
        {/each}
    </div>

    <button
        type="button"
        class="arrows next"
        aria-label="Next slide"
        onclick={nextSlide}
    >
        ›
    </button>

    <div class="dots" role="tablist" aria-label="Carousel slide dots">
        {#each slides as _, i}
            <button
                type="button"
                class="dot"
                class:current={i === currentIndex}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Slide ${i + 1}`}
                onclick={() => goToSlide(i)}
            ></button>
        {/each}
    </div>
</div>

<style>
    .carousel {
        position: relative;
        border-radius: var(--radius-xl);
        overflow: hidden;
        border: 1px solid var(--color-border);
        box-shadow: var(--shadow-lg);
        user-select: none;
        min-height: 380px;
        height: 100%;
        background: #0f172a;
    }

    .slides-container {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 380px;
    }

    .slide {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .carousel-controls {
        position: absolute;
        top: var(--space-md);
        left: var(--space-md);
        z-index: 10;
    }

    .pause-button {
        background: rgba(0, 0, 0, 0.45);
        backdrop-filter: blur(8px);
        border: none;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        padding: 0;
        transition:
            background 150ms ease,
            transform 150ms ease;

        &:hover {
            background: rgba(0, 0, 0, 0.65);
            transform: scale(1.05);
        }
    }

    .circular-progress {
        transform: rotate(-90deg);
        position: absolute;
        top: 0;
        left: 0;
    }

    .circular-progress circle {
        fill: none;
        stroke-width: 3.5;
    }

    .circular-progress .bg {
        stroke: rgba(255, 255, 255, 0.25);
    }

    .circular-progress .fg {
        stroke: #ffffff;
        stroke-linecap: round;
        transition: stroke-dashoffset 60ms linear;
    }

    .pause-icon {
        width: 18px;
        height: 18px;
        position: relative;
        z-index: 2;
        filter: brightness(0) invert(1);
    }

    .arrows {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(6px);
        color: #ffffff;
        border: none;
        font-size: 28px;
        line-height: 1;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition:
            background 150ms ease,
            transform 150ms ease;

        &:hover {
            background: rgba(0, 0, 0, 0.65);
            transform: translateY(-50%) scale(1.1);
        }

        &.prev {
            left: var(--space-md);
        }

        &.next {
            right: var(--space-md);
        }
    }

    .dots {
        position: absolute;
        bottom: var(--space-md);
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        z-index: 10;
        background: rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(6px);
        padding: 6px 12px;
        border-radius: var(--radius-full);
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.45);
        border: none;
        padding: 0;
        cursor: pointer;
        transition:
            background 200ms ease,
            transform 200ms ease;

        &:hover {
            background: rgba(255, 255, 255, 0.8);
        }

        &.current {
            background: #ffffff;
            transform: scale(1.25);
        }
    }

    @media (max-width: 768px) {
        .carousel,
        .slides-container {
            min-height: 280px;
        }

        .arrows {
            width: 36px;
            height: 36px;
            font-size: 22px;
        }
    }
</style>
