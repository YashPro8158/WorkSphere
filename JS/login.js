
const loginemail = document.getElementById("loginemail");
const login2faanswer = document.getElementById("login2faanswer");
const loginpassword = document.getElementById("loginpassword");
const allregisterusers = JSON.parse(localStorage.getItem('registerusers') || '[]');
const loginuserbtn = document.getElementById("loginuser");
const forgotbtn = document.getElementById("forgotbtn");
const foundusername = document.getElementById("foundusername");
const forgotpasswordnew = document.getElementById("forgotpasswordnew");
const changepassword = document.getElementById("changepassword");
const cancelforgot = document.getElementById("cancelforgot");

document.getElementById("loginform").addEventListener("submit", (event) => {
    event.preventDefault();
    if (loginemail.value.trim() === "" || loginpassword.value.trim() === "") {
        popmsgshow("white", "red", "pls fill both inputs !")
    }
    else {
        const userexist = allregisterusers.find(user => user.emailid.toLowerCase() === loginemail.value.toLowerCase() && user.password === loginpassword.value);
        if (userexist) {
            popmsgshow("white", "green", "Login success !");
            localStorage.setItem("currentuser", JSON.stringify(userexist));

            window.location.href = "index.html";
        }
        else {
            popmsgshow("white", "red", "invalid credentials")
        }
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

document.getElementById("registerbtn").addEventListener("click", () => {
    window.location.href = "signup.html";
})

forgotbtn.addEventListener("click", () => {
    if (loginemail.value.trim() === "") {
        popmsgshow("white", "red", "pls enter the email first !")
    }
    else {
        const userexistmail = allregisterusers.some(data => data.emailid === loginemail.value);
        if (userexistmail) {
            document.getElementById("forgotinputbox").style.display = "block";
            foundusername.innerText = loginemail.value;
        }
        else {
            popmsgshow("white", "red", "User Not Exist !")

        }
    }
})

changepassword.addEventListener("click", () => {
    findandchangeuserpassword();
})

function findandchangeuserpassword() {
    const existuseremail = allregisterusers.find(user => user.emailid.toLowerCase() === loginemail.value.toLowerCase());
    if (existuseremail) {
        const userexistindex = allregisterusers.findIndex(user => user.emailid.toLowerCase() === existuseremail.emailid.toLowerCase());
        if (existuseremail.twoFAaanswer.toLowerCase() === login2faanswer.value.toLowerCase()) {

            allregisterusers[userexistindex].password = forgotpasswordnew.value;
            localStorage.setItem("registerusers", JSON.stringify(allregisterusers));
            popmsgshow("white", "green", "Password changed & updated")
            document.getElementById("forgotinputbox").style.display = "none";
        }
        else {
            popmsgshow("white", "red", "2FA answer is wrong")
        }
    }
    else {
        console.log(`${loginemail.value} user not exist !`);

    }
}
cancelforgot.addEventListener("click", () => {
    document.getElementById("forgotinputbox").style.display = "none";
})