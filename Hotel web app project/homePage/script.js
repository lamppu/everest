const navigation=document.getElementById("responsive-nav");
const icon=document.querySelector(".icon");

icon.addEventListener('click',()=> {

    if (navigation.className === "navbar") {
        navigation.className += " responsive";
    } else {
        navigation.className = "navbar";
    }
});
