const userArray = [];

// the form is in a web component, so I need to listen when it renders on the DOM only

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("submit", (event) => {
    const target = event.target;

    if (target.id === "signup-form") {
      event.preventDefault();

      const formData = new FormData(target);
      const user = Object.fromEntries(formData);
      userArray.push(user);

      // -------------------------------------------------------
      //          other option to set the object:
      //   const user = {};

      //   for (const [key, value] of formData.entries()) {
      //     user[key] = value;
      //   }
      // -------------------------------------------------------

      // Do validation

      sessionStorage.setItem("userArray", JSON.stringify(userArray));
      //in a regular application this user would be storaged in a database
      const myContent = document.querySelector("my-content");
      myContent.setAttribute("type", "signIn");
    } else if (target.id === "signin-form") {
      event.preventDefault();

      const formData = new FormData(target);
      const tryUser = Object.fromEntries(formData);
      let signedUpUsers = sessionStorage.getItem("userArray") || null;
      const myNotification = document.querySelector("my-notification");

      if (!signedUpUsers || signedUpUsers.length === 0) {
        myNotification.createMsg("User not found.", "error");
        return;
      }

      signedUpUsers = JSON.parse(signedUpUsers);
      console.log(typeof signedUpUsers);
      console.log(signedUpUsers);

      signedUpUsers.forEach((user) => {
        if (user.email === tryUser.email) {
          if (user.password === tryUser.password) {
            sessionStorage.setItem("isAuth", true);
            sessionStorage.setItem("currentUser", tryUser.email);
            const myContent = document.querySelector("my-content");
            myContent.setAttribute("type", "homePage");

            const navBar = document.querySelector("nav-bar");
            navBar.build();
            myNotification.createMsg("Welcome " + user.name + " !");
          } else {
            myNotification.createMsg("Password incorret.", "error");
          }
        } else {
          myNotification.createMsg("User not found.", "error");
        }
      });
    }
  });
});
