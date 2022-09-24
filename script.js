var formPanelEl = document.querySelector(".form-panel");
var formInputEl = document.querySelector(".input-field");
var todoListParentEl = document.querySelector(".todo-list");

//Empty fields
const emptyInputField = () => {
  formInputEl.value = "";
};

//Generate markup template
const todoItemTemplate = (data) => {
  const markup = ` 
    <li class="todo-list_item">
        <div class="todo-card">
            <div class="col-1">
                <p class="todo-body">
               ${data}
                </p>
            </div>

            <div class="col-2">
                <button class="btn">
                    <i class="fa-solid fa-xmark fa-2x"></i>
                </button>
            </div>
        </div>
    </li>
    
    `;

  return markup;
};

//Insert to DOM
function insertElementToDOM(element, parent) {
  parent.insertAdjacentHTML("afterbegin", element);
}

//Check local storage
const checkLocalStorage = () => {
  if (localStorage.getItem("todos")) {
    return JSON.parse(localStorage.getItem("todos"));
  } else {
    return [];
  }
};

const saveToLocalStorage = (arr) => {
  localStorage.setItem("todos", JSON.stringify(arr));
};

//Create new todo item
const createNewTodoItem = (todo) => {
  //check local storage
  const todos = checkLocalStorage();

  //Check input field
  if (formInputEl.value === "") {
    alert("Please fill out the input field with valid input!");
  } else {
    //Generate list item element
    const htmlEl = todoItemTemplate(todo);

    //Insert list item element to HTML
    insertElementToDOM(htmlEl, todoListParentEl);

    //Save to todos arr
    todos.push(todo);

    //Save todos arr to localstorage
    saveToLocalStorage(todos);
  }
};

///////// EVENT Handler /////////

//DOMContentLoad event
document.addEventListener("DOMContentLoaded", () => {
  //Check local storage
  const todos = checkLocalStorage();

  //Loop through todos
  todos.forEach(function (todo) {
    todoListParentEl.insertAdjacentHTML("afterbegin", todoItemTemplate(todo));
  });
});

//Listen for submit event
formPanelEl.addEventListener("submit", (e) => {
  e.preventDefault();

  createNewTodoItem(formInputEl.value);

  emptyInputField();
});

//Removing todo
todoListParentEl.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("btn") ||
    e.target.classList.contains("fa-xmark")
  ) {
    //Get todos arr from local storage
    const todos = checkLocalStorage();

    //Get List and List item element
    const parent = e.target.closest(".todo-list");
    const childEl = e.target.closest(".todo-list_item");
    const textContent = childEl.querySelector(".todo-body").textContent.trim();
    const index = todos.indexOf(textContent);

    //Remove List item from its parent
    parent.removeChild(childEl);

    //Delete the item from todos
    todos.splice(index, 1);

    //Save todos back to localstorage
    saveToLocalStorage(todos);
  }
});
