
const togglePasswordButtons = document.querySelectorAll(".toggle-password")

togglePasswordButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const passwordInput = this.previousElementSibling
    const icon = this.querySelector("i")

    if (passwordInput.type === "password") {
      passwordInput.type = "text"
      icon.classList.remove("fa-eye")
      icon.classList.add("fa-eye-slash")
    } else {
      passwordInput.type = "password"
      icon.classList.remove("fa-eye-slash")
      icon.classList.add("fa-eye")
    }
  })
})


const authForm = document.querySelector(".auth-form")

if (authForm) {
  authForm.addEventListener("submit", function (e) {
    e.preventDefault()

    
    const formData = new FormData(this)
    const formDataObj = {}

    formData.forEach((value, key) => {
      formDataObj[key] = value
    })

    
    console.log("Form data:", formDataObj)

    
    if (this.id === "signup-form") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: formDataObj.name || formDataObj.email.split("@")[0],
          email: formDataObj.email,
          isLoggedIn: true,
        }),
      )
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formDataObj.email,
          isLoggedIn: true,
        }),
      )
    }

    
    window.location.href = this.action
  })
}


function checkAuthStatus() {
  const user = JSON.parse(localStorage.getItem("user"))

  if (user && user.isLoggedIn) {
    
    const signInButtons = document.querySelectorAll('.nav-buttons a[href="signin.html"]')

    signInButtons.forEach((button) => {
      button.textContent = "Sign Out"
      button.href = "#"
      button.addEventListener("click", (e) => {
        e.preventDefault()
        
        localStorage.removeItem("user")
        
        window.location.href = "index.html"
      })
    })
  }
}


checkAuthStatus()

