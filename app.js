// the form is in a web component, so I need to listen when it renders on the DOM only

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("submit", (event) => {
    const signUpform = event.target;
    if (!signUpform || signUpform.id !== "signUp-form") return;

    event.preventDefault();

    const formData = new FormData(signUpform);
    const user = {};

    for (const [key, value] of formData.entries()) {
        user[key] = value;
    }


    // Do validation

    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('isAuth', true);
    
    myContent = document.querySelector('my-content');
    myContent.setAttribute('type', 'homePage');

  });
});
