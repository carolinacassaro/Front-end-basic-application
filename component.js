class Navbar extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  build() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    const shadow = this.shadowRoot;
    shadow.innerHTML = "";
    shadow.appendChild(this.styles());
    shadow.appendChild(this.navbar());
  }

  navbar() {
    const navbar = document.createElement("nav");
    navbar.classList.add("nav");
    navbar.appendChild(this.navStart());
    navbar.appendChild(this.navEnd());
    return navbar;
  }

  navStart() {
    const navStart = document.createElement("div");
    navStart.classList.add("navGroup");

    navStart.appendChild(this.navItem("HomePage", null, "homePage"));
    return navStart;
  }

  navEnd() {
    const navEnd = document.createElement("div");
    navEnd.classList.add("navGroup");

    if (sessionStorage.getItem("isAuth")) {
      navEnd.appendChild(this.navItem("profile", null, null));
      navEnd.appendChild(this.navItem("Sign Out", "sign-out", null));
    } else {
      navEnd.appendChild(this.navItem("Sign In", null,"signIn"));
    }
    return navEnd;
  }

  navItem(name, id, type) {
    const navItem = document.createElement("a");
    navItem.classList.add("navItem");
    navItem.setAttribute("id", id);
    navItem.setAttribute("href", "#");

    // Attach the click handler directly to the anchor so it runs once per element
    navItem.addEventListener("click", (event) => {
      event.preventDefault();
      if (id === "sign-out") {
        this.signOut();
      } else if (type) {
        this.setType(type);
      }
    });

    navItem.innerHTML = `
        ${name}
    `;
    return navItem;
  }

  setType(type) {
    const myContent = document.querySelector("my-content");
    myContent.setAttribute("type", type);
  }

  signOut() {
    if (sessionStorage.getItem("isAuth")) {
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("isAuth");
      // re-render nav to reflect unauthenticated state
      this.build();
      this.setType("homePage");
    }
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
    } else if (type === "signIn") {
      this.appendChild(this.signInForm());
    } else {
      // default/empty state
    }
  }

  homePage() {
    const homePage = document.createElement("div");
    homePage.classList.add(
      "p-5",
      "rounded-lg",
      "bg-gray-200",
      "shadow",
      "w-200",
    );
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
    p-5 bg-gray-200 rounded-lg w-120 shadow flex flex-col text-center
    ">
    <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
    <form id="signup-form" action="" class="grid gap-4" method='POST'>
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
      <div class="mt-2 plain-link">
        <p> Already have an account? </p>
        <a href="#" id="signin-route" > Welcome back and Sign In! </a>
      </div>
      
    </div>
    `;

    this.addEventListener("click", (event) => {
      const target = event.target;
      if (target.id === "signin-route") {
        this.setType("signIn");
      }
    });

    return signUpForm;
  }

  signInForm() {
    const signInForm = document.createElement("div");
    signInForm.innerHTML = `
    <div class="
    p-5 bg-gray-200 rounded-lg w-120 shadow flex flex-col text-center
    ">
    <h2 class="text-2xl font-bold mb-4">Sign In</h2>
    <form id="signin-form" action="" class="grid gap-4" method='POST'>
      <div class="inputGroup">
        <label for="email">Email: </label>
        <input type="text" name="email" id="email" />
      </div>
      <div class="inputGroup">
        <label for="password">Password: </label>
        <input type="password" name="password" id="password" />
      </div>

      <button id='button' type="submit" 
      class="inline bg-blue-400 text-white px-4 py-2 rounded 
      hover:bg-blue-300 transition-colors duration-300">
      Sign in</button>
    </form>
    <div class="mt-2 plain-link"> 
      <p> Still don't have an account? </p>
      <a href="#" id="signup-route"> Sign Up! </p>
    </div>
    </div>
    `;

    this.addEventListener("click", (event) => {
      const target = event.target;
      if (target.id === "signup-route") {
        this.setType("signUp");
      }
    });

    return signInForm;
  }

  setType(type) {
    const myContent = document.querySelector("my-content");
    myContent.setAttribute("type", type);
  }
}

customElements.define("nav-bar", Navbar);
customElements.define("my-content", MyContent);
