async function login(){
    // document.getElementById('login-btn').disabled = true;
    const email = (document.getElementById('email').value);
    const password = (document.getElementById('psw').value);
    const credentials = {
        email: email,
        password: password
    }
    const response = await fetch('http://localhost:8080/api/v1/auth/authenticate',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    if(response.status == 200){
        const jsonData = await response.json();
        token = jsonData.token
        setCookie("Token", "Bearer " + jsonData.token, 1)
        setCookie("Username", jsonData.username, 1)
        window.location.href = "list.html"
    }
    else{
        wrongC();
    }
}

function setCookie(name,value,days) {
    var expires = "";
    if (days > 0) {
        var date = new Date();
        date.setTime(date.getTime() + (30*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function wrongC(){
    document.getElementById('wrong').innerHTML = "Incurrect email or password!";
    setTimeout(function(){
    document.getElementById("wrong").innerHTML=""}, 3000);
};