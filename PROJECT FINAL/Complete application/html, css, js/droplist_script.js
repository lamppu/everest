document.addEventListener("DOMContentLoaded", function() {
    
    const aside = document.querySelector("aside");
    const taskurl = "http://10.114.32.66:8080/Schedule/webresources/entity.task/";
    //let thisUser = Request.QueryString("userid")(item);
    
    const eraseList = (function(json) {
        let list = document.createElement("table");
        let option = document.createElement("th");
        option.innerHTML = "Pick a completed task:";
        list.appendChild(option);
        for (let item of json) {
            let option = document.createElement("tr");
            let data = document.createElement("td");
            let button = document.createElement("button");
            button.setAttribute("onclick", "removeTask("+item.id+")");
            button.innerHTML = "TASK: "+item.task+" DAY: "+item.day+" OWNER: "+item.owner_id+"";
            data.appendChild(button);
            option.appendChild(data);
            list.appendChild(option);
        }
        aside.appendChild(list);
        
        for(i = 0; i < 2; i++){
            let space = document.createElement("br");
            aside.appendChild(space);
        }
    });
    
    const selectList = (function(json) {
        let list = document.createElement("table");
        let option = document.createElement("th");
        option.innerHTML = "Select a free task:";
        list.appendChild(option);
        for (let item of json) {
            let option = document.createElement("tr");
            let data = document.createElement("td");
            let button = document.createElement("button");
            button.setAttribute("onclick", "addTask("+item.id+")");
            button.innerHTML = "TASK: "+item.task+" DAY: "+item.day+" OWNER: "+item.owner_id+"";
            data.appendChild(button);
            option.appendChild(data);
            list.appendChild(option);
        }
        aside.appendChild(list);
    });
    
    
    fetch(taskurl)
    .then(response => response.json())    //Returns a promise that resolves JSON object
    .then(eraseList)
    .catch(error => alert("Fetch crashed due to " + error))
    
    fetch(taskurl)
    .then(response => response.json())    //Returns a promise that resolves JSON object
    .then(selectList)
    .catch(error => alert("Fetch crashed due to " + error))
    
        
});

document.querySelector("showuser").onclick = function(){
    document.querySelector("currentuser").style.visibility = "visible";
}

/*const removeurl = "http://10.114.32.66:8080/Schedule/webresources/entity.task/";
const addurl = "http://10.114.32.66:8080/Schedule/webresources/entity.task/setuser"

const removeTask = (function(taskID) {
    fetch(removeurl, {method: 'delete', body: taskID })
    .then(response => response.json())
    .catch(error => alert("Fetch crashed due to " + error))
});

const addTask = function(taskID) {
    let info = {"taskID":taskID, "userID":thisUser};
    fetch(addurl, {method: 'post', body: info })
    .then(response => response.json())
    .catch(error => alert("Fetch crashed due to " + error))
};
*/