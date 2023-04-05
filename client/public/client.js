const pathname = window.location.pathname;
const baseURL = window.location.href.split(pathname)[0];

console.log(baseURL);
console.log(pathname);

switch (pathname) {
    case "/login":
        const login = document.getElementById('login-form');
        login.addEventListener('submit', async (e) => {
            e.preventDefault();
            let inputs = document.querySelectorAll('input')
            let response = await fetch('http://localhost:8000/user/login', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: inputs[0].value,
                    password: inputs[1].value
                })
            })
            let data = await response.json();
            const token = data.token;
            window.sessionStorage.setItem("jwt", token);
            window.location.href = `http://localhost:8000/app/${token}`
        });
        break;
    case "/signup":
        const signup = document.getElementById('signup-form');
        signup.addEventListener('submit', async (e) => {
            e.preventDefault();
            let inputs = document.querySelectorAll('input')
            const response = await fetch('http://localhost:8000/user/', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: inputs[0].value,
                    password: inputs[1].value
                })
            })
            const data = await response.json();
            signup.style.display = 'none';
            document.getElementById('signup-success').style.display ='flex'
        });
        break;
    case "/password-reset":
        const resetpw = document.getElementById('resetpw-form');
        resetpw.addEventListener('submit', async (e) => {
            e.preventDefault();
            let inputs = document.querySelectorAll('input')
            const response = await fetch('http://localhost:8000/user/', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: inputs[0].value,
                })
            });
            const data = await response.json();
        });
        break;
    default:

        break;
}