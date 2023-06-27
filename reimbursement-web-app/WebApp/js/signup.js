
function signup(){
    document.getElementById('login-btn').disabled = true;
    const password = ('password',document.getElementById('psw').value);
    const passwordConfirmation = ('pswc',document.getElementById('pswc').value);
    if(password != passwordConfirmation){
        passwordsDoNotMatch();
    }else{
        let credentials = new Map();
        credentials.set('firstname',document.getElementById('firstname').value);
        credentials.set('lastname',document.getElementById('lastname').value);
        credentials.set('email',document.getElementById('email').value);
        credentials.set('password',password);
        credentials.set('role',document.querySelector('input[name="role"]:checked').value);
        console.log(credentials);
        post(credentials);
    }
}

async function post(credentials){
    const user = {
        firstname: credentials.get('firstname'),
        lastname:credentials.get('lastname'),
        email:credentials.get('email'),
        password:credentials.get('password'),
        role:credentials.get('role')
    }
    const response = await fetch('http://localhost:8080/api/v1/auth/register',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if(response.status == 200){
        window.location.href = "login.html"
    }
    else{
        window.location.href = "signup.html"
    }
}

function passwordsDoNotMatch(){
    document.getElementById('wrong').innerHTML = "Passwords Do NOT Match. Try Again";
    document.getElementById('login-btn').disabled = false;
    setTimeout(function(){
    document.getElementById("wrong").innerHTML=""}, 3000);
}
