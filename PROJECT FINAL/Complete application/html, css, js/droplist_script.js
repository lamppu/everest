document.addEventListener("DOMContentLoaded", function() {
    
    const aside = document.querySelector("aside");
    const taskurl = "http://10.114.32.66:8080/Schedule/webresources/entity.task/";
    
    const removeurl = "http://10.114.32.66:8080/Schedule/webresources/entity.task/";

    const removeTask = (function(taskID) {
        fetch(removeurl, {method: 'delete', body: taskID })
        .then(response => response.json())
        .catch(error => alert("Fetch crashed due to " + error))
    });


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
        
        for(i = 0; i <5; i++){
            aside.appendChild(document.createElement("br"));
        }
        let captiontext = document.createElement("div");
        captiontext.innerHTML = "Your notes";
        aside.appendChild(captiontext);
        
        let textbox = document.createElement("textarea");
        textbox.setAttribute("rows", "10");
        textbox.setAttribute("cols", "auto");
        
        aside.appendChild(textbox);

    });
    
    fetch(taskurl)
    .then(response => response.json())    //Returns a promise that resolves JSON object
    .then(dropList)
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