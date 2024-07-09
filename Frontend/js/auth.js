const API_BASE_URL = 'http://localhost:3000';

// user registration 
async function register (username, password) { 
    try {
        // backticks instead of quotes for the fetch URLs to allow for
        // proper string interpolation 
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ username, password }), 
        }); 

        const data = await response.json(); 

        if (response.ok) {
            console.log('Registration Successful: ', data); 
            window.location.href = 'login.html'; // redirect to login page 
        } else { 
            console.error('Registration failed: ', data.msg); 
            alert(data.msg || 'Registration failed. Please try again.'); 
        }
    } catch (error) {
        console.error('Error during registration: ', error); 
        alert('An error occurred. Please try again.'); 
    }
} 

// user login 
async function login(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ username, password }), 
        }); 

        const data = await response.json(); 

        if (response.ok) {
            console.log('Login Successful: ', data); 
            // store session information 
            sessionStorage.setItem('userLoggedIn', 'true'); 
            window.location.href = 'index.html'; // redirect to main dashboard 
        } else {
            console.error('Login Failed: ', data.msg); 
            alert(data.msg || 'Login Failed. Please Try Again.'); 
        }
    } catch (error) { 
        console.error('Error during login: ', error); 
        alert('An error occurred. Please try again.'); 
    }
} 

export {register, login}; 