class Navbar extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  build() {
    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(this.styles());

    const navbar = this.navbar();

    shadow.appendChild(navbar);
  }

  navbar() {
    const navbar = document.createElement("nav");
    navbar.classList.add("nav");
    navbar.appendChild(this.navStart());
    navbar.appendChild(this.navEnd());
    return navbar;
  }

  navItem(name, type) {
    const navItem = document.createElement("a");
    navItem.classList.add("navItem");
    navItem.setAttribute("href", "#");
    navItem.addEventListener("click", (element) => {
      element.preventDefault();
      const myContent = document.querySelector("my-content");
      myContent.setAttribute("type", type);
    });
    navItem.innerHTML = `
        ${name}
    `;
    return navItem;
  }

  navStart() {
    const navStart = document.createElement("div");
    navStart.classList.add("navGroup");

    navStart.appendChild(this.navItem("HomePage", "homePage"));
    return navStart;
  }

  navEnd() {
    const navEnd = document.createElement("div");
    navEnd.classList.add("navGroup");

    if (sessionStorage.getItem("isAuth")) {
      navEnd.appendChild(this.navItem("profile", null));
    } else {
      navEnd.appendChild(this.navItem("Sign In", "signIn"));
    }
    return navEnd;
  }

  styles() {
    const style = document.createElement("style");
    style.textContent = `
        .nav{
          display: flex;
          background-color: gray;
          height: 6vh;
          justify-content: space-between;
        }
        .navGroup{
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1em; 
          padding-right: 1em; 
          padding-left: 1em;
        }

        .navItem{
          color: white;
          text-decoration: none;
        }
        .navItem:hover{
        color: lightblue;
        }
      
    `;
    return style;
  }
}

class MyContent extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  static get observedAttributes() {
    return ["type"];
  }

  connectedCallback() {
    this.build(this.getAttribute("type"));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "type" && oldValue !== newValue) {
      this.build(newValue);
    }
  }

  build(type) {
    this.innerHTML = "";

    if (type === "homePage") {
      this.appendChild(this.homePage());
    } else if (type === "signUp") {
      this.appendChild(this.signUpForm());
    } else {
      // default/empty state
    }
  }

  homePage() {
    const homePage = document.createElement("div");
    homePage.classList.add("p-5", "m-2", "rounded-lg", "bg-gray-200", "shadow");
    homePage.innerHTML = ` 
    <p>This project demonstrates frontend authentication concepts using browser storage (sessionStorage).
It is a client-side–only implementation intended for learning and portfolio purposes.
No sensitive data should be stored this way in production applications.
    </p>
    `;

    return homePage;
  }

  signUpForm() {
    const signUpForm = document.createElement("div");
    signUpForm.innerHTML = `
    <div class="
    p-5 bg-gray-200 rounded-lg my-2 mx-50 shadow flex-col
    ">
    <h2 class="text-2xl font-bold mb-4 text-center">Sign Up</h2>
    <form id="signUp-form" action="" class="grid gap-4" method='POST'>
      <div class="inputGroup">
        <label for="name">Name: </label>
        <input type="text" name="name" id="name"/>
      </div>
      <div class="inputGroup">
        <label for="email">Email: </label>
        <input type="text" name="email" id="email" />
      </div>
      <div class="inputGroup">
        <label for="password">Password: </label>
        <input type="password" name="password" id="password" />
      </div>

      <button id='button' type="submit" 
      class="inline bg-blue-300 text-white px-4 py-2 rounded 
      hover:bg-blue-400 transition-colors duration-300">
      Sign Up</button>
    </form>
    </div>
    `;

    return signUpForm;
  }
}

customElements.define("nav-bar", Navbar);
customElements.define("my-content", MyContent);
