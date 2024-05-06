let email = document.querySelector("#email")
let passWord = document.querySelector("#password")
let loginBtn = document.querySelector("#sign_in")

let getemail = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

loginBtn.addEventListener("click" , function(e){
    e.preventDefault()
    if(email.value ==="" || passWord.value ===""){
        alert("Please fill complete data")
    }
    else {
        if(getemail && getemail.trim() === email.value.trim() && getPassword === passWord.value){
            setTimeout(()=> {
                window.location = "index.html"
            }, 1500)
        }
        else {
            alert("User Name or PassWord is Wrong")
        }
    }
})
