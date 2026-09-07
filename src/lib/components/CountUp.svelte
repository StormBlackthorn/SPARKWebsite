<script lang="ts">
    import { onMount } from 'svelte';

    interface Props {
        end: number;
        format?: '$' | 'decimal' | 'number';
        prefix?: string;
        suffix?: string;
        duration?: number;
    }

    let {
        end,
        format = 'number',
        prefix = '',
        suffix = '',
        duration = 1200,
    }: Props = $props();

    let element: HTMLElement | null = $state(null);
    let currentVal = $state(0);
    let hasAnimated = false;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    function startAnimation() {
        if (hasAnimated) return;
        hasAnimated = true;

        let startTs: number | null = null;

        function step(ts: number) {
            if (!startTs) startTs = ts;
            const progress = Math.min((ts - startTs) / duration, 1);
            const eased = easeOutCubic(progress);
            currentVal = end * eased;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                currentVal = end;
            }
        }

        requestAnimationFrame(step);
    }

    onMount(() => {
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        startAnimation();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    });

    const formattedValue = $derived(() => {
        if (format === '$' || prefix === '$') {
            return '$' + Math.floor(currentVal).toLocaleString();
        }
        if (format === 'decimal') {
            return currentVal.toFixed(1);
        }
        return Math.floor(currentVal).toLocaleString();
    });
</script>

<span bind:this={element} class="count-up">
    {prefix !== '$' ? prefix : ''}{formattedValue()}{suffix}
</span>

<style>
    .count-up {
        display: inline-block;
        font-variant-numeric: tabular-nums;
    }
</style>
