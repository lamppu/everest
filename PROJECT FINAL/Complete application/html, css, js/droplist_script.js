document.addEventListener("DOMContentLoaded", function() {
    
    const aside = document.querySelector("aside");
    const taskurl = "http://10.114.32.66:8080/Schedule/webresources/entity.task/";
    //const userurl = "http://10.114.32.66:8080/Schedule/webresources/entity.user/getuserbyid";
    
    const eraseList = (function(json) {
        let list = document.createElement("table");
        let option = document.createElement("th");
        option.innerHTML = "Pick a completed task:";
        list.appendChild(option);
        for (let item of json) {
            let option = document.createElement("tr");
            let data = document.createElement("td");
            let button = document.createElement("button");
            button.addEventListener("click", removeTask);
            button.setAttribute("value", item.id);
            button.innerHTML = "TASK: "+item.task+" - DAY: "+item.day+" - TaskID: "+item.id;
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
            button.addEventListener("click", addTask);
            button.setAttribute("value", item.id);
            button.innerHTML = "TASK: "+item.task+" - DAY: "+item.day+" - ID: "+item.id+" - OWNER: FREE TASK";
            data.appendChild(button);
            option.appendChild(data);
            list.appendChild(option);
        }
        aside.appendChild(list);
    });
    
    fetch(taskurl)
    .then(response => response.json())    //Returns a promise that resolves JSON object
    .then(eraseList)
    .catch(error => alert("Fetch crashed due to " + error));
    
    fetch(taskurl)
    .then(response => response.json())    //Returns a promise that resolves JSON object
    .then(selectList)
    .catch(error => alert("Fetch crashed due to " + error));
    
    const removeUrl = "http://10.114.32.66:8080/Schedule/webresources/entity.task/";
    const setuserUrl = "http://10.114.32.66:8080/Schedule/webresources/entity.task/setuser";
    //var thisUser = Request.QueryString("userid")(item);
    
    function removeTask(event){
        event.preventDefault;
        let formData = new FormData();
        formData.append("id", event.target.value);
        fetch(removeUrl, {
            method: 'delete', 
            body: formData})
                .then(response => response.json())
                .catch(error => alert("Removed. Fetch crashed due to " + error));
    };
    
    function addTask(event){
        event.preventDefault;
        fetch(setuserUrl, {method: 'POST', body: {"taskID": event.target.value, "userID": 2}})
                .then(response => response.json())
                .catch(error => alert("Added. Fetch crashed due to " + error));
    };
    
});
