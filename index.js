const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header svg"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector(".editor"),
  addBtn = popupBox.querySelector(".btnText");

let copyText = document.querySelector("#copy-text");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  popupTitle.innerText = "Add a new Note";
  addBtn.innerText = "Add Note";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descTag.innerText = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});

addBtn.addEventListener("click", (e) => {
  console.log(addBtn, descTag.innerText, titleTag.value);
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.innerText.trim();
  if (title || description) {
    let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear();
    let noteInfo = { title, description, date: `${month} ${day}, ${year}` };
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
});

function showNotes() {
  if (!notes) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.forEach((note, id) => {
    let filterDesc = note.description.replaceAll("\n", "<br/>");
    let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <span onclick="showMenu(this)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
</svg>
</span>
                              
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>
Edit</li>
                                    <li onclick="deleteNote(${id})"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");

  // document.addEventListener("click", (e) => {
  //   console.log(elem, e.target.tagName);
  //   if (e.target.tagName != "span" || e.target != elem) {
  //     console.log(elem.parentElement)
  //     elem.parentElement.classList.remove("show");
  //   }
  // });
}

function updateNote(noteId, title, filterDesc) {
  let description = filterDesc.replaceAll("<br/>", "\r\n");
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  titleTag.value = title;
  descTag.innerText = description;
  popupTitle.innerText = "Update a Note";
  addBtn.innerText = "Update Note";
}

function deleteNote(noteId) {
  let confirmDel = confirm("are you sure you want to delete this");
  if (!confirmDel) return;
  notes.splice(noteId, 2);
  sessionStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}
copyText.addEventListener("click", () => {
  let input = descTag.innerText;

  navigator.clipboard.writeText(input);
  copyText.classList.add("active");
  window.getSelection().removeAllRanges();
  setTimeout(function () {
    copyText.classList.remove("active");
  }, 2500);
});

// Update srijoy

const editableEl = document.querySelector(".editable");
const boldEl = document.querySelector("#bold");
const italicEl = document.querySelector("#italic");
const underlineEl = document.querySelector("#underline");

function getSelectionText() {
  var text = "";
  const activeEl = document.activeElement;
  const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;

  if (window.getSelection) text = window.getSelection().toString();
  return text;
}

document.onmouseup =
  document.onkeyup =
  document.onselectionchange =
    function () {
      getSelectionText();
    };

function replaceSelectedText(replacementText, property) {
  var sel, range, newNode;

  switch (property) {
    case "bold":
      newNode = document.createElement("b");
      break;
    case "italic":
      newNode = document.createElement("i");
      break;
    case "underline":
      newNode = document.createElement("u");
      break;
  }

  if (window.getSelection) {
    sel = window.getSelection();
    newNode.appendChild(document.createTextNode(replacementText));
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (
        range.commonAncestorContainer.parentNode.tagName.toLowerCase() == "b" &&
        property == "bold"
      ) {
        const nodeText = range.commonAncestorContainer.textContent;
        range.commonAncestorContainer.parentNode.outerHTML = nodeText;
      } else {
        range.deleteContents();
        range.insertNode(newNode);
      }
    }
  }
}

const editData = (e) => {
  const text = getSelectionText();
  replaceSelectedText(text, e.target.id);
};

boldEl.addEventListener("click", editData);
italicEl.addEventListener("click", editData);
underlineEl.addEventListener("click", editData);
