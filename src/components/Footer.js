class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
        <style>
            #footer {
                text-align: center;
                padding: 10px;
                background-color: #f4a460;
                margin-top: 70px;
                min-height: 200px;
                border-top: 4px solid black;
            }
        </style>

        <div id="footer">Footer Section</div>
    `;
  }
}

customElements.define('footer-component', Footer);
