const currentUserfortask = JSON.parse(localStorage.getItem("currentuser"));

const tasktitle = document.getElementById("tasktitle");
const taskdesc = document.getElementById("taskdesc");
const taskduedate = document.getElementById("taskduedate");
const taskpriority = document.getElementById("taskpriority");
const addtaskbtn = document.getElementById("addtaskbtn");
const updatetitle = document.getElementById("updatetitle");
const updatedesc = document.getElementById("updatedesc");
const updateduedate = document.getElementById("updateduedate");
const updatepriority = document.getElementById("updatepriority");
const alltaskbtn = document.getElementById("alltaskbtn");
const pendingtaskbtn = document.getElementById("pendingtaskbtn");
const comletedtaskbtn = document.getElementById("comletedtaskbtn");
// id generation
function idgenerate() {
    return Math.floor(Math.random() * (1000000 - 1 + 1))
}
// pop message show
function popmsgshow(txtcolor, bgcolor, textmsg) {
    document.getElementById("popmsg").style.right = "10%";
    document.getElementById("popmsg").style.background = bgcolor;
    document.getElementById("popmsg").style.color = txtcolor;
    document.getElementById("popmsg").innerText = textmsg;
    setTimeout(() => {
        document.getElementById("popmsg").style.right = "-100%";
    }, 2000);
}
document.getElementById("searchtask").addEventListener("input", () => {
    const searchvalue = document.getElementById("searchtask").value;
    const filtereddata = allregisterusers[userindex].tasks.filter(task => task.title.toLowerCase().includes(searchvalue.toLowerCase()));
    rendertask(filtereddata);
})
// Render task
rendertask(allregisterusers[userindex].tasks)

function rendertask(data) {
    document.getElementById("alltask").innerHTML = "";
    if (data.length === 0) {

        document.getElementById("alltask").innerHTML = " No data Found !";
    }
    else {
        data.forEach((element, index) => {

            document.getElementById("alltask").innerHTML += `
        <div class="databox" >
                <h3>Title: ${element.title} 
                ${element.status === "Completed"
                    ?
                    `<span class="statusclr" style="color:green">:Task Completed</span>`
                    :
                    `<span class="statusclr" style="color:red">:Task Pending</span>`
                }
                </h3>
                <h3>Description: </h3>
                <p>${element.description}</p>
                <h3>Due Date: </h3>
                <p>${element.dueDate}</p>
                <h3>Priority Level: </h3>
                <p>${element.priority}</p>
                <div class="taskbtn">
                    <button class="edittask" data-index = ${index}>Edit</button>
                    <button class="deletetask" data-index = ${index}>delete</button>
                      ${element.status === "Completed"
                    ?
                    `<button class="markpendingtaskbtn" data-index="${index}">
                        Mark Pending
                    </button>`
                    :
                    `<button class="completedtaskbtn" data-index="${index}">
                        Mark Completed
                    </button>`
                }
                </div>
            </div>
        `;
        });
    }
}
// Add Task Logic
addtaskbtn.addEventListener("click", () => {
    if (!tasktitle.value.trim() || !taskdesc.value.trim() || taskduedate.value === "" || taskpriority.value === "") {
        popmsgshow("white", "red", "Please fill all task fields");
        return;
    }
    else {
        let usertask = {
            id: idgenerate(),

            title: tasktitle.value,

            description: taskdesc.value,

            status: "pending",

            priority: taskpriority.value,

            dueDate: taskduedate.value,

            createdAt: new Date(),

            updatedAt: null
        }
        let activityuser = {
            id: usertask.id,
            title: tasktitle.value,
            action: "Task Created:",
            createdAt: new Date().toISOString()
        }
        currentUserfortask.tasks.push(usertask);
        allregisterusers[userindex].tasks.push(usertask);
        allregisterusers[userindex].activities.push(activityuser);
        localStorage.setItem("registerusers", JSON.stringify(allregisterusers));
        rendertask(allregisterusers[userindex].tasks)
        popmsgshow("white", "green", "Task Created Successfully !")
        taskdesc.value = "";
        tasktitle.value = "";
        taskduedate.value = "";
        taskpriority.value = "";
    }
})


