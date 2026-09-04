<script lang="ts">
    import { testimonials } from '$lib/data/testimonials';
    import { fade } from 'svelte/transition';

    let currentIndex = $state(0);

    function next() {
        currentIndex = (currentIndex + 1) % testimonials.length;
    }

    function prev() {
        currentIndex =
            (currentIndex - 1 + testimonials.length) % testimonials.length;
    }
</script>

<div class="testimonials-wrapper">
    <button
        type="button"
        class="arrow-btn prev"
        aria-label="Previous testimonial"
        onclick={prev}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
            <polyline points="15 18 9 12 15 6" />
        </svg>
    </button>

    <div class="testimonial-card-container">
        {#each testimonials as item, i}
            {#if i === currentIndex}
                <div
                    class="testimonial-card"
                    transition:fade={{ duration: 250 }}
                >
                    <div class="quote-mark" aria-hidden="true">“</div>
                    <blockquote class="quote">
                        <p>{item.quote}</p>
                    </blockquote>
                    <div class="author-info">
                        <cite class="author">{item.author}</cite>
                        {#if item.role}
                            <span class="role">· {item.role}</span>
                        {/if}
                    </div>
                </div>
            {/if}
        {/each}
    </div>

    <button
        type="button"
        class="arrow-btn next"
        aria-label="Next testimonial"
        onclick={next}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
            <polyline points="9 18 15 12 9 6" />
        </svg>
    </button>
</div>

<div class="pagination-dots">
    {#each testimonials as _, i}
        <button
            type="button"
            class="dot"
            class:active={i === currentIndex}
            aria-label={`Go to testimonial ${i + 1}`}
            onclick={() => (currentIndex = i)}
        ></button>
    {/each}
</div>

<style>
    .testimonials-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-md);
        max-width: 820px;
        margin: 0 auto;
        position: relative;
    }

    .testimonial-card-container {
        flex: 1;
        position: relative;
        min-height: 220px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .testimonial-card {
        position: absolute;
        inset: 0;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        padding: var(--space-xl) var(--space-2xl);
        box-shadow: var(--shadow-sm);
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .quote-mark {
        font-size: 3rem;
        line-height: 1;
        color: var(--brand-muted);
        font-family: Georgia, serif;
        margin-bottom: -10px;
    }

    .quote p {
        font-size: clamp(1.05rem, 2vw, 1.2rem);
        font-style: italic;
        color: var(--text-primary);
        line-height: 1.65;
        margin: 0 0 var(--space-md) 0;
    }

    .author-info {
        font-size: 0.9375rem;
        color: var(--text-tertiary);
    }

    .author {
        font-style: normal;
        font-weight: 700;
        color: var(--brand);
    }

    .role {
        color: var(--text-secondary);
        margin-left: 4px;
    }

    .arrow-btn {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        color: var(--text-primary);
        width: 44px;
        height: 44px;
        border-radius: 50%;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: var(--shadow-xs);
        transition:
            background 150ms ease,
            transform 150ms ease,
            border-color 150ms ease;
        flex-shrink: 0;
        z-index: 2;

        svg {
            width: 22px;
            height: 22px;
            display: block;
        }

        &:hover {
            background: var(--brand-tint);
            color: var(--brand);
            border-color: var(--brand);
            transform: scale(1.08);
        }
    }

    .pagination-dots {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: var(--space-lg);
    }

    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--surface-muted);
        border: none;
        padding: 0;
        cursor: pointer;
        transition:
            background 200ms ease,
            transform 200ms ease,
            width 200ms ease;

        &.active {
            background: var(--brand);
            width: 22px;
            border-radius: 4px;
        }
    }

    @media (max-width: 768px) {
        .testimonial-card {
            padding: var(--space-lg);
        }

        .testimonial-card-container {
            min-height: 280px;
        }

        .arrow-btn {
            width: 36px;
            height: 36px;

            svg {
                width: 18px;
                height: 18px;
            }
        }
    }
</style>
