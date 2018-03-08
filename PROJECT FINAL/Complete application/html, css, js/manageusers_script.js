/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

document.addEventListener("DOMContentLoaded", function(event) {
    const username = sessionStorage.getItem("username");
    const checkSession = function () {
        
        if (sessionStorage.username === null || sessionStorage.username === undefined) {
            window.location.href = "/everest/";
        }
        if(sessionStorage.username !== "admin") {
            window.location.href = "/everest/userhomepage.html";
        }
        if(sessionStorage.dltuser === "success") {
            alert('User removed succesfully.');
            sessionStorage.removeItem("dltuser");
        }
    };
    
    checkSession();
   
   
    const aUserElement = document.querySelector("#a-user");
    aUserElement.innerHTML = username;
    
    const url = "http://localhost:8080/everest/webresources/model.user/";
    
    const processJSON = function(json) {
        let listElement = document.getElementById("list");
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
    
    /*
    const dltButton = document.querySelector("#dlt-button");
    const dltInput = document.querySelector("#dlt-input");
    let dltData = {};
    dltInput.addEventListener("input", function () {
        const id = dltInput.querySelector('select[name="id"]').value;
        dltData.id = id;
    });
    
    dltButton.addEventListener("click", function () {
        const dltUrl = url + dltData.id;
        console.log(dltUrl);
        const init = {
            method: "DELETE"
        };

        fetch(dltUrl, init)
            .then(response => response.text())
            .then(text => (document.querySelector("body").innerHTML += text))
            .catch(error => (alert("Something went wrong.")));
    });*/
});
