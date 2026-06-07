let regusername = document.getElementById("regusername");
let regemailid = document.getElementById("regemail");
let reg2fachildhoodname = document.getElementById("reg2fachildhoodname");
let regpassword = document.getElementById("regpassword");
let regformsubmitbtn = document.getElementById("regformsubmitbtn");
const allregisterusers = JSON.parse(localStorage.getItem('registerusers') || '[]');
function idgenerate() {
    return Math.floor(Math.random() * (1000000 - 1 + 1))
}
regformsubmitbtn.addEventListener("click", () => {
    const existuser = allregisterusers.some(user => user.emailid === regemailid.value);

    if (regusername.value === "" || regemailid.value === "" || regpassword.value === "") {
        popmsgshow("white", "red", "please fill all the fields")
    }
    else {
        if (existuser) {
            popmsgshow("white", "red", `User: ${regusername.value} Already exist! , pls login `)
            return;
        }
        else {
            let users = {
                id: idgenerate(),
                username: regusername.value,
                emailid: regemailid.value,
                password: regpassword.value,
                twoFAaanswer: reg2fachildhoodname.value,
                createdAt: new Date().toISOString(),
                tasks: [],
                notes: [],
                expenses: [],
                activities: []
            }
            allregisterusers.push(users)
            console.log(allregisterusers);
            localStorage.setItem("registerusers", JSON.stringify(allregisterusers));
            popmsgshow("white", "green", `User: ${regusername.value} is registered Successfully ! Redirecting to login pls wait....`)
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);

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

document.getElementById("loginbtn").addEventListener("click", () => {
    window.location.href = "login.html";
})