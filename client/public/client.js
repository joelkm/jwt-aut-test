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
            let response = await fetch('https://allwell-test-app.onrender.com/user/login', {
                method: "PUT",
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
            console.log(data);
            if(data.error) {
                document.getElementById('login-error').style.display = 'block';
            } else {
                const token = data.token;
                const id = data.id;
                await window.sessionStorage.setItem("jwt", token);
                window.location.href = `https://allwell-test-app.onrender.com/app/${id}/${token}`
            }
        });
        break;
    case "/signup":
        const signup = document.getElementById('signup-form');
        signup.addEventListener('submit', async (e) => {
            e.preventDefault();
            let inputs = document.querySelectorAll('input')
            if(inputs[0].value == '' || inputs[1].value == '') {
                document.getElementById('signup-error').style.display = 'block'
            } else {
                const response = await fetch('https://allwell-test-app.onrender.com/user/', {
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
                if(data.error) {
                    document.getElementById('mail-exists').style.display = 'block';
                } else {
                signup.style.display = 'none';
                document.getElementById('signup-success').style.display ='flex'
                }
            }
        });
        break;
    case "/password-reset":
        const resetpw = document.getElementById('resetpw-form');
        resetpw.addEventListener('submit', async (e) => {
            e.preventDefault();
            let inputs = document.querySelectorAll('input')
            const response = await fetch('https://allwell-test-app.onrender.com/user/password-reset', {
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
            console.log(data);
            if(data.error) {
                document.getElementById('sendlink-error').style.display = 'block';
            } else {
                resetpw.style.display = 'none';
                document.getElementById('resetpw-success').style.display ='flex'
                document.getElementById('reset-link').setAttribute('href', data.link)
            }
        });
        break;
    default:

        break;
}