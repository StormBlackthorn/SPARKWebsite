<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        imageSrc?: string;
        imageAlt?: string;
        imageLoading?: 'lazy' | 'eager';
        reverse?: boolean;
        kicker?: string;
        title?: string;
        actionHref?: string;
        actionText?: string;
        actionVariant?: 'primary' | 'secondary';
        class?: string;
        ariaLabel?: string;
        children?: Snippet;
        actions?: Snippet;
        media?: Snippet;
    }

    let {
        imageSrc = '',
        imageAlt = '',
        imageLoading = 'lazy',
        reverse = false,
        kicker = '',
        title = '',
        actionHref = '',
        actionText = '',
        actionVariant = 'primary',
        class: className = '',
        ariaLabel = '',
        children,
        actions,
        media,
    }: Props = $props();
</script>

<section
    class="split-card {className}"
    class:reverse
    aria-label={ariaLabel || title || undefined}
>
    <div class="card-content">
        {#if kicker}
            <span class="card-kicker">{kicker}</span>
        {/if}
        {#if title}
            <h2 class="card-title">{title}</h2>
        {/if}
        {#if children}
            <div class="card-body">
                {@render children()}
            </div>
        {/if}
        {#if actions}
            <div class="card-action">
                {@render actions()}
            </div>
        {:else if actionHref && actionText}
            <div class="card-action">
                <a
                    href={actionHref}
                    class="btn {actionVariant === 'secondary' ? 'btn-secondary' : ''} btn-lg"
                >
                    {actionText}
                </a>
            </div>
        {/if}
    </div>

    <div class="card-media">
        {#if media}
            {@render media()}
        {:else if imageSrc}
            <img
                src={imageSrc}
                alt={imageAlt}
                loading={imageLoading}
            />
        {/if}
    </div>
</section>

<style>
    .split-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-sm);
        overflow: hidden;
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        align-items: stretch;
        margin-bottom: var(--space-3xl);
        transition:
            box-shadow var(--duration-normal) var(--ease-out),
            border-color var(--duration-normal) var(--ease-out);

        &:hover {
            box-shadow: var(--shadow-md);
            border-color: var(--color-border-subtle);
        }

        &.reverse {
            grid-template-columns: 1fr 1.2fr;

            .card-content {
                order: 2;
            }
            .card-media {
                order: 1;
                border-left: none;
                border-right: 1px solid var(--color-border-subtle);
            }
        }
    }

    .card-content {
        padding: clamp(var(--space-xl), 4vw, var(--space-2xl));
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .card-kicker {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--brand);
        display: block;
        margin-bottom: var(--space-xs);
    }

    .card-title {
        font-size: clamp(1.6rem, 2.8vw, 2.1rem);
        color: var(--color-text);
        margin: 0 0 var(--space-md) 0;
        line-height: 1.2;
    }

    .card-body {
        :global(p) {
            font-size: 1.05rem;
            line-height: 1.7;
            margin-bottom: var(--space-md);
            color: var(--color-text-secondary);
        }

        :global(p:last-child) {
            margin-bottom: 0;
        }
    }

    .card-action {
        margin-top: var(--space-xl);
    }

    .card-media {
        position: relative;
        overflow: hidden;
        border-left: 1px solid var(--color-border-subtle);
        display: flex;
        height: 100%;
        min-height: 340px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    }

    @media (max-width: 840px) {
        .split-card,
        .split-card.reverse {
            grid-template-columns: 1fr;

            .card-content {
                order: 1;
                padding: var(--space-xl) var(--space-lg);
            }

            .card-media {
                order: 2;
                border-left: none;
                border-right: none;
                border-top: 1px solid var(--color-border-subtle);
                min-height: 260px;
                max-height: 380px;
            }
        }
    }
</style>
