<script lang="ts">
    import emailjs from '@emailjs/browser';
    import { onMount } from 'svelte';

    let email = $state('');
    let subject = $state('');
    let school = $state('General Inquiry (Not School Specific)');
    let message = $state('');

    let isSubmitting = $state(false);
    let statusMessage = $state<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const schoolOptions = [
        'General Inquiry (Not School Specific)',
        'Canyon Creek Elementary School',
        'Fernwood Elementary School',
    ];

    const receiverMap: Record<string, string> = {
        'General Inquiry (Not School Specific)': '2025238@apps.nsd.org',
        'Canyon Creek Elementary School': '2002159@apps.nsd.org',
        'Fernwood Elementary School': '2025238@apps.nsd.org',
    };

    onMount(() => {
        emailjs.init('NP8blE3RXh-9IC6Ux');
    });

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        isSubmitting = true;
        statusMessage = null;

        const receiver = receiverMap[school] || '2025238@apps.nsd.org';

        try {
            await emailjs.send('service_pqhebck', 'template_krpovpb', {
                sender: email,
                subject: subject,
                school: school,
                message: message,
                receiver: receiver,
                cc: '',
            });

            statusMessage = {
                type: 'success',
                text: 'Thank you! Your message has been sent successfully. We will reply as soon as possible.',
            };

            email = '';
            subject = '';
            message = '';
        } catch (error) {
            console.error('Email send failed:', error);
            statusMessage = {
                type: 'error',
                text: 'Failed to send your message. Please try again later or email us directly at 2025238@apps.nsd.org.',
            };
        } finally {
            isSubmitting = false;
        }
    }
</script>

<div class="contact-form-container">
    {#if statusMessage}
        <div
            class="status-banner"
            class:success={statusMessage.type === 'success'}
            class:error={statusMessage.type === 'error'}
            role="alert"
        >
            <p>{statusMessage.text}</p>
        </div>
    {/if}

    <form onsubmit={handleSubmit} class="contact-form">
        <div class="form-group">
            <label for="email">
                Email Address <span class="required">*</span>
            </label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="yourEmail@example.com"
                required
                autocomplete="email"
                bind:value={email}
            />
        </div>

        <div class="form-group">
            <label for="subject">
                Subject <span class="required">*</span>
            </label>
            <input
                type="text"
                id="subject"
                name="subject"
                placeholder="How can we help?"
                required
                bind:value={subject}
            />
        </div>

        <div class="form-group">
            <label for="school">
                School / Category <span class="required">*</span>
            </label>
            <select id="school" name="school" required bind:value={school}>
                {#each schoolOptions as opt}
                    <option value={opt}>{opt}</option>
                {/each}
            </select>
        </div>

        <div class="form-group">
            <label for="message">
                Message <span class="required">*</span>
            </label>
            <textarea
                id="message"
                name="message"
                rows="8"
                placeholder="Write your question, idea, or inquiry here..."
                required
                bind:value={message}></textarea>
        </div>

        <button type="submit" class="submit-button" disabled={isSubmitting}>
            {#if isSubmitting}
                <span class="spinner" aria-hidden="true"></span>
                Sending...
            {:else}
                Send Message →
            {/if}
        </button>
    </form>
</div>

<style>
    .contact-form-container {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        padding: var(--space-2xl);
        box-shadow: var(--shadow-sm);
        max-width: 680px;
    }

    .status-banner {
        padding: 14px 18px;
        border-radius: var(--radius-md);
        margin-bottom: var(--space-xl);
        font-size: 14px;
        font-weight: 500;

        p {
            margin: 0;
        }

        &.success {
            background: #ecfdf5;
            color: #065f46;
            border: 1px solid #a7f3d0;
        }

        &.error {
            background: #fef2f2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
    }

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .submit-button {
        margin-top: var(--space-sm);
        padding: 14px 28px;
        font-size: 15px;
        align-self: flex-start;
    }

    .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        display: inline-block;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 640px) {
        .contact-form-container {
            padding: var(--space-lg);
        }

        .submit-button {
            width: 100%;
        }
    }
</style>
