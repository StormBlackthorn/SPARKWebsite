<script lang="ts">
    import { chapters } from '$lib/data/chapters';
    import { onMount } from 'svelte';

    let searchTerm = $state('');
    let isFilterOpen = $state(false);
    let selectedLocations = $state<string[]>([]);

    const availableLocations = [
        { label: 'United States', value: 'united states' },
        { label: 'Washington', value: 'washington' },
    ];

    function toggleLocation(value: string) {
        if (selectedLocations.includes(value)) {
            selectedLocations = selectedLocations.filter((v) => v !== value);
        } else {
            selectedLocations = [...selectedLocations, value];
        }
    }

    function toggleFilter(e: MouseEvent) {
        e.stopPropagation();
        isFilterOpen = !isFilterOpen;
    }

    onMount(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as HTMLElement | null;
            if (target && !target.closest('.filter-container')) {
                isFilterOpen = false;
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    const filteredChapters = $derived(
        chapters.filter((chapter) => {
            const term = searchTerm.toLowerCase().trim();
            const matchesSearch =
                !term ||
                chapter.school.toLowerCase().includes(term) ||
                chapter.country.toLowerCase().includes(term) ||
                chapter.region.toLowerCase().includes(term);

            const matchesLocation =
                selectedLocations.length === 0 ||
                selectedLocations.some(
                    (loc) =>
                        chapter.country.toLowerCase().includes(loc) ||
                        chapter.region.toLowerCase().includes(loc)
                );

            return matchesSearch && matchesLocation;
        })
    );
</script>

<div class="directory-section">
    <div class="search-bar">
        <div class="input-wrapper">
            <input
                type="search"
                placeholder="Search for a chapter..."
                aria-label="Search chapters by school name or location"
                bind:value={searchTerm}
            />
        </div>

        <div class="filter-container">
            <button
                type="button"
                class="filter-button"
                class:active={selectedLocations.length > 0 || isFilterOpen}
                onclick={toggleFilter}
                aria-label="Filter chapters by location"
                aria-expanded={isFilterOpen}
            >
                <img
                    src="/assets/icons/filter.png"
                    alt=""
                    class="filter-icon"
                />
                {#if selectedLocations.length > 0}
                    <span class="filter-badge">{selectedLocations.length}</span>
                {/if}
            </button>

            {#if isFilterOpen}
                <div
                    class="filter-popover"
                    role="dialog"
                    aria-label="Location filter options"
                >
                    <h3>Filter by Location</h3>
                    {#each availableLocations as loc}
                        <label class="filter-option">
                            <input
                                type="checkbox"
                                checked={selectedLocations.includes(loc.value)}
                                onchange={() => toggleLocation(loc.value)}
                            />
                            <span>{loc.label}</span>
                        </label>
                    {/each}

                    {#if selectedLocations.length > 0}
                        <button
                            type="button"
                            class="clear-btn"
                            onclick={() => (selectedLocations = [])}
                        >
                            Clear filters
                        </button>
                    {/if}
                </div>
            {/if}
        </div>
    </div>

    <div class="table-wrapper">
        <table class="directory-table" aria-label="SPARK chapter directory">
            <thead>
                <tr>
                    <th scope="col">School</th>
                    <th scope="col">Country</th>
                    <th scope="col">State / Region</th>
                </tr>
            </thead>
            <tbody>
                {#if filteredChapters.length === 0}
                    <tr>
                        <td colspan="3" class="empty-state">
                            No chapters match your search. Try clearing your
                            filters.
                        </td>
                    </tr>
                {:else}
                    {#each filteredChapters as item}
                        <tr class="directory-row">
                            <td>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="school-link"
                                >
                                    {item.school} ↗
                                </a>
                            </td>
                            <td>{item.country}</td>
                            <td>{item.region}</td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>
</div>

<style>
    .directory-section {
        margin-top: var(--space-xl);
    }

    .search-bar {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        margin-bottom: var(--space-xl);
    }

    .input-wrapper {
        flex: 1;
        max-width: 480px;
        position: relative;
    }

    .input-wrapper input {
        padding-left: 42px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%2364748d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: 14px center;
    }

    .filter-container {
        position: relative;
    }

    .filter-button {
        width: 44px;
        height: 44px;
        padding: 0;
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
        background: var(--color-surface);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        box-shadow: var(--shadow-xs);
        transition:
            background 150ms ease,
            border-color 150ms ease,
            transform 150ms ease;

        &:hover,
        &.active {
            background: var(--brand-tint);
            border-color: var(--brand);
        }
    }

    .filter-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }

    .filter-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background: var(--brand);
        color: #ffffff;
        font-size: 11px;
        font-weight: 700;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .filter-popover {
        position: absolute;
        right: 0;
        top: calc(100% + 8px);
        z-index: 100;
        width: 240px;
        padding: var(--space-md);
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border);
        box-shadow: var(--shadow-lg);
        animation: popIn 160ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes popIn {
        from {
            opacity: 0;
            transform: translateY(-6px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .filter-popover h3 {
        margin: 0 0 var(--space-sm) 0;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--text-tertiary);
        border-bottom: 1px solid var(--border-subtle);
        padding-bottom: var(--space-xs);
    }

    .filter-option {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: var(--space-xs);
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        text-transform: none;
        letter-spacing: 0;
        color: var(--text-primary);

        &:hover {
            color: var(--brand);
        }

        input {
            width: auto;
            margin: 0;
            cursor: pointer;
        }
    }

    .clear-btn {
        margin-top: var(--space-sm);
        padding: 6px 12px;
        font-size: 12px;
        width: 100%;
        background: var(--surface-subtle);
        color: var(--text-secondary);
        border: 1px solid var(--border-subtle);
        box-shadow: none;

        &:hover {
            background: var(--surface-muted);
            color: var(--text-primary);
        }
    }

    .table-wrapper {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-sm);
    }

    .directory-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 15px;

        th {
            background: var(--surface-subtle);
            padding: 14px 20px;
            font-weight: 700;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-tertiary);
            border-bottom: 1px solid var(--color-border);
        }

        td {
            padding: 16px 20px;
            border-bottom: 1px solid var(--border-subtle);
            color: var(--text-secondary);
        }

        tr:last-child td {
            border-bottom: none;
        }

        tbody tr {
            transition: background 120ms ease;

            &:hover {
                background: var(--surface-subtle);
            }
        }
    }

    .school-link {
        font-weight: 600;
        color: var(--brand);

        &:hover {
            color: var(--brand-hover);
            text-decoration: underline;
        }
    }

    .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--text-tertiary);
        font-style: italic;
    }

    @media (max-width: 640px) {
        .table-wrapper {
            overflow-x: auto;
        }

        .directory-table {
            min-width: 480px;
        }
    }
</style>
