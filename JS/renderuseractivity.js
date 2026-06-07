const currentUserforactivity = JSON.parse(localStorage.getItem("currentuser"));
if (currentUserforactivity.activities.length > 50) {
    currentUserforactivity.activities.shift();
} else {
    renderuseractivity(currentUserforactivity.activities)
}

function renderuseractivity(data) {
    if (data.length === 0) {
        document.getElementById("recentactivity").innerHTML = "No Activity Found !";

    }
    else {
        const latestActivities = [...data].reverse();
        document.getElementById("recentactivity").innerHTML = "";
        latestActivities.forEach(element => {
            document.getElementById("recentactivity").innerHTML += `
         <div class="activity">
            <span>${element.action} </span> <span>${element.title}: </span> <span>${timeAgo(element.createdAt)} </span>
            </div>
        `
        });
    }
}


function timeAgo(dateString) {
    const now = new Date();
    const activityTime = new Date(dateString);

    const diffInSeconds =
        Math.floor((now - activityTime) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} sec ago`;
    }

    if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)} min ago`;
    }

    if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)} hrs ago`;
    }

    return `${Math.floor(diffInSeconds / 86400)} days ago`;
}