

const token = getCookie('Token');
if (token == null){
    window.location.href = 'login.html'
}

//username
const username = document.getElementById('username')
username.innerHTML= getCookie("Username");


displayList();
//Get List
async function getList(){
    var response = await fetch('http://localhost:8080/api/v1/employees/reimbursements', {
        method: 'GET',
        mode: 'cors',
        headers:{
            'Authorization': token,
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'chunked',
            'Keep-Alive': 'timeout=60',
            'Connection': 'keep-alive'
        }
    });
    if(response.status == 401){
        window.location.href = "managerList.html"
    }else if(response.status == 204){
        console.log("NO CONTENT")
    }
    return(response.json()) 
}
//Display List
async function displayList(){
    var json;
    try{
        json = await getList()
    }catch{
        return;
    }

    var a = '';
    for (let i = 0; i < json.length; i++){
        let date = new Date (json[i].submitTime)
        let shortDate = date.toLocaleDateString()        
    a +=`<tr>
            <th scope="row">${i + 1}</th>
            <td>${json[i].ticketId}</td>
            <td>${json[i].employee.firstname} ${json[i].employee.lastname}</td>
            <td> $${json[i].amount}</td>
            <td>${json[i].reimbursementType}</td>
            <td>${json[i].description}</td>
            <td>${json[i].reimbursementStatus}</td>
            <td>${shortDate}</td>
            <td>${json[i].resolveTime == null ? 'Not resloved yet' : shortDate}</td>
        </tr>`
    }

document.getElementById('list').innerHTML = a;
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