class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }

        #nav-bar {
          background: rgba(242, 239, 233, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0 24px;
          height: 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          border-bottom: 1px solid var(--color-border);
          z-index: 9999;
        }

        #logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        #logo {
          height: 36px;
          display: block;
        }

        #nav-links {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        #nav-links a,
        .dropdown-title {
          color: var(--color-text-secondary);
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.9375rem;
          transition: color 150ms ease, background 150ms ease;
          border: none;
          background: none;
          cursor: pointer;
          font-family: inherit;
        }

        #nav-links a:hover,
        .dropdown-title:hover,
        #nav-links a.active {
          color: var(--color-text);
          background: var(--color-bg-subtle);
        }

        .dropdown {
          position: relative;
        }

        .dropdown-title {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dropdown .arrow {
          font-size: 0.75rem;
          transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
          color: var(--color-text-tertiary);
        }

        .dropdown:hover .arrow,
        .dropdown.open .arrow {
          transform: rotate(90deg);
        }

        .dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 6px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          min-width: 200px;
          box-shadow: var(--shadow-sm);
          padding: 6px;
        }

        .dropdown::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          height: 10px;
        }

        .dropdown-content a {
          display: block;
          padding: 10px 14px;
          color: var(--color-text-secondary);
          border-radius: 8px;
          font-size: 0.9375rem;
        }

        .dropdown-content a:hover {
          background: var(--color-bg-subtle);
          color: var(--color-primary);
        }

        .dropdown:hover .dropdown-content,
        .dropdown.open .dropdown-content {
          display: block;
          animation: dropIn 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-cta {
          background: var(--color-primary) !important;
          color: #fff !important;
          margin-left: 8px;
        }

        .nav-cta:hover {
          background: var(--color-primary-hover) !important;
          color: #fff !important;
        }

        #menu-toggle {
          display: none;
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          border-radius: 8px;
        }

        #menu-toggle:hover {
          background: var(--color-bg-subtle);
        }

        #menu-toggle span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--color-text);
          margin: 4px 0;
          border-radius: 1px;
          transition: transform 200ms ease, opacity 200ms ease;
        }

        @media (max-width: 768px) {
          #menu-toggle { display: block; }

          #nav-links {
            display: none;
            position: absolute;
            top: 64px;
            left: 0;
            right: 0;
            flex-direction: column;
            align-items: stretch;
            background: rgba(242, 239, 233, 0.98);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--color-border);
            padding: 12px 16px 20px;
            gap: 2px;
            box-shadow: var(--shadow-sm);
          }

          #nav-links.open { display: flex; }

          #nav-links a,
          .dropdown-title {
            padding: 12px 14px;
          }

          .dropdown-content {
            position: static;
            box-shadow: none;
            border: none;
            padding: 0 0 0 12px;
            background: transparent;
          }

          .dropdown:hover .dropdown-content {
            animation: none;
          }

          .nav-cta { margin-left: 0; margin-top: 8px; text-align: center; }
        }
      </style>

      <nav id="nav-bar" aria-label="Main navigation">
        <a href="pages/index.html" id="logo-link">
          <img src="styles/assets/sparkTextLogo.png" id="logo" alt="SPARK STEM">
        </a>

        <button id="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div id="nav-links">
          <div class="dropdown">
            <button class="dropdown-title" aria-haspopup="true" aria-expanded="false">
              About Us <span class="arrow" aria-hidden="true">›</span>
            </button>
            <div class="dropdown-content" role="menu">
              <a href="pages/about/mission.html" role="menuitem">Mission</a>
              <a href="pages/about/chapters.html" role="menuitem">Chapters</a>
              <a href="pages/about/members.html" role="menuitem">Members</a>
              <a href="pages/about/statistics.html" role="menuitem">Statistics</a>
            </div>
          </div>
          <a href="pages/Xcratch/index.html">Xcratch</a>
          <a href="pages/volunteer.html">Volunteer</a>
          <a href="pages/contactUs.html" class="nav-cta">Contact Us</a>
        </div>
      </nav>
    `;

    const toggle = this.shadowRoot.getElementById('menu-toggle');
    const navLinks = this.shadowRoot.getElementById('nav-links');
    const dropdown = this.shadowRoot.querySelector('.dropdown');
    const dropdownBtn = this.shadowRoot.querySelector('.dropdown-title');

    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    dropdownBtn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('open');
        dropdownBtn.setAttribute('aria-expanded', dropdown.classList.contains('open'));
      }
    });

    document.addEventListener('click', (e) => {
      if (!this.shadowRoot.contains(e.target)) {
        navLinks.classList.remove('open');
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

customElements.define('navbar-component', Navbar);
