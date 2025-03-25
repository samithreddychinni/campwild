
document.addEventListener("DOMContentLoaded", () => {
    
    const themeToggle = document.createElement("button")
    themeToggle.className = "theme-toggle"
    themeToggle.setAttribute("aria-label", "Toggle dark mode")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    document.body.appendChild(themeToggle)
  
    
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
    const savedTheme = localStorage.getItem("theme")
  
    
    if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
      document.body.classList.add("dark-theme")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }
  
    
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme")
  
      
      if (document.body.classList.contains("dark-theme")) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
        localStorage.setItem("theme", "dark")
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
        localStorage.setItem("theme", "light")
      }
  
      
      document.body.classList.add("theme-transition")
  
      
      setTimeout(() => {
        document.body.classList.remove("theme-transition")
      }, 1000)
    })
  })
  
  