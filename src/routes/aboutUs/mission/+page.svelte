<svelte:head>
    <title>SPARK - Mission | About Our Student-Led Organization</title>
    <meta
        name="description"
        content="Learn about SPARK's mission, values, and student-led approach to making STEM education accessible to every child."
    />
</svelte:head>

<div class="container mission-page">
    <!-- Cover Banner -->
    <section class="mission-cover" aria-label="About SPARK cover">
        <div class="cover-image-wrapper">
            <img
                src="/assets/classroom_images/1.png"
                alt="Elementary students working collaboratively on a STEM activity"
            />
            <div class="cover-overlay"></div>
        </div>
        <div class="cover-content">
            <span class="hero-kicker">About SPARK</span>
            <h1 class="page-title">About Us</h1>
            <p class="page-lead">
                We are a student-run volunteering organization dedicated to
                providing hands-on STEM education in local elementary schools
                through afterschool clubs, interactive projects, and high school
                mentorship.
            </p>
        </div>
    </section>

    <!-- Mission Split Cards -->
    <section class="split-section" aria-label="Our Mission">
        <div class="content-card">
            <span class="card-kicker">Purpose & Vision</span>
            <h2>Our Mission</h2>
            <p>
                SPARK introduces STEM through fun, engaging lessons and hands-on
                projects. We want every student to see themselves as an
                imaginative creator—not merely a consumer of technology.
            </p>
            <p>
                Our high school volunteers tailor lessons to each classroom so
                every kid can build, experiment, and ask questions with genuine
                confidence and enthusiasm.
            </p>
            <div class="card-action">
                <a href="/aboutUs/statistics" class="btn btn-lg"
                    >Explore Our Statistics →</a
                >
            </div>
        </div>
        <div class="media-card">
            <img
                src="/assets/classroom_images/2.png"
                alt="Elementary students engaged in a coding challenge"
                loading="lazy"
            />
        </div>
    </section>

    <section class="split-section reverse" aria-label="Student Led">
        <div class="content-card">
            <span class="card-kicker">Grassroots Leadership</span>
            <h2>Fully Ran by Students</h2>
            <p>
                We design curriculums, organize clubs, and mentor students
                ourselves. Every session is built by high school volunteers who
                care deeply about educational equity and opportunity.
            </p>
            <p>
                Students plan activities, iterate on technical lessons, and
                continually improve each session so elementary kids stay
                thrilled to explore science and computer programming.
            </p>
            <div class="card-action">
                <a href="/aboutUs/chapters" class="btn btn-secondary btn-lg"
                    >View Our Chapters →</a
                >
            </div>
        </div>
        <div class="media-card">
            <img
                src="/assets/classroom_images/3.png"
                alt="High school volunteer mentor working with small student group"
                loading="lazy"
            />
        </div>
    </section>
</div>

<style>
    .mission-page {
        padding-top: var(--space-2xl);
        padding-bottom: var(--space-4xl);
    }

    /* Cover */
    .mission-cover {
        position: relative;
        border-radius: var(--radius-xl);
        overflow: hidden;
        margin-bottom: var(--space-3xl);
        border: 1px solid var(--color-border);
        box-shadow: var(--shadow-md);
        min-height: 380px;
        display: flex;
        align-items: flex-end;
    }

    .cover-image-wrapper {
        position: absolute;
        inset: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .cover-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            180deg,
            rgba(15, 23, 42, 0.2) 0%,
            rgba(15, 23, 42, 0.85) 100%
        );
    }

    .cover-content {
        position: relative;
        z-index: 2;
        padding: var(--space-2xl);
        color: #ffffff;
        max-width: 720px;
    }

    .hero-kicker {
        display: inline-block;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #6ee7b7;
        margin-bottom: var(--space-xs);
    }

    .page-title {
        font-size: clamp(2.4rem, 4.5vw, 3.5rem);
        color: #ffffff;
        margin-bottom: var(--space-sm);
        line-height: 1.1;
    }

    .page-lead {
        font-size: 1.125rem;
        line-height: 1.7;
        color: #e2e8f0;
        margin: 0;
    }

    /* Split Sections */
    .split-section {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: var(--space-2xl);
        align-items: center;
        margin-bottom: var(--space-3xl);

        &.reverse {
            grid-template-columns: 1fr 1.2fr;

            .content-card {
                order: 2;
            }
            .media-card {
                order: 1;
            }
        }
    }

    .content-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        padding: var(--space-2xl);
        box-shadow: var(--shadow-sm);

        h2 {
            font-size: clamp(1.6rem, 2.8vw, 2.1rem);
            margin-bottom: var(--space-md);
        }

        p {
            font-size: 1.05rem;
            line-height: 1.7;
            margin-bottom: var(--space-md);
        }
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

    .card-action {
        margin-top: var(--space-xl);
    }

    .media-card {
        border-radius: var(--radius-xl);
        overflow: hidden;
        border: 1px solid var(--color-border);
        box-shadow: var(--shadow-md);
        height: 100%;
        min-height: 320px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    @media (max-width: 840px) {
        .split-section,
        .split-section.reverse {
            grid-template-columns: 1fr;

            .content-card {
                order: 1;
            }
            .media-card {
                order: 2;
                min-height: 260px;
            }
        }

        .cover-content {
            padding: var(--space-lg);
        }
    }
</style>
