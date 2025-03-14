// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
    // Create the theme toggle button
    const themeToggle = document.createElement("button")
    themeToggle.className = "theme-toggle"
    themeToggle.setAttribute("aria-label", "Toggle dark mode")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    document.body.appendChild(themeToggle)
  
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
    const savedTheme = localStorage.getItem("theme")
  
    // Apply the saved theme or OS preference
    if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
      document.body.classList.add("dark-theme")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }
  
    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme")
  
      // Update button icon
      if (document.body.classList.contains("dark-theme")) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
        localStorage.setItem("theme", "dark")
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
        localStorage.setItem("theme", "light")
      }
  
      // Add transition class for smooth color changes
      document.body.classList.add("theme-transition")
  
      // Remove transition class after transition completes
      setTimeout(() => {
        document.body.classList.remove("theme-transition")
      }, 1000)
    })
  })
  
  