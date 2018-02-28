document.addEventListener("DOMContentLoaded", function(event) {
    
    let url = "http://localhost:8080/Schedule/webresources/entity.user/findall"
    
    const processJSON = (function(json) {
        let day = document.getElementById("list");
        let info = "";
        info += "<select>"
        for (let item of json) {
            info += "<option>"+`Id: ${item.id} ${item.firstname} ${item.lastname}`;
        }
        info += "</select>"
        day.innerHTML = info;
    }
    
    fetch(url)
    .then(response => response.json())
    .then(processJSON)
    .catch(error => (output.textContent = "Fetch crashed due to " + error));

});