document.addEventListener("DOMContentLoaded", function(event) {
    
    const aside = document.querySelector("aside");
    const taskurl = "http://localhost:8080/Schedule/webresources/entity.task/";

    const dropList = (function(json) {
        let list = document.createElement("select");
        let option = document.createElement("option");
        option.innerHTML = "Pick a completed task:";
        list.appendChild(option);
        for (let item of json) {
            let option = document.createElement("option");
            option.setAttribute("onclick", "removeTask("+item.id+")");
            option.innerHTML = "TASK: "+item.task+" DAY: "+item.day+" OWNER: "+item.owner_id;
            list.appendChild(option);
        }
        aside.appendChild(list);
    });
    
    fetch(taskurl)
    .then(response => response.json())    //Returns a promise that resolves JSON object
    .then(dropList)
    .catch(error => alert("Fetch crashed due to " + error))
    
});

const removeurl = "http://localhost:8080/Schedule/webresources/entity.task/";

const removeTask = (function(taskID) {
    fetch(removeurl, {method: 'delete', body: taskID })
    .then(response => response.json())
    .catch(error => alert("Fetch crashed due to " + error))
});


/*const dropList2 = (function(json) {
    let list2 = document.createElement("select");
    let option2 = document.createElement("option");
    option2.innerHTML = "Select an open task:";
    list2.appendChild(option2);
        for (let item of json) {
            let option2 = document.createElement("option");
            //option.setAttribute("onclick", "removeTask("+item.id+")");
            //option.innerHTML = "TASK: "+item.task+" DAY: "+item.day+" OWNER: "+item.owner_id;
            list2.appendChild(option2);
        }
        aside.appendChild(list2);
    }*/
