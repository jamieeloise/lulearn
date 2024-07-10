document.addEventListener('DOMContentLoaded', function() {
    const usernameShow = document.getElementById('usernameShow'); 
    const username = sessionStorage.getItem('username'); 

    if (username) {
        usernameShow.textContent = `Hello ${username}!`;
    } else {
        window.location.href = 'login.html'; 
    }
})