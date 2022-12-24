var tasksArray = [];
let taskInputsArray = [];
let saveBtns = [];
let editBtns = [];
let deleteBtns = [];
let markDoneBtns = [];

window.addEventListener('load', ()=>{
    if(localStorage.length != 0){
        tasksArray = JSON.parse(localStorage.getItem('list'));
    }
        tasksArray.map((task, index) =>{
            index++;
            let newTaskDiv = document.createElement('div');
            let newBtnDiv = document.createElement('div');
            let newInputDiv = document.createElement('div');
            let newInput = document.createElement('input');
            let newMarkDone = document.createElement('button');
            let newImg = document.createElement("img");
            let newSave = document.createElement('button');
            let newEdit = document.createElement('button');
            let newDelete = document.createElement('button');

            newTaskDiv.className = "task";
            newTaskDiv.setAttribute('name', `name${index}`);
            newInputDiv.className = "task-input-div";
            newInput.className = "task-input";
            newInput.disabled = true;
            newInput.value = task.userInput;
            newInput.setAttribute('name', `name${index}`);
            newImg.src = "check-solid.svg";
            newImg.className = 'check-mark-svg';
            newBtnDiv.className = "buttons-div";
            newSave.className = "save";
            newSave.classList.add("disabled");
            newSave.innerText = "Save";
            newSave.disabled = true;
            newSave.setAttribute('name', `name${index}`);
            newEdit.className = "edit";
            newEdit.innerText = "Edit";
            newEdit.setAttribute('name', `name${index}`);
            newDelete.className = "delete";
            newDelete.innerText = "Delete";
            newDelete.setAttribute('name', `name${index}`);
            newMarkDone.className = "mark-done";
            newMarkDone.appendChild(newImg);
            newMarkDone.setAttribute('name',`name=${index}`);
            
            newInputDiv.appendChild(newInput);
            newInputDiv.appendChild(newMarkDone);
            newTaskDiv.appendChild(newInputDiv);
            newTaskDiv.appendChild(newBtnDiv);
            newBtnDiv.appendChild(newSave);
            newBtnDiv.appendChild(newEdit);
            newBtnDiv.appendChild(newDelete);
            
            tasksDiv.appendChild(newTaskDiv);
            if(task.isDone){
                newInput.style.textDecoration = 'line-through';
                newInput.style.fontStyle = "italic";
                newInput.style.opacity = '0.2';
                newMarkDone.disabled = true;
                newMarkDone.classList.remove('mark-done');
                newMarkDone.classList.add('mark-done-disabled');
                newMarkDone.classList.add('mark-done');
                newEdit.disabled = true;
                newEdit.classList.toggle('disabled');
            }
            index--;

            let taskInputs = document.getElementsByClassName('task-input')[index];
            let saveBtn = document.getElementsByClassName('save')[index];
            let editBtn = document.getElementsByClassName('edit')[index];
            let deleteBtn = document.getElementsByClassName('delete')[index];
            let markDoneBtn = document.getElementsByClassName('mark-done')[index];
            taskInputsArray.push(taskInputs);
            saveBtns.push(saveBtn);
            editBtns.push(editBtn);
            deleteBtns.push(deleteBtn);
            markDoneBtns.push(markDoneBtn);
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
                    if(prevInputValue === tasksArray[i].userInput){
                        tasksArray[i].userInput = input.value;
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
                    if(input.value === tasksArray[i].userInput){
                        tasksArray.splice(i, 1);
                        localStorage.setItem('list', JSON.stringify(tasksArray));
                        div.remove();
                    }
                }
            })
        })
        markDoneBtns.map((btn, index) =>{
            index++;
            btn.addEventListener('click', ()=>{
                let nameElements = document.querySelectorAll(`[name="name${index}"]`);
                let input = nameElements[1];
                let editBtn = nameElements[3];
                console.log(nameElements)
                for(let i = 0; i < tasksArray.length; i++){
                    if(tasksArray[i].userInput == input.value){
                        console.log(true)
                        input.style.fontStyle = 'italic';
                        input.style.textDecoration = 'line-through';
                        tasksArray[i].isDone = true;
                        console.log(tasksArray)
                        localStorage.setItem('list', JSON.stringify(tasksArray));
                        btn.disabled = true;
                        btn.classList.add('disabled');
                        editBtn.disabled = true;
                        editBtn.classList.toggle('disabled')
                        input.style.opacity = '0.2';
                    }
                }
            })
        })
})

let userInput = document.getElementsByClassName('user-input')[0];
let addTask = document.getElementsByClassName('add-task')[0];
let tasksDiv = document.getElementsByClassName('tasks-div')[0];

userInput.addEventListener('submit', ()=>{
    console.log(true)
})

userInput.addEventListener('keydown', e =>{
    if(e.keyCode == 13){
        if(tasksArray.length != 0){
            for(let i = 0; i < tasksArray.length; i++){
                if(userInput.value === tasksArray[i].userInput){
                    alert("Task already exists");
                    exit();
                }
            }
        }           
            tasksArray.push({userInput:userInput.value, isDone:false});
            localStorage.setItem('list', JSON.stringify(tasksArray));
                    
            window.location.reload();
    }
})
addTask.addEventListener('click', ()=>{
    if(userInput.value == ""){
        alert("Please enter a task");
    }   
    else{
        if(tasksArray.length != 0){
            for(let i = 0; i < tasksArray.length; i++){
                if(userInput.value === tasksArray[i].userInput){
                    alert("Task already exists");
                    exit();
                }
            }
        }           
            tasksArray.push({userInput:userInput.value, isDone:false});
            localStorage.setItem('list', JSON.stringify(tasksArray));
                    
            window.location.reload();
    }
})