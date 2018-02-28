document.addEventListener("DOMContentLoaded", (event) => {
    
    const output = document.querySelector("p");
    const url = "http://localhost:8080/Schedule/webresources/entity.user/findall";
    output.innerHTML = "Fetching JSON data...";
    
    const processJSON = ((json) => {
        let = itemStr = "";
        for (let item of json) {
            itemStr +=  `<br/>${item.id}:`;
        }
        output.innerHTML = "Got data: " + itemStr;
    });
    
    
    fetch(url, {mode: 'no-cors'})
    .then(response => response.json())    //Returns a promise that resolves JSON object
    .then(processJSON)
    .catch(error => (output.textContent = "Fetch crashed due to " + error));

    
});