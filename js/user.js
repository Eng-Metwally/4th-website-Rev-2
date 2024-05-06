let userInfo = document.querySelector("#user_info")
let userDesc = document.querySelector("#user")
let links = document.querySelector("#links")

if(localStorage.getItem("firstName")) {
    links.remove()
    userInfo.style.display = "flex"
    userDesc.innerHTML = "Welcome " + localStorage.getItem("firstName")
}

let logoutBtn = document.querySelector("#logout")
logoutBtn.addEventListener("click" , function(){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html"
    }, 1500)
})