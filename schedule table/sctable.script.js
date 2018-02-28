document.addEventListener("DOMContentLoaded", function(event) {
    
    const but1 = document.querySelector("#but1");
    
    //const url = "http://localhost:8080/Schedule/webresources/entity.user/findall";
    //const free = "find tasks not assigned to any users";
    const url = "https://my-json-server.typicode.com/typicode/demo/posts";
    
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
    
    
    const timeTable = function() {
        let time = document.getElementById("time");
        let ht = "";
        ht += "<table border='1'>"+"<th>Time</th>";
        for (y in hours) {
            ht += "<tr><td>"+hours[y]+"<tr><td>";
        }
        ht += "</table>"
        time.innerHTML = ht;
    }
    
    const freeTasks = function() {
        let time = document.getElementById("free");
        let ft = "";
        ft += "<table border='1'>"+"<th>Free Tasks</th>";
        for (i = 1; i < 5; i++) {
            ft += "<tr><td>"+"A free Task"+"<tr><td>";
        }
        ft += "</table>"
        time.innerHTML = ft;
    }
    
    //rowspan=2 for two rows (added to <td>)
    
    
    const processJSON = (function(json) {
        for (let item of json) {
            
            for(i in days){
                let day = document.getElementById(i);
                let = itemStr = "";
                itemStr += "<table border='1'>";
                itemStr += "<th>"+days[i]+"</th>";
                for (y in hours) {
                    if(hours[y] == 17 && days[i] == "Monday"){
                        itemStr += "<tr><td>"+"<button>Clicktoremove</button>"+"<tr><td>"; 
                    }else{
                        itemStr += "<tr><td>"+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+"<tr><td>"
                    }
                }
                itemStr += "</table>"
                day.innerHTML = itemStr;
            }
            break;
        }
    });
    
    freeTasks();
    timeTable();
    fetch(url)
    .then(response => response.json())    //Returns a promise that resolves JSON object
    .then(processJSON)
    .catch(error => (output.textContent = "Fetch crashed due to " + error));
    
    but1.addEventListener('click', function(){
    });
  
});
