window.addEventListener('load', ()=>{
    let taskInput = document.getElementsByClassName('task-field')[0];
    let taskList = document.getElementsByClassName('tasks')[0];
    let addTask = document.getElementsByClassName('add-task')[0];
    let editBtn = document.getElementsByClassName('edit');
    let deleteBtn = document.getElementsByClassName('delete');

    let storageIndex = localStorage.length += 1;
    console.log(storageIndex);

    if(localStorage.length != 0){
        for(let i = 1; i <= localStorage.length; i++){
            var newTask = document.createElement('div');
            var newInput = document.createElement('input');
            var newBtnDiv = document.createElement('div');
            var newEdit = document.createElement('button');
            var newDelete = document.createElement('button');
           
            let taskValue = localStorage.getItem(`Task${i}`);

            newInput.value = taskValue;
            newInput.disabled = true;

            newBtnDiv.classList.add('btn-div');
            newBtnDiv.appendChild(newEdit);
            newBtnDiv.appendChild(newDelete);
            newEdit.textContent = "Edit";
            newEdit.classList.add("edit");
            newDelete.textContent = "Delete";
            newDelete.classList.add("delete");

            newTask.classList.add("task");
            newTask.appendChild(newInput);
            newTask.appendChild(newBtnDiv);

            taskList.appendChild(newTask);
    }
        let editBtns = [...editBtn];
        let deleteBtns = [...deleteBtn];

    editBtns.forEach(btn => {
        btn.addEventListener('click', ()=>{
            if(newInput.disabled == true){
                newInput.disabled = false;
                newEdit.textContent = "Save";
                var oldValue = newInput.value;
            }
            else if(newInput.disabled == false){
                newInput.disabled = true;
                newEdit.textContent = "Edit";
                
                console.log(oldValue);
                for(let i = 0; i<= localStorage.length; i++){
                    let storageValue = localStorage.getItem(localStorage.key(i));
                    
                    if(oldValue == storageValue){
                        console.log("lol")
                        localStorage.setItem(`Task${i}`, newInput.value)
                    }

                }
            }
        })
    });

    deleteBtns.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            for(let i = 1; i <= localStorage.length; i++){
                let storageValue = localStorage.getItem(`Task${i}`);
                if(newInput.value == storageValue){
                      newTask.remove();
                      localStorage.removeItem(`Task${i}`);
                      storageIndex = localStorage.length += 1;
                }
            }
        })
    });
           
    }
    
    addTask.addEventListener('click', ()=>{
        let newTask = document.createElement('div');
        let newInput = document.createElement('input');
        let newBtnDiv = document.createElement('div');
        let newEdit = document.createElement('button');
        let newDelete = document.createElement('button');

        if(taskInput.value == ""){
            alert("Please type in a task");
        }else{
            let newTaskValue = taskInput.value;

            newInput.value = newTaskValue;
            newInput.disabled = true;

            newBtnDiv.classList.add('btn-div');
            newBtnDiv.appendChild(newEdit);
            newBtnDiv.appendChild(newDelete);
            newEdit.textContent = "Edit";
            newEdit.classList.add("edit");
            newDelete.textContent = "Delete";
            newDelete.classList.add("delete");

            newTask.classList.add("task");
            newTask.appendChild(newInput);
            newTask.appendChild(newBtnDiv);

            taskList.appendChild(newTask);
            
            localStorage.setItem(`Task${storageIndex}`, newInput.value);
            storageIndex++;
            console.log(storageIndex)
        
            let editBtns = [...editBtn];
            let deleteBtns = [...deleteBtn];

            editBtns.forEach(btn => {
                btn.addEventListener('click', ()=>{
                    if(newInput.disabled == true){
                        newInput.disabled = false;
                        newEdit.textContent = "Save";
                    }
                    else if(newInput.disabled == false){
                        newInput.disabled = true;
                        newEdit.textContent = "Edit";
                    }
                })
            });

            deleteBtns.forEach(btn =>{
                btn.addEventListener('click', ()=>{
                    for(let i = 1; i <= localStorage.length; i++){
                        let storageValue = localStorage.getItem(`Task${i}`);
                        if(newInput.value == storageValue){
                              newTask.remove();
                              localStorage.removeItem(`Task${i}`);
                              storageIndex = localStorage.length += 1;
                        }
                    }
                })
            });

        }
                
       taskInput.value = "";
    })

})