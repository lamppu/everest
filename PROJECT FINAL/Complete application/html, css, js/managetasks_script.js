
document.addEventListener("DOMContentLoaded", function(event) {

   const username = sessionStorage.getItem("username");
    const checkSession = function () {
        
        if (sessionStorage.username === null || sessionStorage.username === undefined) {
            window.location.href = "/Schedule/";
        }
        if(sessionStorage.username !== "admin") {
            window.location.href = "/Schedule/userhomepage.html";
        }
        if(sessionStorage.addtask === "success") {
            alert('Task added succesfully.');
            sessionStorage.removeItem("addtask");
        }
        if(sessionStorage.cleartasks === "success") {
            alert('Tasks have been removed succesfully.');
            sessionStorage.removeItem("cleartasks");
        }
        if(sessionStorage.assigntask === "success") {
            alert('Task assigned succesfully.');
            sessionStorage.removeItem("assigntask");
        }
    };
    
    checkSession();
   
   
    const aUserElement = document.querySelector("#a-user");
    aUserElement.innerHTML = username;

    let url = "http://10.114.32.66:8080/Schedule/webresources/entity.user/";

    const processJSON = function(json) {
        let listElement = document.getElementById("list");
        let listElement2 = document.getElementById("list2");
        let listElement3 = document.getElementById("list3");
        let info = "";
        info += "<select name='ownerid' required>";
        info += "<option value='' disabled selected>Select User...</option>";
        
        for (let item of json) {
            info += `<option value=${item.id}>Id: ${item.id} ${item.firstname} ${item.lastname}`;
        };
        
        listElement.innerHTML = info + "<option value=0 >No specific user</option>";
        info += "</select>";
        listElement.innerHTML += "</select>";
        listElement2.innerHTML = info;
        listElement3.innerHTML = info;
    };

    fetch(url)
    .then(response => response.json())
    .then(processJSON)
    .catch(error => (console.log("Fetch crashed due to " + error)));
    
    let unAssignedTasksUrl = "http://10.114.32.66:8080/Schedule/webresources/entity.task/unassigned";

    const taskOps = function(json) {
        let tasksElement = document.getElementById("tasks");
        let info = "";
        info += "<select name='taskid' required>";
        info += "<option value='' disabled selected>Select Task...</option>";
        
        for (let item of json) {
            info += `<option value=${item.id}>Task: ${item.task} ${item.day} ${item.start}-${item.end}`;
        };
        
        info += "</select>";
        tasksElement.innerHTML = info;
    };

    fetch(unAssignedTasksUrl)
    .then(response => response.json())
    .then(json => taskOps(json))
    .catch(error => (console.log("Fetch crashed due to " + error)));
});
