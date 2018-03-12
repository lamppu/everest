/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

document.addEventListener("DOMContentLoaded", function(event) {
    const username = sessionStorage.getItem("username");
    const checkSession = function () {
        
        if (sessionStorage.username === null || sessionStorage.username === undefined) {
            window.location.href = "/Schedule/";
        }
        if(sessionStorage.username !== "admin") {
            window.location.href = "/Schedule/userhomepage.html";
        }
        if(sessionStorage.dltuser === "success") {
            alert('User removed succesfully.');
            sessionStorage.removeItem("dltuser");
        }
    };
    
    checkSession();
   
   
    const aUserElement = document.querySelector("#a-user");
    aUserElement.innerHTML = username;
    
    const url = "http://10.114.32.66:8080/Schedule/webresources/entity.user/";
    
    const processJSON = function(json) {
        let listElement = document.getElementById("users");
        let info = "";
        info += "<select name='id' required><option value='' disabled selected>Select User...</option>";
        for (let item of json) {
            info += `<option value=${item.id}>Id: ${item.id} ${item.firstname} ${item.lastname}`;
        };
        info += "</select>";
        listElement.innerHTML = info;
    };

    fetch(url)
    .then(response => response.json())
    .then(json => processJSON(json))
    .catch(error => (console.log("Fetch crashed due to " + error)));
    
});
