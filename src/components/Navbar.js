class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .nav-bar {
          background-color: #ffcccb;
          padding: 10px;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          border-bottom: 4px solid black;
          z-index: 9999;
        }

        .logo {
          height: 50px;
          border-radius: 100px;
        }

        .nav-links {
          display: flex;
          gap: 10px;
          align-items: center;
          font-size: 24px;
        }

        .nav-links a {
          text-decoration: none;
          color: black;
          padding: 20px;
          transition: padding-top 0.3s ease;
        }

        .nav-links a:hover {
          font-style: italic;
          border-bottom: 2px solid black;
          padding-top: 15px;
        }

        .dropdown {
          position: relative;
        }

        .title {
          cursor: pointer;
          display: block;
          padding: 10px;
        }

        .title:hover {
          font-style: italic;
        }

        .title::after {
          content: ">";
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .dropdown:hover .title::after {
          transform: rotate(90deg);
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }

        .dropdown-content a {
          padding: 12px 16px;
          display: block;
        }

        .dropdown-content a:hover {
          background-color: #f1f1f1;
          border-bottom: none;
        }
      </style>

      <div class="nav-bar">
        <a href="home.html"><img src="../../styles/assets/sparkText.png" class="logo" alt="Logo"></a>
        <div class="nav-links">
          <div class="dropdown">
            <span class="title">About Us</span>
            <div class="dropdown-content">
              <a href="about/mission.html">Mission</a>
              <a href="about/members.html">Members</a>
              <a href="about/statistics.html">Statistics</a>
            </div>
          </div>
          <a href="./Xcratch/index.html">Xcratch</a>
          <a href="volunteer.html">Volunteer</a>
          <a href="contactUs.html">Contact Us</a>
        </div>
      </div>
    `;
  }
}

customElements.define('navbar-component', Navbar);
