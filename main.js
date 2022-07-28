const container = document.querySelector(".todos")
const input = document.querySelector(".input")
const ulElement = document.querySelector(".todos-list")
const btn = document.querySelector(".btn")
const btnMode = document.querySelector(".btn-mode")
const btnClear = document.querySelector(".btn-clear")
const body = document.querySelector('body');

const todos = JSON.parse(localStorage.getItem('todosArr'));

if(todos){
    todos.forEach(todo => {
        getTodo(todo);
    });
    
}

btnClear.style.visibility = 'hidden'


btnMode.addEventListener("click",function switchMode() {
    const initialText = 'Dark Mode';
    if (btnMode.textContent.toLowerCase().includes(initialText.toLowerCase())) {
    btnMode.textContent = 'Light Mode';
    document.documentElement.setAttribute('data-theme', 'dark');
    } else {
    btnMode.textContent = initialText;
    document.documentElement.setAttribute('data-theme', 'light');
    }
  });



function clearList(){
    ulElement.innerHTML = "";
    btnClear.style.visibility = 'hidden'
}


function getTodo(todo){
    let todoText = input.value;

    if(input.value) {
    const task = document.createElement("li");
    ulElement.appendChild(task);
    if (todo.completed) {
    task.classList.add('completed');
    };

    task.innerHTML = todoText;
    task.setAttribute("title","Double click to scratch off the task")

    task.addEventListener('dblclick',()=>{
        task.classList.toggle('completed');
        createLS();
    }); 

    task.addEventListener("contextmenu",(e)=>{
        e.preventDefault();
    })

    const divBtns = document.createElement('div'); 
    divBtns.setAttribute('contenteditable',false);
    ulElement.appendChild(divBtns);

    const btnEdit = document.createElement('button');
    const btnRemove = document.createElement('button');
    divBtns.appendChild(btnEdit);
    divBtns.appendChild(btnRemove);
    divBtns.classList.add("btn-list");
    btnRemove.classList.add("btn-remove");
    btnEdit.classList.add("btn-edit");
    btnRemove.innerHTML = `🗑`;
    btnEdit.innerHTML = `🖉`;
    btnEdit.setAttribute("title","Edit");
    btnRemove.setAttribute("title","Remove");

    btnClear.style.visibility = 'visible'

    btnClear.addEventListener("click", clearList)

    btnRemove.addEventListener('click',function removeTodo(){
        if(ulElement.children.length === 2){
            btnClear.style.visibility = 'hidden';
            task.remove();
            divBtns.remove();
        }else if(ulElement.children.length > 1){
            task.remove();
            divBtns.remove();
        }
    })
    btnEdit.addEventListener('click',function editTodo() {
        if(btnEdit.innerHTML === '🖉'){
            task.contentEditable = true;
            task.classList.toggle('completed',false);
            btnEdit.innerHTML = `🖫`
            task.focus();
        }else if(btnEdit.innerHTML === `🖫`){
            task.contentEditable = false;
            btnEdit.innerHTML = '🖉'
        }
    })
    input.value = "";
    input.focus();

    createLS();
    } 
}

btn.addEventListener("click",  getTodo)



function createLS(){
    const listTodos = document.querySelectorAll('li');

    const todosArr = [];

    listTodos.forEach(todo=>{
        todosArr.push({
            text: todo.innerHTML,
            completed: todo.classList.contains('completed')
        })
    });

    localStorage.setItem('todosArr',JSON.stringify(todosArr));
}
  


