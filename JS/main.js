
const currentUser = JSON.parse(localStorage.getItem("currentuser"));
const action = document.getElementById("actioncheck");
const loginbutton = document.getElementById("loginbtn");
const signupbutton = document.getElementById("signupbtn");
const notescount = document.getElementById("notescount");
const taskcount = document.getElementById("taskcount");
const expensescount = document.getElementById("expensescount");
const allregisterusers = JSON.parse(localStorage.getItem('registerusers') || '[]');
// finding the Current user index in all register user
let userindex = allregisterusers.findIndex(user => user.emailid.toLowerCase() === currentUser.emailid);

document.getElementById("logo").addEventListener("click", () => {

    window.location.href = "index.html";
})
if (currentUser) {
    // showing username on top
    document.getElementById("username").innerText = currentUser.username;
    // logout logic
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("currentuser");
        window.location.href = "login.html";
    })



}
else {
    window.location.href = "login.html";
}
document.getElementById("useraccount").addEventListener("click", () => {
    document.getElementById("menus").classList.toggle('activemenu')
})


document.getElementById("deletemenubtn").innerHTML = `

<button id="deleteaccount" data-index = ${userindex}>Delete Account</button>
`

document.getElementById("deleteaccount").addEventListener("click", () => {
    const confirmmsg = confirm("Your data will be delete permanently, are you sure to delete your account");
    console.log(confirmmsg);
    if (confirmmsg === true) {
        allregisterusers.splice(userindex, 1);
        localStorage.removeItem("currentuser");
        localStorage.setItem("registerusers", JSON.stringify(allregisterusers));
        popmsgshow("white", "red", "Account deleted ");
        setTimeout(() => {
            window.location.href = "login.html";
            return;
        }, 2200);
    }
    else {
        alert("Account deletion Canceled by user !")
    }
})

function popmsgshow(txtcolor, bgcolor, textmsg) {
    document.getElementById("popmsg").style.right = "10%";
    document.getElementById("popmsg").style.background = bgcolor;
    document.getElementById("popmsg").style.color = txtcolor;
    document.getElementById("popmsg").innerText = textmsg;
    setTimeout(() => {
        document.getElementById("popmsg").style.right = "-100%";
    }, 2000);
}