<script lang="ts">
    import type { StatItem } from '$lib/types';
    import CountUp from '$lib/components/CountUp.svelte';

    interface Props {
        stat: StatItem;
    }

    let { stat }: Props = $props();
</script>

<div class="stat-card">
    <div class="icon-wrapper">
        <img src={stat.icon} alt="" loading="lazy" class="icon" />
    </div>
    <h3 class="stat-value">
        <CountUp
            end={stat.value}
            format={stat.format}
            prefix={stat.prefix}
            suffix={stat.suffix}
        />
    </h3>
    <p class="stat-label">{stat.label}</p>
</div>

<style>
    .stat-card {
        background: var(--color-surface);
        padding: var(--space-xl) var(--space-lg);
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border);
        box-shadow: var(--shadow-sm);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition:
            transform 200ms ease,
            box-shadow 200ms ease,
            border-color 200ms ease;

        &:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-md);
            border-color: var(--color-primary-muted);
        }
    }

    .icon-wrapper {
        width: 64px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--space-md);
    }

    .icon {
        max-width: 56px;
        max-height: 56px;
        object-fit: contain;
    }

    .stat-value {
        font-size: clamp(2rem, 3.5vw, 2.5rem);
        font-weight: 800;
        letter-spacing: -0.03em;
        color: var(--brand);
        margin: 0 0 6px 0;
        line-height: 1.1;
    }

    .stat-label {
        font-size: 0.9375rem;
        font-weight: 600;
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.4;
    }
</style>
