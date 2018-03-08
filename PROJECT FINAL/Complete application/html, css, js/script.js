const navigation=document.getElementById("responsive-nav");
const icon=document.querySelector(".icon");
const logout=document.querySelector(".logout-form");
const user=document.querySelector(".user");
const email =document.querySelector("a:nth-child(5)");
const addTask=document.querySelector("a:nth-child(4)");
const addTaskForm=document.querySelector(".options");

icon.addEventListener('click',()=> {

    if (navigation.className === "navbar") {
        navigation.className += " responsive";
    } else {
        navigation.className = "navbar";
    }
});

user.addEventListener('click',()=>{
  if(logout.style.display==="block"){
        logout.style.display="none";
  }
  else
    logout.style.display="block";

});

addTask.addEventListener('click', ()=>{
  addTaskForm.style.display="block";
});

const logoutElement = document.querySelector("#logout");
logoutElement.addEventListener("click", function () {
    console.log("logout");
    sessionStorage.removeItem("username");
    window.location.href = "/everest/";
});
//email.addEventListener('click',()=>{
//  window.open("https://www.office.com/");
//});
