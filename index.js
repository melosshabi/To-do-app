var tasksArray = [];
let taskInputsArray = [];
let saveBtns = [];
let editBtns = [];
let deleteBtns = [];
window.addEventListener('load', ()=>{
    if(localStorage.length != 0){
        tasksArray = JSON.parse(localStorage.getItem('list'));
    }
        tasksArray.map((task, index) =>{
            index++;
            let newTaskDiv = document.createElement('div');
            let newBtnDiv = document.createElement('div');
            let newInput = document.createElement('input');
            let newSave = document.createElement('button');
            let newEdit = document.createElement('button');
            let newDelete = document.createElement('button');

            newTaskDiv.className = "task";
            newTaskDiv.setAttribute('name', `name${index}`)
            newInput.className = "task-input";
            newBtnDiv.className = "buttons-div";
            newInput.disabled = true;
            newInput.value = task;
            newInput.setAttribute('name', `name${index}`)
            newSave.className = "save";
            newSave.classList.add("disabled");
            newSave.innerText = "Save";
            newSave.disabled = true;
            newSave.setAttribute('name', `name${index}`)
            newEdit.className = "edit";
            newEdit.innerText = "Edit";
            newEdit.setAttribute('name', `name${index}`)
            newDelete.className = "delete";
            newDelete.innerText = "Delete";
            newDelete.setAttribute('name', `name${index}`)
            
            newTaskDiv.appendChild(newInput);
            newTaskDiv.appendChild(newBtnDiv);
            newBtnDiv.appendChild(newSave);
            newBtnDiv.appendChild(newEdit);
            newBtnDiv.appendChild(newDelete);
            
            tasksDiv.appendChild(newTaskDiv);

            index--;

            let taskInputs = document.getElementsByClassName('task-input')[index];
            let saveBtn = document.getElementsByClassName('save')[index];
            let editBtn = document.getElementsByClassName('edit')[index];
            let deleteBtn = document.getElementsByClassName('delete')[index];
            taskInputsArray.push(taskInputs);
            saveBtns.push(saveBtn);
            editBtns.push(editBtn);
            deleteBtns.push(deleteBtn);
           
        })
        let prevInputValue;
        editBtns.map((btn, index) =>{
            
            index++;
            btn.addEventListener('click', ()=>{
                let items = document.querySelectorAll(`[name="name${index}"]`);
                let input = items[1];
                let saveBtn = items[2];
                saveBtn.classList.toggle("disabled");
                saveBtn.disabled = false;
                input.disabled = false;
                prevInputValue = input.value;
            })
        })
        saveBtns.map((btn, index) =>{
            index++;
            btn.addEventListener('click', ()=>{
                let items = document.querySelectorAll(`[name="name${index}"]`);
                let input = items[1];
                btn.disabled = true;
                btn.classList.toggle("disabled");
                input.disabled = true;
                for(let i = 0; i < tasksArray.length; i++){
                    if(prevInputValue === tasksArray[i]){
                        tasksArray[i] = input.value;
                        localStorage.setItem('list', JSON.stringify(tasksArray));
                    }
                }
            })
        })
        deleteBtns.map((btn, index) =>{
            index++;
            btn.addEventListener('click', ()=>{
                let items = document.querySelectorAll(`[name="name${index}"]`);
                let div = items[0];
                let input = items[1];
                for(let i = 0; i < tasksArray.length; i++){
                    if(input.value === tasksArray[i]){
                        tasksArray.splice(i, 1);
                        localStorage.setItem('list', JSON.stringify(tasksArray));
                        div.remove();
                    }
                }
            })
        })
})

let userInput = document.getElementsByClassName('user-input')[0];
let addTask = document.getElementsByClassName('add-task')[0];
let tasksDiv = document.getElementsByClassName('tasks-div')[0];
let btnDiv = document.getElementsByClassName('buttons-div')[0];

addTask.addEventListener('click', ()=>{
    if(userInput.value == ""){
        alert("Please enter a task");
    }   
    else{
        if(tasksArray.length != 0){
            for(let i = 0; i < tasksArray.length; i++){
                if(userInput.value === tasksArray[i]){
                    alert("Task already exists");   
                }
            }
        }
            let newTaskValue = userInput.value;
            let newTaskDiv = document.createElement('div');
            let newBtnDiv = document.createElement('div');
            let newInput = document.createElement('input');
            let newSave = document.createElement('button');
            let newEdit = document.createElement('button');
            let newDelete = document.createElement('button');
                    
            tasksArray.push(userInput.value);
                    
            localStorage.setItem('list', JSON.stringify(tasksArray));
            newTaskDiv.className = "task";
            newTaskDiv.setAttribute('name', `name${tasksArray.length}`)
            newBtnDiv.className = "buttons-div";
            newInput.className = "task-input";
            newInput.value = newTaskValue;
            newInput.disabled = true;
            newInput.setAttribute('name', `name${tasksArray.length}`)
            newSave.className = "save";
            newSave.classList.add("disabled");
            newSave.innerText = "Save";
            newSave.setAttribute('name', `name${tasksArray.length}`)
            newEdit.className = "edit";
            newEdit.innerText = "Edit";
            newEdit.setAttribute('name', `name${tasksArray.length}`)
            newDelete.className = "delete";
            newDelete.innerText = "Delete";
            newDelete.setAttribute('name', `name${tasksArray.length}`)
                    
            newTaskDiv.appendChild(newInput);
            newTaskDiv.appendChild(newBtnDiv);
            newBtnDiv.appendChild(newSave);
            newBtnDiv.appendChild(newEdit);
            newBtnDiv.appendChild(newDelete);
                    
            tasksDiv.appendChild(newTaskDiv);
                    
            window.location.reload();
    }
})