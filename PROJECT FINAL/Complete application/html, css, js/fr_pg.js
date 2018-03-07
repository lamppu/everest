/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


document.addEventListener("DOMContentLoaded", function (event) {
    
    const username = sessionStorage.getItem("username");
    console.log(username);
    const checkSession = function () {

        if (sessionStorage.username === null || sessionStorage.username === undefined) {
            window.location.href = "/everest/";
        }
        if (sessionStorage.username === "admin") {
            window.location.href = "/everest/manager_page.html";
        }
    };
    checkSession();

    /*
     function getQueryVariable(variable)
     {
     var query = window.location.search.substring(1);
     var vars = query.split("&");
     for (var i = 0; i < vars.length; i++) {
     var pair = vars[i].split("=");
     if (pair[0] === variable) {
     return pair[1];
     }
     }
     return(false);
     }
     const username = getQueryVariable("username");
     if(!username) {
     window.location.href = "/everest/";
     } else if(username === "admin") {
     window.location.href = "/everest/manager_page.html?username=admin";
     } */
    const aUserElement = document.querySelector("#a-user");
    aUserElement.innerHTML = username;
    const logoutElement = document.querySelector("#logout");
    logoutElement.addEventListener("click", function () {
        console.log("logout");
        sessionStorage.removeItem("username");
        window.location.href = "/everest/";
        //document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost:8080/everest/;";
    });
});