const expensetitle = document.getElementById("expensetitle");
const expenseamount = document.getElementById("expenseamount");
const expensedate = document.getElementById("expensedate");
const expensecategory = document.getElementById("expensecategory");
const updatetitle = document.getElementById("updatetitle");
const updateamount = document.getElementById("updateamount");
const updatedate = document.getElementById("updatedate");
const updatecategory = document.getElementById("updatecategory");
const addexpensebtn = document.getElementById("addexpensebtn");
const currentUserforexpense = JSON.parse(localStorage.getItem("currentuser"));
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

// add expense button & create

addexpensebtn.addEventListener("click", () => {

    if (expensetitle.value === "" || expenseamount.value === "" || expensedate.value === "" || expensecategory.value === "") {
        popmsgshow("White", "red", "pls fill all expense details");
        return;
    }
    else {
        let userexpenses = {
            id: idgenerate(),

            title: expensetitle.value,

            amount: expenseamount.value,

            category: expensecategory.value,

            date: expensedate.value,

            createdAt: new Date(),

            updatedAt: null
        }

        let activityuser = {
            id: userexpenses.id,
            title: expensetitle.value,
            action: "Expense Added:",
            createdAt: new Date().toISOString()
        }
        currentUserforexpense.expenses.push(userexpenses);
        allregisterusers[userindex].expenses.push(userexpenses);
        allregisterusers[userindex].activities.push(activityuser);
        localStorage.setItem("currentuser", JSON.stringify(allregisterusers[userindex]));
        localStorage.setItem("registerusers", JSON.stringify(allregisterusers));
        renderexpenses(allregisterusers[userindex].expenses)
        popmsgshow("white", "green", "Expense Added Successfully !")
        expensetitle.value = "";
        expenseamount.value = "";
        expensedate.value = "";
        showingexpensesummary()
        document.getElementById("totaltransaction").innerText = allregisterusers[userindex].expenses.length;
    }

})


// Render Expenses
renderexpenses(allregisterusers[userindex].expenses)

function renderexpenses(data) {
    document.getElementById("allexpenses").innerHTML = "";
    if (data.length === 0) {

        document.getElementById("allexpenses").innerHTML = " No data Found !";
    }
    else {
        data.forEach((element, index) => {

            document.getElementById("allexpenses").innerHTML += `
        <div class="databox" >
                <h3>Title: ${element.title}
                
               
                ${element.category === "food"
                    ?
                    `<span style="color:green">: Food</span>`
                    :
                    element.category === "bill"
                        ?
                        `<span style="color:crimson">: Bills</span>`
                        :
                        element.category === "shopping"
                            ?
                            `<span style="color:chocolate">: Shopping</span>`
                            :
                              element.category === "travel"
                            ?
                            `<span style="color:brown">: Travel</span>`
                            :``
                }
                
                </h3>
                <h3>Amount: </h3>
                <p>${element.amount}</p>
                <h3>Date: </h3>
                <p>${element.date}</p>
                <h3>Category: </h3>
                <p>${element.category}</p>
                <div class="expensebtn">
                    <button class="editexpenses" data-index = ${index}>Edit</button>
                    <button class="deleteexpenses" data-index = ${index}>delete</button>
                </div>
            </div>
        `;
        });
    }
}
document.getElementById("searchexpense").addEventListener("input", () => {
    const searchvalue = document.getElementById("searchexpense").value;
    const filtereddata = allregisterusers[userindex].expenses.filter(expense => expense.title.toLowerCase().includes(searchvalue.toLowerCase()));
    renderexpenses(filtereddata);
})

// Showing Expense Summary
showingexpensesummary()
function showingexpensesummary() {
    document.getElementById("totaltransaction").innerText = `${allregisterusers[userindex].expenses.length}`;
    document.getElementById("totalexpenseamount").innerText = `Rs ${allregisterusers[userindex].expenses.reduce((total, expense) => Number(total) + Number(expense.amount), 0)}/-`
    highestdata();
}
function highestdata() {
    const high = allregisterusers[userindex].expenses.reduce((max, item) => {
        return Number(item.amount) > Number(max) ? item.amount : max;
    }, 0)
    document.getElementById("highexpenseamount").innerText = `Rs ${high}/-`
}

