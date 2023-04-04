const pathname = window.location.pathname;
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

        break;
    case "/signup":
        
        break;
    default:
        break;
}