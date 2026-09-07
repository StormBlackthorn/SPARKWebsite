<script lang="ts">
    import { fade } from 'svelte/transition';

    let activeTab = $state(0);

    const tabs = [
        { title: 'Join an Existing Chapter', id: 'join' },
        { title: 'Start a New Chapter', id: 'start' },
        { title: 'Parents & Guardians', id: 'parents' },
    ];
</script>

<div class="volunteer-tabs-container">
    <div class="tabs-header" role="tablist" aria-label="Volunteer pathways">
        {#each tabs as tab, i}
            <button
                type="button"
                class="tab-btn"
                class:active={activeTab === i}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === i}
                aria-controls={`panel-${tab.id}`}
                onclick={() => (activeTab = i)}
            >
                {tab.title}
            </button>
        {/each}
    </div>

    <div class="tab-panel-wrapper">
        {#if activeTab === 0}
            <div
                class="tab-panel"
                id="panel-join"
                role="tabpanel"
                aria-labelledby="tab-join"
                transition:fade={{ duration: 180 }}
            >
                <div class="steps">
                    <div class="step">
                        <div class="step-num">1</div>
                        <div class="step-content">
                            <h3>Find the chapter you want to join</h3>
                            <p>
                                Visit the <a href="/aboutUs/chapters"
                                    >Chapters</a
                                > page to see the list of existing chapters. Find
                                a school location that works for your schedule with
                                subjects fitting your interest.
                            </p>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-num">2</div>
                        <div class="step-content">
                            <h3>Reach out</h3>
                            <p>
                                <a href="/contactUs">Contact us</a> expressing your
                                interest in joining the club team. Our leadership
                                will connect you with that chapter's lead mentor.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="finish-note">
                    <p>
                        And you are done! We will be in touch with you shortly.
                    </p>
                    <p class="disclaimer">
                        *You can only miss up to <strong>two</strong> sessions per
                        season unless there is an unforeseen circumstance. Please
                        notify your club leader ahead of time.
                    </p>
                </div>
            </div>
        {:else if activeTab === 1}
            <div
                class="tab-panel"
                id="panel-start"
                role="tabpanel"
                aria-labelledby="tab-start"
                transition:fade={{ duration: 180 }}
            >
                <div class="steps">
                    <div class="step">
                        <div class="step-num">1</div>
                        <div class="step-content">
                            <h3>Contact us</h3>
                            <p>
                                <a href="/contactUs">Contact us</a> and let us know
                                you want to start a chapter! We provide our curriculum,
                                lesson slide decks, and mentorship guidance to ensure
                                your launch is successful.
                            </p>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-num">2</div>
                        <div class="step-content">
                            <h3>Gather some friends</h3>
                            <p>
                                Find classmates who are passionate about STEM
                                and willing to co-lead. We recommend at least
                                4–5 founding student mentors.
                            </p>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-num">3</div>
                        <div class="step-content">
                            <h3>Come up with a plan</h3>
                            <p>
                                Decide on the grade levels, STEM themes (e.g.
                                Scratch coding, robotics, hands-on physics), and
                                schedule.
                            </p>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-num">4</div>
                        <div class="step-content">
                            <h3>Reach out to your local elementary school</h3>
                            <p>
                                Coordinate with the principal or PTA afterschool
                                coordinator. We will provide formal intro
                                templates and outreach kits.
                            </p>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-num">5</div>
                        <div class="step-content">
                            <h3>Start the club!</h3>
                            <p>
                                With school permissions in place, kick off your
                                afterschool club and begin inspiring the next
                                generation!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        {:else if activeTab === 2}
            <div
                class="tab-panel"
                id="panel-parents"
                role="tabpanel"
                aria-labelledby="tab-parents"
                transition:fade={{ duration: 180 }}
            >
                <div class="chaperone-info">
                    <h3>We are always in need of chaperones</h3>
                    <p>
                        We sometimes have to limit club capacity or cancel
                        sessions if there is not enough adult supervision. If
                        you are a parent or guardian interested in supporting
                        our student mentors, please consider volunteering as a
                        chaperone.
                    </p>

                    <div class="info-callout">
                        <p><strong>What is involved?</strong></p>
                        <p>
                            Chaperones typically help ensure safe arrival/pickup
                            and take attendance. During lessons, you are welcome
                            to observe, assist with materials, or simply be
                            present in the classroom.
                        </p>
                    </div>

                    <p class="disclaimer">
                        *Most public school districts require adult volunteers
                        to complete a volunteer application and background
                        check. Please check your district's volunteer
                        requirements.
                    </p>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .volunteer-tabs-container {
        width: 100%;
        margin: var(--space-lg) auto 0;
    }

    .tabs-header {
        display: flex;
        gap: 8px;
        border-bottom: 2px solid var(--border);
        padding-bottom: 2px;
        margin-bottom: var(--space-xl);
        overflow-x: auto;
    }

    .tab-btn {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        font-size: 15px;
        font-weight: 600;
        padding: 12px 20px;
        border-radius: var(--radius-md) var(--radius-md) 0 0;
        cursor: pointer;
        position: relative;
        white-space: nowrap;
        box-shadow: none;
        transition:
            color 150ms ease,
            background 150ms ease;

        &:hover {
            color: var(--brand);
            background: var(--brand-tint);
        }

        &.active {
            color: var(--brand);
            background: var(--color-surface);
            border: 1px solid var(--border);
            border-bottom: 2px solid var(--color-surface);
            margin-bottom: -4px;
            box-shadow: var(--shadow-xs);
        }
    }

    .tab-panel-wrapper {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        padding: var(--space-2xl);
        box-shadow: var(--shadow-sm);
    }

    .steps {
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
    }

    .step {
        display: flex;
        gap: var(--space-lg);
        align-items: flex-start;
    }

    .step-num {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: var(--brand-tint);
        color: var(--brand);
        font-weight: 800;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border: 1px solid var(--brand-muted);
    }

    .step-content {
        flex: 1;

        h3 {
            font-size: 1.15rem;
            margin: 0 0 6px 0;
            color: var(--text-primary);
        }

        p {
            margin: 0;
            color: var(--text-secondary);
            line-height: 1.65;
        }
    }

    .finish-note {
        margin-top: var(--space-xl);
        padding-top: var(--space-lg);
        border-top: 1px solid var(--border-subtle);
    }

    .chaperone-info {
        h3 {
            font-size: 1.35rem;
            color: var(--text-primary);
            margin-bottom: var(--space-md);
        }
    }

    .info-callout {
        background: var(--surface-subtle);
        border-left: 4px solid var(--brand);
        padding: var(--space-md) var(--space-lg);
        border-radius: var(--radius-md);
        margin: var(--space-lg) 0;

        p {
            margin-bottom: 6px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    .disclaimer {
        font-size: 0.875rem;
        color: var(--text-tertiary);
        font-style: italic;
        margin-top: var(--space-md);
    }

    @media (max-width: 640px) {
        .tab-panel-wrapper {
            padding: var(--space-lg);
        }

        .step {
            gap: var(--space-md);
        }
    }
</style>
