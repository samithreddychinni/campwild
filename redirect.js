// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6K7BPWYAUKQtFJf4Fcvis0VOi-VRKoz8",
    authDomain: "camp-wild-1a5cf.firebaseapp.com",
    projectId: "camp-wild-1a5cf",
    storageBucket: "camp-wild-1a5cf.firebasestorage.app",
    messagingSenderId: "673052797100",
    appId: "1:673052797100:web:2c704b1ad0e45637735709",
    measurementId: "G-BNMCYSTY0E",
  }
  
  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Check if we're not already on an auth page
    const currentPage = window.location.pathname.split("/").pop()
    const authPages = ["signin.html", "signup.html", "forgot-password.html"]
  
    // Only proceed with auth check if we're not on an auth page
    if (!authPages.includes(currentPage)) {
      // Check if Firebase is available
      if (typeof firebase !== "undefined") {
        // Initialize Firebase if not already initialized
        if (!firebase.apps || !firebase.apps.length) {
          firebase.initializeApp(firebaseConfig)
        }
  
        // Check if user is signed in
        firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            // User is not signed in, redirect to sign-in page
            // Add a small delay to prevent immediate redirection
            setTimeout(() => {
              window.location.href = "signin.html"
            }, 100)
          }
        })
      } else {
        console.warn("Firebase is not available. Make sure it's properly loaded.")
        // Load Firebase scripts dynamically if not available
        loadFirebaseScripts()
      }
    }
  })
  
  // Function to dynamically load Firebase scripts
  function loadFirebaseScripts() {
    // Load Firebase App
    const appScript = document.createElement("script")
    appScript.src = "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
    appScript.onload = () => {
      // Load Firebase Auth after App is loaded
      const authScript = document.createElement("script")
      authScript.src = "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth-compat.js"
      authScript.onload = () => {
        // Initialize Firebase and check auth state
        firebase.initializeApp(firebaseConfig)
  
        // Check if user is signed in
        firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            // User is not signed in, redirect to sign-in page
            window.location.href = "signin.html"
          }
        })
      }
      document.head.appendChild(authScript)
    }
    document.head.appendChild(appScript)
  }
  
  