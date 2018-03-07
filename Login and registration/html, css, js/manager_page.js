
document.addEventListener("DOMContentLoaded", function(event) {

   const username = sessionStorage.getItem("username");
    const checkSession = function () {
        
        if (sessionStorage.username === null || sessionStorage.username === undefined) {
            window.location.href = "/everest/";
        }
        if(sessionStorage.username !== "admin") {
            window.location.href = "/everest/userhomepage.html";
        }
    };
    
    checkSession();
    /*
    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === variable) {
                return pair[1];
            }
        }
        return(false);
    }
    const username = getQueryVariable("username");
    if(!username) {
        window.location.href = "/everest/";
    } else if (username !== "admin") {
        window.location.href = "/everest/userhomepage.html?username=" + username;
    }*/
    const aUserElement = document.querySelector("#a-user");
    aUserElement.innerHTML = username;

    let url = "http://localhost:8080/everest/webresources/model.user/";

    const processJSON = function(json) {
        let day = document.getElementById("list");
        let info = "";
        info += "<select>";
        for (let item of json) {
            info += "<option>"+`Id: ${item.id} ${item.firstname} ${item.lastname}`;
        };
        info += "</select>";
        day.innerHTML = info;
    };

    fetch(url)
    .then(response => response.json())
    .then(processJSON)
    .catch(error => (console.log("Fetch crashed due to " + error)));
    
    const logoutElement = document.querySelector("#logout");
    logoutElement.addEventListener("click", function() {
        console.log("logout");
        sessionStorage.removeItem("username");
    });
});
