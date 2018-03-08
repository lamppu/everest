
document.addEventListener("DOMContentLoaded", function(event) {

   const username = sessionStorage.getItem("username");
    const checkSession = function () {
        
        if (sessionStorage.username === null || sessionStorage.username === undefined) {
            window.location.href = "/everest/";
        }
        if(sessionStorage.username !== "admin") {
            window.location.href = "/everest/userhomepage.html";
        }
        if(sessionStorage.addtask === "success") {
            alert('Task added succesfully.');
            sessionStorage.removeItem("addtask");
        }
        if(sessionStorage.cleartasks === "success") {
            alert('Tasks have been removed succesfully.');
            sessionStorage.removeItem("cleartasks");
        }
    };
    
    checkSession();
   
   
    const aUserElement = document.querySelector("#a-user");
    aUserElement.innerHTML = username;

    let url = "http://localhost:8080/everest/webresources/model.user/";

    const processJSON = function(json) {
        let listElement = document.getElementById("list");
        let listElement2 = document.getElementById("list2");
        let info = "";
        info += "<select name='ownerid' required><option value='' disabled selected>Select User...</option>";
        for (let item of json) {
            info += `<option value=${item.id}>Id: ${item.id} ${item.firstname} ${item.lastname}`;
        };
        info += "</select>";
        listElement.innerHTML = info;
        listElement2.innerHTML = info;
    };

    fetch(url)
    .then(response => response.json())
    .then(processJSON)
    .catch(error => (console.log("Fetch crashed due to " + error)));
    
    
});
