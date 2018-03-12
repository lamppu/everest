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
            window.location.href = "/Schedule/";
        }
        if (sessionStorage.username === "admin") {
            window.location.href = "/Schedule/manager_page.html";
        }
    };
    
    checkSession();

    const aUserElement = document.querySelector("#a-user");
    aUserElement.innerHTML = username;
});