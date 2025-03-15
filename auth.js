// Toggle password visibility
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

// Form submission handling
const authForm = document.querySelector(".auth-form")

if (authForm) {
  authForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const formDataObj = {}

    formData.forEach((value, key) => {
      formDataObj[key] = value
    })

    // Simulate API call
    console.log("Form data:", formDataObj)

    // Store user data in localStorage (for demo purposes only)
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

    // Redirect to dashboard or home page
    window.location.href = this.action
  })
}

// Check if user is logged in
function checkAuthStatus() {
  const user = JSON.parse(localStorage.getItem("user"))

  if (user && user.isLoggedIn) {
    // Update UI for logged in user
    const signInButtons = document.querySelectorAll('.nav-buttons a[href="signin.html"]')

    signInButtons.forEach((button) => {
      button.textContent = "Sign Out"
      button.href = "#"
      button.addEventListener("click", (e) => {
        e.preventDefault()
        // Clear user data from localStorage
        localStorage.removeItem("user")
        // Redirect to home page
        window.location.href = "index.html"
      })
    })
  }
}

// Run on page load
checkAuthStatus()

