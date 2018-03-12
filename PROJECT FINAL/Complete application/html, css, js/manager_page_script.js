document.addEventListener("DOMContentLoaded", function (event) {
    const username = sessionStorage.getItem("username");
    const checkSession = function () {

        if (sessionStorage.username === null || sessionStorage.username === undefined) {
            window.location.href = "/Schedule/";
        }
        if (sessionStorage.username !== "admin") {
            window.location.href = "/Schedule/userhomepage.html";
        }
    };

    checkSession();


    const aUserElement = document.querySelector("#a-user");
    aUserElement.innerHTML = username;

    const elemVisible = (elem) => {
        if (elem.style.visibility === "hidden") {
            elem.style.visibility = "visible";
        }
        
    };

    const hideElem = (elem) => {
        elem.style.visibility = "hidden";
    };
    const tasksLink = document.querySelector("#a-man-tasks");
    const usersLink = document.querySelector("#a-man-users");
    const manageTasksElement = document.querySelector("#man-tasks");
    const manageUsersElement = document.querySelector("#man-users");

    hideElem(manageTasksElement);
    hideElem(manageUsersElement);

    tasksLink.addEventListener("click", function () {
        hideElem(manageUsersElement);
        elemVisible(manageTasksElement);
    });

    usersLink.addEventListener("click", function () {
        console.log("do we come here");
        hideElem(manageTasksElement);
        elemVisible(manageUsersElement);
    });
});