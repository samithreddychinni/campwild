// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC6K7BPWYAUKQtFJf4Fcvis0VOi-VRKoz8",
    authDomain: "camp-wild-1a5cf.firebaseapp.com",
    projectId: "camp-wild-1a5cf",
    storageBucket: "camp-wild-1a5cf.firebasestorage.app",
    messagingSenderId: "673052797100",
    appId: "1:673052797100:web:2c704b1ad0e45637735709",
    measurementId: "G-BNMCYSTY0E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get auth instance
const auth = firebase.auth();

// Function to update navigation bar auth button
function updateNavAuthButton() {
    const navAuthButton = document.querySelector('.nav-buttons a[href="signin.html"]');
    if (navAuthButton) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                navAuthButton.textContent = 'Sign Out';
                navAuthButton.href = '#';
                navAuthButton.onclick = (e) => {
                    e.preventDefault();
                    auth.signOut().then(() => {
                        window.location.href = 'index.html';
                    }).catch((error) => {
                        console.error('Sign out error:', error);
                    });
                };
            } else {
                // User is signed out
                navAuthButton.textContent = 'Sign In';
                navAuthButton.href = 'signin.html';
                navAuthButton.onclick = null;
            }
        });
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateNavAuthButton);

// Password toggle functionality
const togglePasswordButtons = document.querySelectorAll(".toggle-password");
togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const passwordInput = this.previousElementSibling;
        const icon = this.querySelector("i");
        
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            passwordInput.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    });
});

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
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.isLoggedIn) {
        const signInButtons = document.querySelectorAll('.nav-buttons a[href="signin.html"]');
        signInButtons.forEach((button) => {
            button.textContent = 'Sign Out';
            button.href = '#';
            button.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            });
        });
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', checkAuthStatus);

