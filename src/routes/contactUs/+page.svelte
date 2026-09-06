<script lang="ts">
    import ContactForm from '$lib/components/ContactForm.svelte';
</script>

<svelte:head>
    <title>SPARK - Contact Us | Questions, Collaborations & Feedback</title>
    <meta
        name="description"
        content="Have questions about SPARK, starting a chapter, or volunteering? Contact our student leadership team."
    />
</svelte:head>

<div class="container contact-page">
    <div class="contact-layout">
        <div class="contact-info">
            <div class="kicker">Get In Touch</div>
            <h1 class="page-title">Contact Us</h1>
            <p class="lead-text">
                Want to start a new club, invite SPARK to your school, or
                volunteer? We’d love to hear from you!
            </p>

            <div class="direct-contacts">
                <div class="contact-card">
                    <h3>SPARK Leadership</h3>
                    <p>
                        General inquiries & club partnerships:<br />
                        <a href="mailto:2025238@apps.nsd.org" class="email-link"
                            >2025238@apps.nsd.org</a
                        >
                    </p>
                </div>

                <div class="contact-card">
                    <h3>Student Mentors</h3>
                    <p class="note">
                        We are high school students balancing schoolwork and
                        extracurricular activities. We do our best to reply
                        promptly—thank you for your patience!
                    </p>
                </div>
            </div>
        </div>

        <div class="contact-form-wrapper">
            <ContactForm />
        </div>
    </div>
</div>

<style>
    .contact-page {
        padding-top: var(--space-2xl);
        padding-bottom: var(--space-4xl);
    }

    .contact-layout {
        display: grid;
        grid-template-columns: 1fr 1.3fr;
        gap: var(--space-3xl);
        align-items: flex-start;
    }

    .kicker {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--brand);
        margin-bottom: var(--space-xs);
    }

    .page-title {
        font-size: clamp(2.4rem, 4vw, 3.2rem);
        margin-bottom: var(--space-sm);
        line-height: 1.15;
    }

    .lead-text {
        font-size: 1.125rem;
        line-height: 1.7;
        color: var(--text-secondary);
        margin-bottom: var(--space-2xl);
    }

    .direct-contacts {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
    }

    .contact-card {
        background: var(--surface-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--space-lg);

        h3 {
            font-size: 1.1rem;
            margin-bottom: 6px;
        }

        p {
            margin: 0;
            font-size: 0.9375rem;
            line-height: 1.6;
        }

        .note {
            font-size: 0.875rem;
            color: var(--text-tertiary);
        }
    }

    .email-link {
        font-weight: 600;
        color: var(--brand);

        &:hover {
            text-decoration: underline;
        }
    }

    @media (max-width: 860px) {
        .contact-layout {
            grid-template-columns: 1fr;
        }
    }
</style>
