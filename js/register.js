let firstName = document.querySelector("#firstName")
let lastName = document.querySelector("#lastName")
let email = document.querySelector("#email")
let passWord = document.querySelector("#password")
let registerBtn = document.querySelector("#sign_up")

registerBtn.addEventListener("click" , function(e){
    e.preventDefault()
    if(firstName.value ==="" || lastName.value ==="" || email.value ==="" || passWord.value ===""){
        alert("Please Enter Complete Data")
    }else{
        localStorage.setItem("firstName" , firstName.value)
        localStorage.setItem("lastName" , lastName.value)
        localStorage.setItem("email" , email.value)
        localStorage.setItem("password" , passWord.value)
        setTimeout(()=>{
            window.location = "login.html"
        }, 1500)
    }
})

