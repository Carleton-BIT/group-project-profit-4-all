document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
});

function validateLogin(event) {
    event.preventDefault(); // Prevent form submission

    //  account
    const validUsername = "profit4all";
    const validPassword = "123";

    // Get user input
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    // Check credentials
    if (enteredUsername === validUsername && enteredPassword === validPassword) {
        localStorage.setItem("loggedInUser", enteredUsername); // Store session
        window.location.href = "homepage.html"; // Redirect
    } else {
        alert("Invalid username or password!");
    }
}


function checkLoginStatus() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (loggedInUser) {
        // Show logout button and welcome message
        logoutButton.classList.remove("hidden");
        welcomeMessage.textContent = `Welcome, ${loggedInUser}! You are logged in.`;
        welcomeMessage.classList.remove("hidden");

        // Hide login button
        loginButton.classList.add("hidden");
    } else {
        // Show login button, hide logout and welcome message
        loginButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");
        welcomeMessage.classList.add("hidden");
    }
}

// Function to log out
function logout() {
    localStorage.removeItem("loggedInUser"); // Remove session
    window.location.href = "homepage.html"; // Redirect to homepage without login
}
