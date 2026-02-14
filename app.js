// the form is in a web component, so I need to listen when it renders on the DOM only
let myContent = document.querySelector("my-content");

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("submit", (event) => {
    const target = event.target;

    //----------------------------------SIGN UP FORM

    if (target.id === "signup-form") {
      event.preventDefault();

      const formData = new FormData(target);
      const user = Object.fromEntries(formData);

      // TO DO: VALIDATION

      if (!sessionStorage.getItem("userArray")) {
        const userArray = [];
        userArray.push(user);
        sessionStorage.setItem("userArray", JSON.stringify(userArray));
      } else {
        const userArray = JSON.parse(sessionStorage.getItem("userArray"));
        userArray.push(user);
        sessionStorage.setItem("userArray", JSON.stringify(userArray));
      }

      // -------------------------------------------------------
      //          other option to set the object:
      //   const user = {};

      //   for (const [key, value] of formData.entries()) {
      //     user[key] = value;
      //   }
      // -------------------------------------------------------

      //in a regular application this user would be storaged in a database
      
      myContent.setAttribute("type", "signIn");

    //END-------------------------------------------------------

    //----------------------------------SIGN IN FORM
    } else if (target.id === "signin-form") {
      event.preventDefault();

      const formData = new FormData(target);
      const tryUser = Object.fromEntries(formData);
      let signedUpUsers = sessionStorage.getItem("userArray") || null;

      if (!document.querySelector("my-notification")){
        document.createElement('my-notification');
      }

      let myNotification = document.querySelector("my-notification");

      if (!signedUpUsers || signedUpUsers.length === 0) {
        myNotification.createMsg("User not found.", "error");
        return;
      }

      signedUpUsers = JSON.parse(signedUpUsers);
      let isUser = "";

      signedUpUsers.forEach((user) => {
        if (user.email === tryUser.email) {
          if (user.password === tryUser.password) {
            sessionStorage.setItem("isAuth", true);
            sessionStorage.setItem("currentUser", tryUser.email);
            const myContent = document.querySelector("my-content");
            myContent.setAttribute("type", "homePage");

            const navBar = document.querySelector("nav-bar");
            navBar.build();
            isUser += user.name;
          }
        }
      });

      if (isUser) {
        myNotification.createMsg("Welcome " + isUser + "!");
      } else { 
        myNotification.createMsg("User not found.", "error");
      }
    }

    //END-------------------------------------------------------
  });
});
