/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


document.addEventListener("DOMContentLoaded", function (event) {
    const cookie = document.cookie;
    const getCookie = function (cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";

    };
    const username = getCookie("username");
    
    const checkCookie = function () {
        
        if (!cookie) {
            window.location.href = "/everest/login.html";
        }
        if(username !== "admin") {
            window.location.href = "/everest/";
        }
    };
    
    checkCookie();
    
    const p = document.querySelector("p");

    
    p.innerHTML = username;
});