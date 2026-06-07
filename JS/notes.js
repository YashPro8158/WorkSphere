const notetitle = document.getElementById("notetitle");
const notedesc = document.getElementById("notedesc");
const addnotebtn = document.getElementById("addnotebtn");
const updatetitle = document.getElementById("updatetitle");
const updatedesc = document.getElementById("updatedesc");
currentUser = JSON.parse(localStorage.getItem("currentuser"));

// Generate random id number 
rendernotes(currentUser.notes);
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
// Render notes

function rendernotes(data) {
    document.getElementById("allnotes").innerHTML = "";
    if (data.length === 0) {

        document.getElementById("allnotes").innerHTML = " No data Found !";
    }
    else {
        data.forEach((element, index) => {

            document.getElementById("allnotes").innerHTML += `
        <div class="databox" >
                <h3>Title: ${element.title}</h3>
                <h3>Description: </h3>
                <p>${element.description}</p>
                <div class="notesbtn">
                    <button class="editnote" data-index = ${index}>Edit</button>
                    <button class="deletenote" data-index = ${index}>delete</button>
                </div>
            </div>
        `;
        });
    }
}

// create notes logic
addnotebtn.addEventListener("click", () => {

    if (!notetitle.value.trim() || !notedesc.value.trim()) {
        popmsgshow("white", "red", "Please fill all note fields");
        return;
    }
    else {
        let usernotes = {
            id: idgenerate(),
            title: notetitle.value,
            description: notedesc.value,
            createdAt: new Date().toISOString(),
            updatedAt: null
        }
        allregisterusers[userindex].notes.push(usernotes);
        let activityuser = {
            id: idgenerate(),
            title: notetitle.value,
            action: "Note Create:",
            createdAt: usernotes.createdAt
        }
        allregisterusers[userindex].activities.push(activityuser);
        saveuserdata();
        rendernotes(allregisterusers[userindex].notes);
        popmsgshow("white", "green", `Notes Created Successfully !`)
        notetitle.value = "";
        notedesc.value = "";
    }
})

let currentEditIndex = null;
// delete note
document.getElementById("allnotes").addEventListener("click", (event) => {
    const noteindex = event.target.dataset.index;
    if (event.target.classList.contains("deletenote")) {
        popmsgshow("white", "red", "Note Deleted !")
        const deletedNotetitle = allregisterusers[userindex].notes[noteindex].title;
        let activityuser = {
            id: idgenerate(),
            title: deletedNotetitle,
            action: "Note Deleted:",
            createdAt: new Date().toISOString()
        }
        allregisterusers[userindex].notes.splice(noteindex, 1);
        allregisterusers[userindex].activities.push(activityuser);
        saveuserdata();
        rendernotes(allregisterusers[userindex].notes);
    }

    if (event.target.classList.contains("editnote")) {
        currentEditIndex = Number(noteindex);
        updatetitle.value = allregisterusers[userindex].notes[currentEditIndex].title;
        updatedesc.value = allregisterusers[userindex].notes[currentEditIndex].description;
        document.getElementById("updatenotecontainer").style.top = "10%";
        document.getElementById("updatenotecontainer").style.opacity = "1";

        // alert(`${noteindex} Edit note btn`);

    }
})

document.getElementById("searchnote").addEventListener("input", () => {
    const searchvalue = document.getElementById("searchnote").value;
    const filtereddata = allregisterusers[userindex].notes.filter(note => note.title.toLowerCase().includes(searchvalue.toLowerCase()));
    rendernotes(filtereddata);
})
document.getElementById("updateusernote").addEventListener("click", () => {
    if (currentEditIndex === null) {
        return;
    }
    else {


        // allregisterusers[userindex].notes[noteindex];
        let activityuser = {
            id: idgenerate(),
            title: updatetitle.value,
            action: "Note Updated:",
            createdAt: new Date().toISOString()
        }
        allregisterusers[userindex].notes[currentEditIndex].title = updatetitle.value;
        allregisterusers[userindex].notes[currentEditIndex].description = updatedesc.value;
        allregisterusers[userindex].notes[currentEditIndex].updatedAt = new Date();
        allregisterusers[userindex].activities.push(activityuser);
        saveuserdata();
        popmsgshow("white", "green", "Note Updated !")
        rendernotes(allregisterusers[userindex].notes);
        document.getElementById("updatenotecontainer").style.top = "-100%";
        document.getElementById("updatenotecontainer").style.opacity = "0";

    }

})

document.getElementById("cancelnoteupdate").addEventListener("click", () => {
    document.getElementById("updatenotecontainer").style.top = "-100%";
    document.getElementById("updatenotecontainer").style.opacity = "0";

})
function saveuserdata() {
    localStorage.setItem("currentuser", JSON.stringify(allregisterusers[userindex]));
    localStorage.setItem("registerusers", JSON.stringify(allregisterusers));
}