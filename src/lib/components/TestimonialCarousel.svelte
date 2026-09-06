<script lang="ts">
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { testimonials } from '$lib/data/testimonials';

    let currentIndex = $state(0);
    let direction = $state(1);

    function changeTo(index: number, movement = index > currentIndex ? 1 : -1) {
        direction = movement;
        currentIndex = (index + testimonials.length) % testimonials.length;
    }

    function quoteTransition(node: Element, { entering }: { entering: boolean }) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        return fly(node, {
            x: reducedMotion ? 0 : (entering ? direction : -direction) * 20,
            duration: reducedMotion ? 0 : entering ? 320 : 140,
            delay: reducedMotion || !entering ? 0 : 100,
            easing: cubicOut,
        });
    }

    const positions = [-1, 0, 1];
    const visibleTestimonials = $derived(
        positions.map((position) => ({
            position,
            item: testimonials[
                (currentIndex + position + testimonials.length) % testimonials.length
            ],
        })),
    );

    function next() {
        changeTo(currentIndex + 1, 1);
    }

    function prev() {
        changeTo(currentIndex - 1, -1);
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

    <div class="testimonial-card-container" aria-live="polite" aria-atomic="true">
        {#each visibleTestimonials as { item, position } (position)}
            <div
                class="testimonial-card"
                class:featured={position === 0}
                class:side-card={position !== 0}
                aria-hidden={position !== 0 ? true : undefined}
            >
                {#key item.id}
                    <div class="card-content"
                        in:quoteTransition={{ entering: true }}
                        out:quoteTransition={{ entering: false }}
                    >
                    <div class="quote-mark" aria-hidden="true">“</div>
                    <!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users need to focus this scrollable quote.) -->
                    <blockquote class="quote" tabindex={position === 0 ? 0 : -1}>
                        <p>{item.quote}</p>
                    </blockquote>
                    <div class="author-info">
                        <cite class="author">{item.author}</cite>
                        {#if item.role}
                            <span class="role">{item.role}</span>
                        {/if}
                    </div>
                    </div>
                {/key}
            </div>
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
            aria-current={i === currentIndex ? 'true' : undefined}
            onclick={() => changeTo(i)}
        ></button>
    {/each}
</div>

<style>
    .testimonials-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-md);
        max-width: 100%;
        margin: 0 auto;
        position: relative;
    }

    .testimonial-card-container {
        flex: 1;
        min-width: 0;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.8fr) minmax(0, 1fr);
        gap: clamp(10px, 1.5vw, 18px);
        align-items: center;
    }

    .testimonial-card {
        min-width: 0;
        height: 280px;
        box-sizing: border-box;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        padding: var(--space-lg);
        box-shadow: var(--shadow-sm);
        display: grid;
        grid-template-rows: minmax(0, 1fr);
        text-align: center;
        overflow: clip;
    }

    .testimonial-card.featured {
        height: 350px;
        padding: var(--space-lg);
        border-color: var(--brand-muted);
    }

    .card-content {
        grid-area: 1 / 1;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .side-card .quote p {
        font-size: 0.9375rem;
    }

    .side-card .author-info {
        font-size: 0.8125rem;
    }

    .quote-mark {
        font-size: 3rem;
        line-height: 1;
        color: var(--brand-muted);
        font-family: Georgia, serif;
        height: 32px;
        margin-bottom: 0;
        flex-shrink: 0;
        user-select: none;
    }

    .quote {
        margin: 0;
        flex: 1 1 0;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-gutter: stable both-edges;
        scroll-padding-block: 8px;
        overscroll-behavior: contain;
        scrollbar-width: thin;
        scrollbar-color: color-mix(in srgb, var(--text-primary) 16%, transparent) transparent;
        /* Local covers move with the text, revealing shadows only where
           more content remains above or below the visible quote. */
        background:
            linear-gradient(var(--color-surface) 35%, transparent) center top / 100% 28px local,
            linear-gradient(transparent, var(--color-surface) 65%) center bottom / 100% 28px local,
            radial-gradient(farthest-side at 50% 0, color-mix(in srgb, var(--text-primary) 8%, transparent), transparent) center top / 100% 8px scroll,
            radial-gradient(farthest-side at 50% 100%, color-mix(in srgb, var(--text-primary) 8%, transparent), transparent) center bottom / 100% 8px scroll;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        padding: 8px 10px;
    }

    .quote:hover,
    .quote:focus-visible {
        scrollbar-color: color-mix(in srgb, var(--text-primary) 28%, transparent) transparent;
    }

    .quote::-webkit-scrollbar {
        width: 4px;
    }

    .quote::-webkit-scrollbar-track {
        background: transparent;
    }

    .quote::-webkit-scrollbar-thumb {
        background: color-mix(in srgb, var(--text-primary) 16%, transparent);
        border-radius: 999px;
    }

    .quote:hover::-webkit-scrollbar-thumb {
        background: color-mix(in srgb, var(--text-primary) 28%, transparent);
    }

    .quote p {
        flex-shrink: 0;
        font-size: clamp(1.05rem, 2vw, 1.2rem);
        font-style: italic;
        color: var(--text-primary);
        line-height: 1.6;
        margin: auto 0;
        padding: 2px 0;
        overflow-wrap: anywhere;
    }

    .author-info {
        font-size: 0.9375rem;
        color: var(--text-tertiary);
        flex-shrink: 0;
        margin-top: 0;
    }

    .author {
        font-style: normal;
        font-weight: 700;
        color: var(--brand);
    }

    .role {
        color: var(--text-secondary);
        display: block;
        margin-top: 4px;
    }

    .arrow-btn {
        background: transparent;
        border: 1px solid transparent;
        color: var(--text-primary);
        width: 44px;
        height: 44px;
        border-radius: 50%;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

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
        margin-top: var(--space-md);
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

    .arrow-btn:focus-visible,
    .dot:focus-visible,
    .quote:focus-visible {
        outline: 2px solid var(--brand);
        outline-offset: 4px;
    }

    @media (max-width: 768px) {
        .testimonials-wrapper {
            gap: var(--space-xs);
        }

        .testimonial-card-container {
            gap: 12px;
            grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr);
        }

        .testimonial-card {
            padding: var(--space-sm);
        }

        .testimonial-card.featured {
            padding: var(--space-lg);
            height: 380px;
        }

        .arrow-btn {
            width: 36px;
            height: 44px;
        }
    }

    @media (max-width: 700px) {
        .testimonial-card-container {
            grid-template-columns: minmax(0, 1fr);
        }

        .side-card {
            display: none;
        }

        .testimonial-card.featured {
            padding: var(--space-lg);
        }
    }
    @media (prefers-reduced-motion: reduce) {
        .arrow-btn,
        .dot {
            transition: none;
        }
    }
</style>
