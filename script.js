// submitButton = submitBtn

let submitButton = document.querySelector("#submitButton");

function setLocalStorage() {
    if(localStorage.getItem("userData"))
    {
        let showDiv = document.querySelector("#show");
        showDiv.innerHTML = ""
        let arr = JSON.parse(localStorage.getItem("userData"));

        arr.forEach((user, id) => {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "newData");

            let htmldata = 
                        `<span>${user.RollNo}</span>
                        <span>${user.name}</span>
                        <span>${user.fname}</span>
                        <span>${user.phoneNumber}</span>
                        <span>${user.email}</span>
                        <span>${user.DOB}</span>
                        <button onClick="onDelete(${id})">Delete</button>           
                        <button id = "btnEdit" onClick="onEdit(${id})">Edit</button>`;
                        
                        newDiv.insertAdjacentHTML("afterbegin", htmldata);
                        showDiv.insertAdjacentElement("afterbegin", newDiv)
        });
    }
    
}


setTimeout(()=>{
    setLocalStorage();
},2);

submitButton.addEventListener("click", (e)=>{
    var arr;
    if(!localStorage.getItem("userData")){arr=[]}
    else{arr = JSON.parse(localStorage.getItem("userData"))};

    if(!(arr instanceof Array)) {arr = []}

    let RollNo = document.querySelector("#RollNo").value;
    let name = document.querySelector("#name").value;
    let fname = document.querySelector("#fname").value;
    let phoneNumber = document.querySelector("#phoneNumber").value;
    let email = document.querySelector("#email").value;
    let DOB = document.querySelector("#DOB").value;


    var rollnoformate = /^[0-9]*$/
    var emailformate = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    var nameformate = /^[a-zA-Z]+$/
    var fnameformate = /^[a-zA-Z]+$/
    var PhoneNumberformat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    var DOBformat =/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/

    
    if(RollNo.lenght < 2) {
        alert("Please enter the full roll number");
    }
    
    else if(name.lenght <=2) {
        alert("Please enter the full name");
    }
    
    else if(fname.lenght <=2) {
        alert("Please enter the full father name");
    }
    else if(phoneNumber.lenght < 11) {
        alert("Please enter the full 11 digit phone number");
    }
    else if(email.lenght <= 0) {
        alert("Please enter the full email");
    }
    else if(DOB.lenght < 10) {
        alert("Please enter the data of birth");
    }
    else if(!(RollNo.match(rollnoformate))){alert("Please enter only numbers in your roll number")}
    else if(!(email.match(emailformate))){alert("Please enter @ in your email")}
    else if(!(name.match(nameformate))){alert("Please enter only alphabets in your name")}
    else if(!(fname.match(fnameformate))){alert("Please enter only alphabets in your father name")}
    else if(!(phoneNumber.match(PhoneNumberformat))){alert("Please enter only 11 numbers in your phone number")}
    else if(!(DOB.match(DOBformat))){alert("Please enter the correct formate of birth date e.g dd/mm/yyyy")}
    
    else if(RollNo.lenght > 0 && name.lenght > 0 && fname.length > 0 && phoneNumber > 0 && email.lenght > 0 && DOB.lenght > 0){

        let arrData = {
            RollNo:RollNo,
            name:name,
            fname:fname,
            phoneNumber:phoneNumber,
            email:email,
            DOB:DOB
        }

        arr.push(arrData);
        localStorage.setItem("userData", JSON.stringify(arr));
        setLocalStorage();
        alert("LocalStorage updated successfully...")
        location.reload();
    }

    else{alert("Enter something")}
})

function onDelete(id) {
    let arr = JSON.parse(localStorage.getItem("userData"))
    let deleteArr = [...arr];
    deleteArr.splice(id,1)
    arr = [...deleteArr]
    confirm("Are you sure You want to Delete this?")
    localStorage.setItem("UserData", JSON.stringify(arr))
    setLocalStorage()
    location();
    }

function onEdit(id) {
    if(typeof favDialog.showModal === "function"){
        favDialog.showModal();
    }

    let arr = JSON.parse(localStorage.getItem("userData"))
    let RollNo = document.querySelector("#RollNo").value = arr[id].RollNo;
    let name = document.querySelector("#name").value = arr[id].name;
    let fname = document.querySelector("#fname").value = arr[id].fname;
    let phoneNumber = document.querySelector("#phoneNumber").value = arr[id].phoneNumber;
    let email = document.querySelector("#email").value = arr[id].email;
    let DOB = document.querySelector("#DOB").value = arr[id].DOB;

    submitButton.setAttribute("disabled",true)

    let editBtn = document.createElement("button");
    let close = document.createElement("button");
    let form = document.querySelector("#form");
    let btnEdit = document.querySelectorAll("#btnEdit");
    editBtn.innerHTML = "Save";
    close.innerHTML= "Close";

    btnEdit.forEach((elements)=>{
        elements.setAttribute("disabled",true)
    })

    form.insertAdjacentElement("beforeend", editBtn)
    form.insertAdjacentElement("beforeend", close)

    editBtn.addEventListener("click", (e)=>{

        let newRollno = document.querySelector("#RollNo")
        let newname = document.querySelector("#name")
        let newfname = document.querySelector("#fname")
        let newphoneNumber = document.querySelector("#phoneNumber")
        let newemail = document.querySelector("#email")
        let newDOB = document.querySelector("#DOB")

        arr.splice(id,1,{RollNo:newRollno.value, name:newname.value, fname:newfname.value,phoneNumber:newphoneNumber.value, email:newemail.value, DOB:newDOB.value})
        localStorage.setItem("userData",JSON.stringify(arr))
        setLocalStorage();

        newRollno.value= ""
        newname.value= ""
        newfname.value= ""
        newphoneNumber.value= ""
        newemail.value= ""
        newDOB.value= ""

        form.removeChild(form.lastElementChild)
        submitButton.removeAttribute("disabled")
        location.reload();
    })
}

const updatedButton = document.getElementById("updateDetails");
const favDialog = document.getElementById("favDialog");
const outputBox = document.getElementById("output");
const selectEl = document.getElementById("select");
const confirmBtn = document.getElementById("#confirm");


if(typeof favDialog.showModal !== 'function'){
    favDialog.hidden = true;
}

updatedButton.addEventListener('click', ()=>{

    if(typeof favDialog.showModal === 'function'){
        favDialog.showModal();
    }
    else{
        outputBox.value = "Sorry, the <dialog> API is not supported by this browser.";
    }
});

favDialog.addEventListener("close", ()=>{
    outputBox.value = `${favDialog.returnvalue} button clicked - ${(new Date()).toString()}`;
});