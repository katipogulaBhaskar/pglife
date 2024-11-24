let authToken = ''; 

// Handle singup

document.getElementById('signup-form').addEventListener('submit', async(e) => {
    e.preventDefault();

    const fullname = document.getElementById('SignupFullname').value;
    const phone = document.getElementById('SignupPhone').value;
    const email = document.getElementById('SignupEmail').value;
    const password = document.getElementById('SignupPassword').value;
    const college = document.getElementById('SignupCollege').value;

    let gender = '';
    if (document.getElementById('gender-male').checked) {
        gender = document.getElementById('gender-male').value;
    } else if (document.getElementById('gender-female').checked) {
        gender = document.getElementById('gender-female').value;
    }

    try {
        const response = await fetch('http://localhost:5000/api/user/signupUser', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ fullname, phone, email, password, college, gender })
            
        });

        const result = await response.json();
        alert(result.msg);

        if(response.ok) {
            document.getElementById('signup-form').reset();
        }

    } catch(error) {
        console.error('Error: ', error);
    }

});

// Handle login
document.getElementById('login-form').addEventListener('submit', async(e) => {
    e.preventDefault();
    const email = document.getElementById('LoginEmail').value;
    const password = document.getElementById('LoginPassword').value;
    try {
        const response = await fetch("http://localhost:5000/api/user/loginUser", {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            credentials: 'include', // Include cookies
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        console.log("Login response:", result); // Debugging
        if(response.ok) {
            authToken = result.token;  // Save token
            localStorage.setItem('token', result.token);
            localStorage.setItem('email', email);
            document.getElementById('login-form').reset(); // Correct ID
        } else {
            alert(result.msg);
        }
    } catch(error) {
        console.error('Error during login:', error);
    }
});



// Wait until the DOM is fully loaded
import { searchCity } from './api.js';
import { showErrorAlert, redirectToPage } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const cityInput = document.getElementById('city');

    // Handle form submission
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const city = cityInput.value.trim();
        if (!city) {
            showErrorAlert('Please enter a city to search.');
            return;
        }

        try {
            // Search for the city
            const { page } = await searchCity(city);
            // Redirect to the page if found
            redirectToPage(page);
        } catch (error) {
            // Show error message
            showErrorAlert(error.message);
        }
    });
});
