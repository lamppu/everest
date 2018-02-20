document.addEventListener("DOMContentLoaded", function(event) {
    
    const but1 = document.querySelector("#but1");
    const url = "https://users.metropolia.fi/~hannutam/adm/fetch/valid-json.json";
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16];
    
    
    const timeTable = function() {
        let time = document.getElementById("time");
        let ht = "";
        ht += "<table>"+"Time";
        for (y in hours) {
            ht += "<br>"+hours[y];
        }
        ht += "</table>"
        time.innerHTML = ht;
    }
    
    const processJSON = (function(json) {
        for (let item of json) {
            
            for(i in days){
                let day = document.getElementById(i);
                let = itemStr = "";
                itemStr += "<table border='1'>";
                itemStr += "<tr>"+days[i];
                for (y in hours) {
                    itemStr += "<br>"+"A Task";
                }
                itemStr += "</tr>"
                itemStr += "</table>"
                day.innerHTML = itemStr;
            }
            break;
        }
    });
        
    timeTable();
    fetch(url)
    .then(response => response.json())    //Returns a promise that resolves JSON object
    .then(processJSON)
    .catch(error => (output.textContent = "Fetch crashed due to " + error));

    
    but1.addEventListener('click', function(){
    });
  
});