let currentEditIndex = null;
document.getElementById("alltask").addEventListener("click", (event) => {
    const taskindex = event.target.dataset.index;
    if (event.target.classList.contains("deletetask")) {
        popmsgshow("white", "red", "Task Deleted !")
        const deletedtasktitle = allregisterusers[userindex].tasks[taskindex].title;
        let activityuser = {
            id: idgenerate(),
            title: deletedtasktitle,
            action: "Task Deleted:",
            createdAt: new Date().toISOString()
        }
        allregisterusers[userindex].activities.push(activityuser);
        allregisterusers[userindex].tasks.splice(taskindex, 1);
        localStorage.setItem("currentuser", JSON.stringify(allregisterusers[userindex]));
        localStorage.setItem("registerusers", JSON.stringify(allregisterusers));
        rendertask(allregisterusers[userindex].tasks)
    }
    if (event.target.classList.contains("edittask")) {
        currentEditIndex = Number(taskindex);
        updatetitle.value = allregisterusers[userindex].tasks[currentEditIndex].title;
        updatedesc.value = allregisterusers[userindex].tasks[currentEditIndex].description;
        updateduedate.value = allregisterusers[userindex].tasks[currentEditIndex].dueDate;
        updatepriority.value = allregisterusers[userindex].tasks[currentEditIndex].priority;
        document.getElementById("updatecontainer").style.top = "0%";
        document.getElementById("updatecontainer").style.opacity = "1";
    }
    if (event.target.classList.contains("completedtaskbtn")) {
        let activityuser = {
            id: idgenerate(),
            title: allregisterusers[userindex].tasks[taskindex].title,
            action: "Task Marked Completed:",
            createdAt: new Date().toISOString()
        }
        allregisterusers[userindex].activities.push(activityuser);
        allregisterusers[userindex].tasks[taskindex].status = "Completed";
        localStorage.setItem("currentuser", JSON.stringify(allregisterusers[userindex]));
        localStorage.setItem("registerusers", JSON.stringify(allregisterusers));
        popmsgshow("white", "green", "Task Marked Complete !")
        rendertask(allregisterusers[userindex].tasks)
    }

    if (event.target.classList.contains("markpendingtaskbtn")) {
        let activityuser = {
            id: idgenerate(),
            title: allregisterusers[userindex].tasks[taskindex].title,
            action: "Task Marked Pending:",
            createdAt: new Date().toISOString()
        }
        allregisterusers[userindex].activities.push(activityuser);
        allregisterusers[userindex].tasks[taskindex].status = "pending";
        localStorage.setItem("currentuser", JSON.stringify(allregisterusers[userindex]));
        localStorage.setItem("registerusers", JSON.stringify(allregisterusers));
        popmsgshow("white", "green", "Task Marked Pending !")
        rendertask(allregisterusers[userindex].tasks)
    }

});

document.getElementById("canceltaskupdate").addEventListener("click", () => {
    document.getElementById("updatecontainer").style.top = "-100%";
    document.getElementById("updatecontainer").style.opacity = "0";

})


document.getElementById("updateusertask").addEventListener("click", () => {
    if (currentEditIndex === null) {
        return;
    }
    else {


        let activityuser = {
            id: idgenerate(),
            title: updatetitle.value,
            action: "Task Updated:",
            createdAt: new Date().toISOString()
        }
        allregisterusers[userindex].tasks[currentEditIndex].title = updatetitle.value;
        allregisterusers[userindex].tasks[currentEditIndex].description = updatedesc.value;
        allregisterusers[userindex].tasks[currentEditIndex].dueDate = updateduedate.value;
        allregisterusers[userindex].tasks[currentEditIndex].priority = updatepriority.value;
        allregisterusers[userindex].tasks[currentEditIndex].updatedAt = new Date();
        allregisterusers[userindex].activities.push(activityuser);
        localStorage.setItem("currentuser", JSON.stringify(allregisterusers[userindex]));
        localStorage.setItem("registerusers", JSON.stringify(allregisterusers));
        popmsgshow("white", "green", "Task Updated !")
        rendertask(allregisterusers[userindex].tasks);
        document.getElementById("updatecontainer").style.top = "-100%";
        document.getElementById("updatecontainer").style.opacity = "0";

    }

})

alltaskbtn.addEventListener("click", () => {
    rendertask(allregisterusers[userindex].tasks)
})

pendingtaskbtn.addEventListener("click", () => {
    const pendingtaskfilter = allregisterusers[userindex].tasks.filter(task => task.status === "pending")
    rendertask(pendingtaskfilter)
})

comletedtaskbtn.addEventListener("click", () => {
    const completetaskfilter = allregisterusers[userindex].tasks.filter(task => task.status === "Completed")
    rendertask(completetaskfilter)
})