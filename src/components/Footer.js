class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
        <style>
            #footer {
                padding-top: 45px;
                background-color: #f4a460;
                padding-bottom: 25px;
                border-top: 4px solid black;
                left: 0;
                bottom: 0;
                width: 100%;
            }
        </style>

        <div id="footer"></div>
    `;
  }
}

customElements.define('footer-component', Footer);
