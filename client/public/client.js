const pathname = window.location.pathname;
const baseURL = window.location.href.split(pathname)[0];

console.log(baseURL);
console.log(pathname);

switch (pathname) {
    case "/":
        const appButton = document.getElementById('app-button');
        const logoutButton = document.getElementById('logout-button')
        appButton.addEventListener('click', (element) => {
            if(element.target.classList.contains("action-primary")) {
                element.target.classList.remove("action-primary");
                element.target.classList.add("action-secondary");
            } else {
                element.target.classList.remove("action-secondary");
                element.target.classList.add("action-primary");
            }
        });
        break;
    case "/login":
        const login = document.getElementById('login-form');
        login.addEventListener('submit', async (e) => {
            e.preventDefault();
            let inputs = document.querySelectorAll('input')
            const response = await fetch('http://localhost:8000/user/login', {
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
            const token = data.token;
            window.localStorage.setItem("jwt", token);
        });
        break;
    case "/signup":
        
        break;
    default:
        break;
}