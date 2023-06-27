const token = getCookie('Token')
if (token == null){
    window.location.href = 'login.html'
}
//username
const username = document.getElementById('username')
username.innerHTML= getCookie("Username");

async function submitForm(){
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('r-type').value;
    const description = document.getElementById('description').value;

    const form ={
        amount : amount,
        reimbursementType:  type,
        description: description
    }

    
    let response = await fetch('http://localhost:8080/api/v1/employees/reimbursement',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        },
        body: JSON.stringify(form)
    });

    if (response.status == 201){
        window.location.href = 'list.html'
    }
}

//LOGOUT
const logoutBtn = document.getElementById('log-btn')
logoutBtn.addEventListener('click', logout);

document.getElementById('log-btn').addEventListener('click', logout);

async function logout(){
    var response;
    try{
        response = await fetch('http://localhost:8080/api/v1/auth/logout', {
            method: 'POST',
            mode: 'cors',
            headers:{
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        });  
    }catch{

    }
    setCookie("Token", null,1);
    window.location.href = 'login.html'
}


//Set Cookies
function setCookie(name,value,days) {
    var expires = "";
    if (days > 0) {
        var date = new Date();
        date.setTime(date.getTime() + (30*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//Get Cookies
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}



