document.addEventListener("DOMContentLoaded", function() {
    
    const section = document.querySelector("section");
    const url = "http://10.114.32.66:8080/Schedule/webresources/entity.user/findall";
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

    const processJSON = (function(json) {
        let jsonHours = [];
        let jsonDay = "";
        let jsonTask = "";
        for (y in hours){
            let div = document.createElement("div");
            div.classList.add("alldivs");
            div.innerHTML += hours[y];
            section.appendChild(div);
            for (i in days){
                let div = document.createElement("div");
                div.classList.add("alldivs");
                section.appendChild(div);
            }
        }

        for (let item of json){
            for(x = 0; x < item.taskList.length; x++){
                jsonHours = [];
                jsonDay = item.taskList[x].day.toLowerCase();
                jsonTask = item.taskList[x].task;
            
                for(z = item.taskList[x].start; z <= item.taskList[x].end; z++){
                    jsonHours.push(z);
                }
                
                const grid = document.querySelectorAll(".alldivs");
                let j = 0;
                for (y in hours){
                    j++;
                    for (i in days){
                        if(days[i] === jsonDay && jsonHours.includes(hours[y])){
                            grid[j].innerHTML = jsonTask;
                            /*let testTask = document.createElement("button");
                            testTask.setAttribute("value", "motivation");
                            testTask.setAttribute("onclick", "myFunction()");
                            grid[j].appendChild(testTask);*/
                            j++;
                        }else{
                            j++;
                        }
                    }
                }
            }
        }
    });
    
    fetch(url)
    .then(response => response.json())    //Returns a promise that resolves JSON object
    .then(processJSON)
    .catch(error => (alert("Fetch crashed due to " + error)));
        
});

const myFunction = function() {
    alert("Get a move on it.");
};