// delete and edit expense

let currentEditIndex = null;
document.getElementById("allexpenses").addEventListener("click", (event) => {
    const expenseindex = event.target.dataset.index;
    // if delete clicked
    if (event.target.classList.contains("deleteexpenses")) {
        popmsgshow("white", "red", "Expense Deleted !")
        const deletedexpensetitle = allregisterusers[userindex].expenses[expenseindex].title;
        let activityuser = {
            id: idgenerate(),
            title: deletedexpensetitle,
            action: "Expense Deleted:",
            createdAt: new Date().toISOString()
        }
        allregisterusers[userindex].activities.push(activityuser);
        allregisterusers[userindex].expenses.splice(expenseindex, 1);
        localStorage.setItem("currentuser", JSON.stringify(allregisterusers[userindex]));
        localStorage.setItem("registerusers", JSON.stringify(allregisterusers));
        renderexpenses(allregisterusers[userindex].expenses);
        showingexpensesummary();
    }
    // if edit clicked
    if (event.target.classList.contains("editexpenses")) {
        currentEditIndex = Number(expenseindex);
        updatetitle.value = allregisterusers[userindex].expenses[currentEditIndex].title;
        updateamount.value = allregisterusers[userindex].expenses[currentEditIndex].amount;
        updatedate.value = allregisterusers[userindex].expenses[currentEditIndex].date;
        updatecategory.value = allregisterusers[userindex].expenses[currentEditIndex].category;
        document.getElementById("updatecontainer").style.top = "0%";
        document.getElementById("updatecontainer").style.opacity = "1";
    }

});

// Clicked on update button
document.getElementById("updateexpense").addEventListener("click", () => {
    if (currentEditIndex === null) {
        return;
    }
    else {


        let activityuser = {
            id: idgenerate(),
            title: updatetitle.value,
            action: "Expense Updated:",
            createdAt: new Date().toISOString()
        }
        allregisterusers[userindex].expenses[currentEditIndex].title = updatetitle.value;
        allregisterusers[userindex].expenses[currentEditIndex].amount = updateamount.value;
        allregisterusers[userindex].expenses[currentEditIndex].date = updatedate.value;
        allregisterusers[userindex].expenses[currentEditIndex].category = updatecategory.value;
        allregisterusers[userindex].expenses[currentEditIndex].updatedAt = new Date();
        allregisterusers[userindex].activities.push(activityuser);
        localStorage.setItem("currentuser", JSON.stringify(allregisterusers[userindex]));
        localStorage.setItem("registerusers", JSON.stringify(allregisterusers));
        popmsgshow("white", "green", "Expense Updated !")
        renderexpenses(allregisterusers[userindex].expenses);
        showingexpensesummary();
        document.getElementById("updatecontainer").style.top = "-100%";
        document.getElementById("updatecontainer").style.opacity = "0";

    }

})

// Cancel Update
document.getElementById("cancelexpenseupdate").addEventListener("click", () => {
    document.getElementById("updatecontainer").style.top = "-100%";
    document.getElementById("updatecontainer").style.opacity = "0";

})


// Filter Buttons

document.getElementById("all").addEventListener("click", () => {
    renderexpenses(allregisterusers[userindex].expenses)
})

document.getElementById("food").addEventListener("click", () => {
    const filterdata = allregisterusers[userindex].expenses.filter(data => data.category === "food")
    renderexpenses(filterdata);
})


document.getElementById("bill").addEventListener("click", () => {
    const filterdata = allregisterusers[userindex].expenses.filter(data => data.category === "bill")
    renderexpenses(filterdata);
})

document.getElementById("travel").addEventListener("click", () => {
    const filterdata = allregisterusers[userindex].expenses.filter(data => data.category === "travel")
    renderexpenses(filterdata);
})

document.getElementById("shopping").addEventListener("click", () => {
    const filterdata = allregisterusers[userindex].expenses.filter(data => data.category === "shopping")
    renderexpenses(filterdata);
})

