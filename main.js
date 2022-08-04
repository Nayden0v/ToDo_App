const domElements = {
    container:document.querySelector(".todos"),
    input:document.querySelector(".input"),
    ulElement:document.querySelector(".todos-list"),
    btnAdd:document.querySelector(".btn"),
    btnMode:document.querySelector(".btn-mode"),
    btnClear:document.querySelector(".btn-clear"),
    body:document.querySelector('body')
}

domElements.btnClear.style.visibility = "hidden"

const totalTasks = document.querySelector(".total-tasks span");
const completedTasks = document.querySelector(".completed-tasks span");
const remainingTasks = document.querySelector(".remaining-tasks span");



let todos = JSON.parse(localStorage.getItem("todos")) || [];
 
if (localStorage.getItem("todos")) {
    todos.map((todo) => {
    createTodo(todo);
  });
}


domElements.btnAdd.addEventListener('click', ()=>{
    let inputValue = domElements.input.value;
    console.log(inputValue);

    if (inputValue !== ""){
        const todo = {
            id: new Date().getTime().toString(),
            name: inputValue,
            completed: false
        };
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
         domElements.btnClear.style.visibility = "visible"
        createTodo(todo);

    }
   
    domElements.input.value = "";
    domElements.input.focus();
})

if(todos.length > 0){
    domElements.btnClear.style.visibility = "visible"
}

function createTodo(todo){
   const listEl = document.createElement('li');
   domElements.ulElement.appendChild(listEl);
   listEl.setAttribute('id', todo.id);
   listEl.setAttribute('title','Double click to scratch off the task')
   listEl.contentEditable = false;
   if (todo.completed) {
    listEl.classList.add('complete')};
   listEl.innerHTML = todo.name;

//    const btnEdit = document.createElement('button')
//    listEl.appendChild(btnEdit);
//    btnEdit.classList.add('edit-todo')
//    btnEdit.innerHTML = "Edit"
//    btnEdit.addEventListener('click',()=>{
//     if(btnEdit.innerHTML === "Edit"){
//         listEl.contentEditable = true;
//         btnEdit.innerHTML = "Save"
//     }else{
//         listEl.contentEditable = false;
//         btnEdit.innerHTML = "Edit"
//     }
//    })

   const btnRemove = document.createElement('button');
   listEl.appendChild(btnRemove);
   btnRemove.setAttribute('contenteditable', false)
   btnRemove.classList.add('remove-todo');
   btnRemove.setAttribute('title','Remove');
   btnRemove.innerHTML = '🗑'
countTodos();
}

function editTodo(){

}


domElements.ulElement.addEventListener('click',(e)=>{
    if(e.target.classList.contains('remove-todo')){
        const todoId = e.target.closest('li').id;
        removeTodo(todoId);
    }
    if(domElements.ulElement.children.length < 1){
        domElements.btnClear.style.visibility = "hidden"
    }
});

function removeTodo(todoId){
    todos = todos.filter((todo) => todo.id != parseInt(todoId));

    localStorage.setItem('todos', JSON.stringify(todos));

    document.getElementById(todoId).remove();
    
    countTodos();
}



domElements.ulElement.addEventListener('dblclick', (e) =>{
    e.target.classList.toggle('complete')
    const todoId = e.target.closest('li').id;
    updateTodo(todoId, e.target);
    
})


function updateTodo(todoId, el){
    const todo = todos.find((todo) => todo.id == parseInt(todoId));
    if (el.classList.contains('complete')) {
        todo.completed = !todo.completed
        }else{
            todo.completed = !todo.completed
        }
    
    localStorage.setItem('todos', JSON.stringify(todos));
    countTodos();
}




function countTodos(){
    totalTasks.textContent = todos.length;
    const completedTasksArr = todos.filter((todo)=>todo.completed === true);
    completedTasks.textContent = completedTasksArr.length;
    remainingTasks.textContent = todos.length - completedTasksArr.length;
}


domElements.btnClear.addEventListener('click', function clearTodoList(){
    domElements.ulElement.innerHTML = "";
    domElements.btnClear.style.visibility = 'hidden'
    todos = [];
    localStorage.clear();
    totalTasks.textContent = 0;
    completedTasks.textContent = 0;
    remainingTasks.textContent = 0;
});



domElements.btnMode.addEventListener("click",function switchMode() {
    const initialText = 'Dark Mode';
    if (domElements.btnMode.textContent.toLowerCase().includes(initialText.toLowerCase())) {
    domElements.btnMode.textContent = 'Light Mode';
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    } else {
     domElements.btnMode.textContent = initialText;
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    }
  });

  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        domElements.btnMode.textContent = "Light Mode";
    }
}
