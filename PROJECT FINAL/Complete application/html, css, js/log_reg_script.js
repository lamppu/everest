document.addEventListener("DOMContentLoaded", function (event) {

    const checkSession = function () {
        console.log(sessionStorage.username);
        if (sessionStorage.username !== null && sessionStorage.username !== undefined) {
            if (sessionStorage.username === "admin") {
                window.location.href = "/Schedule/manager_page.html";
                
            } else {
                window.location.href = "/Schedule/userhomepage.html";
            }
        }

    };

    checkSession();

    //--------------------------url stuff------------------------------------------
    const urlBase = "http://10.114.32.66:8080/Schedule/webresources/";
    const usersUrl = urlBase + "entity.user/";
    const loginInfoUrl = urlBase + "entity.logininformation/";
    const loginUrl = loginInfoUrl + "login/";

    //-------------------login stuff here------------------------------------------    
    const loginButton = document.querySelector("#loginbtn");
    const loginInput = document.querySelector("#login-input");
    const unameSpan = document.querySelector("#uname-span");
    const passwordSpan = document.querySelector("#password-span");

    let loginData = {};
    let unameReady = false;
    let passwordReady = false;

    const initializeLogin = function () {
        unameReady = false;
        passwordReady = false;
    };
    loginInput.addEventListener("input", function () {
        const uname = loginInput.querySelector("#uname").value.trim();
        const password = loginInput.querySelector("#passw").value.trim();
        if (!uname) {
            unameReady = false;
        } else {
            unameReady = true;
        }

        if (!password) {
            passwordReady = false;
        } else {
            passwordReady = true;
        }

        loginData.username = uname;
        loginData.password = password;
        console.log("Data to post: " + JSON.stringify(loginData));
    });



    const login = function () {
        const userExistsUrl = loginInfoUrl + "found/" + loginData.username;
        const passCorrectUrl = loginInfoUrl + "pass/" + loginData.username;

        fetch(userExistsUrl)
                .then(response => response.text())
                .then(function (text) {
                    if (text === "true") {
                        const init = {
                            method: "POST",
                            body: JSON.stringify(loginData),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            }
                        };
                        fetch(passCorrectUrl, init)
                                .then(response => response.text())
                                .then(function (text) {
                                    if (text === "true") {
                                        const url = loginUrl + loginData.username;
                                        const init = {
                                            method: "POST",
                                            body: JSON.stringify(loginData),
                                            headers: {
                                                "Content-type": "application/json; charset=UTF-8"
                                            }
                                        };
                                        fetch(url, init)
                                                .then(response => response.text())
                                                .then(function (text) {
                                                    if (text === "true") {
                                                        window.sessionStorage.setItem("username", loginData.username);
                                                        
                                                        if (loginData.username === "admin") {
                                                            window.location.href = "/Schedule/manager_page.html";
                                                        } else {
                                                            window.location.href = "/Schedule/userhomepage.html";
                                                        }
                                                    } else {
                                                        unameSpan.innerHTML = "Login was unsuccesful.";
                                                    }
                                                })
                                                .catch(error => (alert("Something went wrong. Please check your information and try again.")));
                                    } else {
                                        passwordSpan.innerHTML = "Incorrect password.";
                                        unameSpan.innerHTML = "";
                                        initializeLogin();
                                    }
                                })
                                .catch(error => (alert("Something went wrong. Please check your information and try again.")));
                    } else {
                        unameSpan.innerHTML = "Cannot find username.";
                        passwordSpan.innerHTML = "";
                        initializeLogin();
                    }
                })


                .catch(error => (alert("Something went wrong. Please check your information and try again.")));
    };

    loginButton.addEventListener("click", function () {
        if (unameReady && passwordReady) {
            login();
        } else if (!unameReady && !passwordReady) {
            unameSpan.innerHTML = "Please fill the information.";
            passwordSpan.innerHTML = "";
        } else if (!unameReady) {
            unameSpan.innerHTML = "The field is required.";
            passwordSpan.innerHTML = "";
        } else if (!passwordReady) {
            passwordSpan.innerHTML = "The field is required.";
            unameSpan.innerHTML = "";
        }
    });

//--------------------Opening the register form--------------------------------------
    const registerButton = document.querySelector(".registerbtn");
    const hidden = document.querySelector("#id1");
    registerButton.addEventListener("click", function () {
        hidden.style.display = 'block';
    });
//--------------------Closing the register form--------------------------------------
    const cancelButton = document.querySelector(".cancelbtn");
    cancelButton.addEventListener("click", function () {
        hidden.style.display = 'none';
    });
//----------------------New user input stuff-----------------------------------------
    const newUserInput = document.querySelector("#new-user-input");
    const usernameSpan = document.querySelector("#username-span");
    const cpswSpan = document.querySelector("#cpsw-span");
    const submitButton = document.querySelector("#add-user");
    const checkBox = document.querySelector("#reg-log");

    let newUserData = {};
    let newLoginData = {};

    let usernameReady = false;
    let firstnameReady = false;
    let lastnameReady = false;
    let emailReady = false;
    let pswReady = false;
    submitButton.disabled = true;
    submitButton.style.backgroundColor = 'lightgray';

    let initialize = function () {
        usernameReady = false;
        firstnameReady = false;
        lastnameReady = false;
        emailReady = false;
        pswReady = false;
        submitButton.disabled = true;
        submitButton.style.backgroundColor = 'lightgray';
    };

    newUserInput.addEventListener("input", function () {

        const username = newUserInput.querySelector("#uname-input").value.trim();
        const firstname = newUserInput.querySelector("#firstname-input").value.trim();
        const lastname = newUserInput.querySelector("#lastname-input").value.trim();
        const email = newUserInput.querySelector("#email-input").value.trim();
        const psw = newUserInput.querySelector("#psw-input").value.trim();
        const cpsw = newUserInput.querySelector("#cpsw-input").value.trim();

        if (!username) {
            usernameReady = false;
        } else {
            usernameReady = true;
        }

        if (!firstname) {
            firstnameReady = false;
        } else {
            firstnameReady = true;
        }

        if (!lastname) {
            lastnameReady = false;
        } else {
            lastnameReady = true;
        }

        if (!email) {
            emailReady = false;
        } else {
            emailReady = true;
        }

        if (!psw || !cpsw) {
            pswReady = false;
        } else if (psw.length === cpsw.length) {
            if (psw === cpsw) {
                pswReady = true;
                cpswSpan.style.display = 'none';
            } else {
                pswReady = false;
                cpswSpan.style.display = 'inline-block';
                cpswSpan.innerHTML = "Confirmed password doesn't match the password above.";
            }
        }

        if (usernameReady && firstnameReady && lastnameReady && emailReady && pswReady) {
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '#00b8e6';
        } else {
            submitButton.disabled = true;
            submitButton.style.backgroundColor = 'lightgray';
        }


        newUserData.username = username;
        newUserData.firstname = firstname;
        newUserData.lastname = lastname;
        newUserData.email = email;
        newLoginData.username = username;
        newLoginData.password = psw;
        console.log("Data to post: " + JSON.stringify(newUserData) + " and: " + JSON.stringify(newLoginData));
    });

    submitButton.addEventListener("click", function () {
        const userExistsUrl = loginInfoUrl + "found/" + newLoginData.username;
        const box = function () {
            if (checkBox.checked) {
                loginData = newLoginData;
                login();
            }
        };

        fetch(userExistsUrl)
                .then(response => response.text())
                .then(function (text) {
                    if (text === "false") {
                        usernameSpan.style.display = 'none';
                        usernameSpan.innerHTML = "";
                        const userInit = {
                            method: "POST",
                            body: JSON.stringify(newUserData),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            }
                        };
                        const loginInit = {
                            method: "POST",
                            body: JSON.stringify(newLoginData),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            }
                        };
                        fetch(loginInfoUrl, loginInit)
                                .then(response => response.json())
                                .then(json => (console.log("Login info saved: " + JSON.stringify(json))))
                                .then(result => fetch(usersUrl, userInit))
                                .then(response => response.json())
                                .then(json => (console.log("User saved: " + JSON.stringify(json))))
                                .then(result => box())
                                .then(result => initialize())
                                .then(result => (hidden.style.display = 'none'))
                                .catch(error => (alert("Something went wrong. Please check your information and try again.")));
                        newUserInput.reset();
                    } else {
                        usernameSpan.style.display = 'inline-block';
                        usernameSpan.innerHTML = "Username already exists. Please use a different username.";
                        initialize();
                    }
                })
                .catch(error => (alert("Something went wrong. Please check your information and try again.")));
    });
}
);


