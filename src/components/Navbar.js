class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        #nav-bar {
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

            
            #logo {
                height: 50px;
                border-radius: 100px;
            }

            #nav-links {
                display: flex;
                gap: 10px;
                align-items: center;
                font-size: 24px;

                a {
                    text-decoration: none;
                    color: black;
                    padding: 20px;
                    transition: padding-top 0.3s ease;

                    &:hover {
                        border-bottom: 2px solid black;
                    }
                }
                
            }

            .dropdown {
                position: relative;

                &:hover {
                    .dropdown-content {
                        display: block;
                    }

                    .arrow {

                      transform: rotate(90deg);
                      color: rgb(74, 28, 214);

                    }

                    

                    .dropdown-title::after {
                        transform: rotate(90deg);
                    }
                }

                .dropdown-title {
                    display: flex;

                    .title {
                      cursor: pointer;
                      display: block;
                      padding: 10px;
                      text-align: center;
                      padding-right: 0px;
                    }

                    .arrow {
                      padding: 10px;
                      transition: all 0.3s ease;
                      
                    }

                }

                .dropdown-content {
                    display: none;
                    position: absolute;
                    background-color: #f9f9f9;
                    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                    

                    a {
                        padding: 12px 16px;
                        display: block;

                          &:hover{
                            background-color: #f1f1f1;
                            border-bottom: 0px !important;
                                                        
                         }
                     }
                }    

            }

        }

      </style>

      <div id="nav-bar">
        <a href="/pages/home.html"><img src="/styles/assets/sparkText.png" id="logo" alt="Logo"></a>
        <div id="nav-links">
          <div class="dropdown">
            <div class="dropdown-title">
              <p class="title">About Us</p>
              <p class="arrow"> > </p>
            </div>
            <div class="dropdown-content">
              <a href="/pages/about/mission.html">Mission</a>
              <a href="/pages/about/members.html">Members</a>
              <a href="/pages/about/statistics.html">Statistics</a>
            </div>
            
          </div>
          <a href="/pages/Xcratch/index.html">Xcratch</a>
          <a href="/pages/volunteer.html">Volunteer</a>
          <a href="/pages/contactUs.html">Contact Us</a>
        </div>
      </div>
    `;
  }
}

customElements.define('navbar-component', Navbar);