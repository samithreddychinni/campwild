
const firebaseConfig = {
    apiKey: "AIzaSyC6K7BPWYAUKQtFJf4Fcvis0VOi-VRKoz8",
    authDomain: "camp-wild-1a5cf.firebaseapp.com",
    projectId: "camp-wild-1a5cf",
    storageBucket: "camp-wild-1a5cf.firebasestorage.app",
    messagingSenderId: "673052797100",
    appId: "1:673052797100:web:2c704b1ad0e45637735709",
    measurementId: "G-BNMCYSTY0E",
  }
  
  
  document.addEventListener("DOMContentLoaded", () => {
    
    const currentPage = window.location.pathname.split("/").pop()
    const authPages = ["signin.html", "signup.html", "forgot-password.html"]
  
    
    if (!authPages.includes(currentPage)) {
      
      if (typeof firebase !== "undefined") {
        
        if (!firebase.apps || !firebase.apps.length) {
          firebase.initializeApp(firebaseConfig)
        }
  
        
        firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            setTimeout(() => {
              window.location.href = "signin.html"
            }, 100)
          }
        })
      } else {
        console.warn("Firebase is not available. Make sure it's properly loaded.")
        
        loadFirebaseScripts()
      }
    }
  })
  
  
  function loadFirebaseScripts() {
    
    const appScript = document.createElement("script")
    appScript.src = "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
    appScript.onload = () => {
      
      const authScript = document.createElement("script")
      authScript.src = "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth-compat.js"
      authScript.onload = () => {
        
        firebase.initializeApp(firebaseConfig)
  
        
        firebase.auth().onAuthStateChanged((user) => {
          if (!user) {

            window.location.href = "signin.html"
          }
        })
      }
      document.head.appendChild(authScript)
    }
    document.head.appendChild(appScript)
  }
  
  