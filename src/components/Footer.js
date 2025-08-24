class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
      footer {
        background-color: #f4a460;
        border-top: 4px solid black;
        padding: 40px 20px;
        color: #222;
        font-family: Arial, sans-serif;
      }
      
      .icon {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-right: 5px;
      }

  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;

    h3 {
      margin-bottom: 12px;
      font-size: 1.2rem;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 8px;

        a {
          color: #222;
          text-decoration: none;
          transition: color 0.2s ease;

          &:hover {
            color: #000;
            text-decoration: underline;
          }
        }
      }
    }

    > div {
      flex: 1;
      min-width: 200px;
      margin: 10px 0;
    }
  }

  .footer-bottom {
    text-align: center;
    margin-top: 30px;
    font-size: 0.9rem;
    color: #333;
  }

  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      text-align: center;

      > div {
        margin-bottom: 20px;
      }
    }
  }
}

  </style>

  <footer>
    <div class="footer-container">
          <!-- Quick Links -->
          <div>
              <h3>Quick Links</h3>
              <ul>
                  <li><a href="/pages/home.html">Home</a></li>
                  <li><a href="/pages/about/statistics.html">Our Statistics</a></li>
                  <li><a href="/pages/volunteer.html">Volunteer</a></li>
                  <li><a href="/pages/contactUs.html">Contact Us</a></li>
                  <li><a href="https://github.com/StormBlackthorn/SPARKWebsite" target="_blank"><img src="/styles/assets/icons/github.png" alt="GitHub" class="icon">GitHub Repo</a></li>
              </ul>
          </div>

          <!-- Social Media -->
          <div>
              <h3>Connect with Us</h3>
              <ul>
                  <li><a href="https://www.instagram.com/spark.stem/" target="_blank"><img src="/styles/assets/icons/instagram.png" alt="Instagram" class="icon">Instagram</a></li>
              </ul>
          </div>

          <!-- Credits -->
          <div>
              <h3>About SPARK</h3>
              <p>
                  Inspiring STEM creativity through projects, innovation, 
                  and collaboration. Empowering the next generation of 
                  problem solvers and innovators. <b>A fully student ran,
                  non-profit organization.</b>
              </p>
          </div>
      </div>

      <div class="footer-bottom">
          © 2025 SPARK STEM Club · All Rights Reserved
          <br>
          Website designed by Yo-cheng Liao and Videep Mannava
      </div>
    </div>
  </footer>

    `;
  }
}

customElements.define('footer-component', Footer);
