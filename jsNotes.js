console.log("This is Magic Notes Website");
shownotes();
//If user adds a note add it to a local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    if ((addTxt.value != "") && (addTitle.value != "")) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        myObj = {
            name: addTxt.value,
            title: addTitle.value
        }
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        addTitle.value = "";
        // console.log(notesObj);
        shownotes();
    }
});

//Function to show elements from localStorage
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html = html + `
            <div class="notecard card my-1 mx-1" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.name}</p>
                    <button onclick="deleteNote(this.id)" id="${index}" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    });
    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show! Use "Add a Note" section above to ADD Notes.`;
    }
}

//Function to Delete a note 
function deleteNote(index) {
    // console.log(`I am Deleting this note`, index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}

//Function to Search a note 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    // console.log("Search Event Fired", inputVal);
    let notecard = document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        if ((cardTxt.includes(inputVal)) || (cardTitle.includes(inputVal))) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
})