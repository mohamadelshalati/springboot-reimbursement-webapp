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
    let response= await fetch('http://localhost:8080/api/v1/employees/manager/reimbursements', {
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
    if(response.status != 200){
        return;
    }
    return(response.json()) 
}

//Display List
async function displayList(){
    const list = await getList()
    let a = ''
        for (let i = 0; i < list.length; i++){
            let date = new Date (list[i].submitTime);
            let shortDate = date.toLocaleDateString();
            let date1 = new Date (list[i].resolveTime);
            let shortDate1 = date1.toLocaleDateString();
            let status; 
            if (list[i].reimbursementStatus == "APPROVED" || list[i].reimbursementStatus == "DENIED"){
                status = "RESOLVED"
            }
            else{
                status = `<a onclick="submitRes(${list[i].ticketId}, true)" style= "color:green; padding-left:10%; cursor:pointer"  ><i class="fas fa-check"></i></a>&nbsp;&nbsp;&nbsp<a onclick="submitRes(${list[i].ticketId}, false)" style= "color:red; cursor:pointer;"><i class="fas fa-times"></i></a>`
            }

        a +=`<tr>
                <th scope="row">${i + 1}</th>
                <td>${list[i].ticketId}</td>
                <td>${list[i].employee.firstname} ${list[i].employee.lastname}</td>
                <td> $${list[i].amount}</td>
                <td>${list[i].reimbursementType}</td>
                <td>${list[i].description}</td>
                <td>${list[i].reimbursementStatus}</td>
                <td>${shortDate}</td>
                <td>${list[i].resolveTime == null ? 'Not resloved yet' : shortDate1}</td>
                <td>${status}</td>
            </tr>`
        }

    document.getElementById('list').innerHTML = a;
}

//Logout
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
    window.location.href = 'login.html';
    setCookie("Token", null,1);
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

async function submitRes(id, approved){
    let response = await fetch(`http://localhost:8080/api/v1/employees/manager/reimbursements/resolve/${id}/${approved}`, {
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
    displayList();
}

document.getElementById('filter-select').addEventListener('change', filter);

async function filter(){
    const list = await getList()
    let selection = document.getElementById('filter-select').value;
    let a = '';
    if(selection == 1){
        let n = 0;
        for(let i = 0; i < list.length; i++){
                if (list[i].reimbursementStatus == "PENDING"){
                    for (let j = 0; j < 1 ; j++){
                        let date = new Date (list[i].submitTime);
                        let shortDate = date.toLocaleDateString();
                        let date1 = new Date (list[i].resolveTime);
                        let shortDate1 = date1.toLocaleDateString();
                        let status = `<a onclick="submitRes(${list[i].ticketId}, true)" style= "color:green; padding-left:10%; cursor:pointer"  ><i class="fas fa-check"></i></a>&nbsp;&nbsp;&nbsp<a onclick="submitRes(${list[i].ticketId}, false)" style= "color:red; cursor:pointer;"><i class="fas fa-times"></i></a>`;
                    a +=`<tr>
                        <th scope="row">${n += 1}</th>
                        <td>${list[i].ticketId}</td>
                        <td>${list[i].employee.firstname} ${list[i].employee.lastname}</td>
                        <td> $${list[i].amount}</td>
                        <td>${list[i].reimbursementType}</td>
                        <td>${list[i].description}</td>
                        <td>${list[i].reimbursementStatus}</td>
                        <td>${shortDate}</td>
                        <td>${list[i].resolveTime == null ? 'Not resloved yet' : shortDate1}</td>
                        <td>${status}</td>
                    </tr>`
                }       
            }
        }
    }
    else if (selection == 2){
        let n = 0;
        for(let i = 0; i < list.length; i++){
            if (list[i].reimbursementStatus == "APPROVED"){
                for (let j = 0; j < 1 ; j++){
                    let date = new Date (list[i].submitTime);
                    let shortDate = date.toLocaleDateString();
                    let date1 = new Date (list[i].resolveTime);
                    let shortDate1 = date1.toLocaleDateString();
                    let status = "RESOLVED";
                    
                a +=`<tr>
                        <th scope="row">${n += 1}</th>
                        <td>${list[i].ticketId}</td>
                        <td>${list[i].employee.firstname} ${list[i].employee.lastname}</td>
                        <td> $${list[i].amount}</td>
                        <td>${list[i].reimbursementType}</td>
                        <td>${list[i].description}</td>
                        <td>${list[i].reimbursementStatus}</td>
                        <td>${shortDate}</td>
                        <td>${list[i].resolveTime == null ? 'Not resloved yet' : shortDate1}</td>
                        <td>${status}</td>
                    </tr>`
                }
                
            }
        }
    }
    else if (selection == 3){
        let n = 0;
        for(let i = 0; i < list.length; i++){
            if (list[i].reimbursementStatus == "DENIED"){
                for (let j = 0; j < 1 ; j++){
                    let date = new Date (list[i].submitTime);
                    let shortDate = date.toLocaleDateString();
                    let date1 = new Date (list[i].resolveTime);
                    let shortDate1 = date1.toLocaleDateString();
                    let status = "RESOLVED"

                a +=`<tr>
                        <th scope="row">${n += 1}</th>
                        <td>${list[i].ticketId}</td>
                        <td>${list[i].employee.firstname} ${list[i].employee.lastname}</td>
                        <td> $${list[i].amount}</td>
                        <td>${list[i].reimbursementType}</td>
                        <td>${list[i].description}</td>
                        <td>${list[i].reimbursementStatus}</td>
                        <td>${shortDate}</td>
                        <td>${list[i].resolveTime == null ? 'Not resloved yet' : shortDate1}</td>
                        <td>${status}</td>
                    </tr>`
                }
            }
        }
    }
    else{
        for (let i = 0; i < list.length; i++){
            let date = new Date (list[i].submitTime);
            let shortDate = date.toLocaleDateString();
            let date1 = new Date (list[i].resolveTime);
            let shortDate1 = date1.toLocaleDateString();
            let status; 
            if (list[i].reimbursementStatus == "PENDING"){
                status = `<a onclick="submitRes(${list[i].ticketId}, true)" style= "color:green; padding-left:10%; cursor:pointer"  ><i class="fas fa-check"></i></a>&nbsp;&nbsp;&nbsp<a onclick="submitRes(${list[i].ticketId}, false)" style= "color:red; cursor:pointer;"><i class="fas fa-times"></i></a>`
            }
            else{
                status = "RESOLVED"
            }
        a +=`<tr>
                <th scope="row">${i + 1}</th>
                <td>${list[i].ticketId}</td>
                <td>${list[i].employee.firstname} ${list[i].employee.lastname}</td>
                <td> $${list[i].amount}</td>
                <td>${list[i].reimbursementType}</td>
                <td>${list[i].description}</td>
                <td>${list[i].reimbursementStatus}</td>
                <td>${shortDate}</td>
                <td>${list[i].resolveTime == null ? 'Not resloved yet' : shortDate1}</td>
                <td>${status}</td>
            </tr>`
        }
    }
    document.getElementById('list').innerHTML = a;
}