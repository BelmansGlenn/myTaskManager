// FRONT END FILE TO INTERACT WITH THE DOM
const btnTask = document.getElementById('btn-agregar');
const listContainer = document.getElementById('lista');
const btnDel = document.getElementById('btn-del');
const input = document.getElementById('tareaInput');



let i = 0;
btnTask.addEventListener('click', (e) => {
    e.preventDefault();
    
    i++;
    addTask({data:input.value});
    listContainer.insertAdjacentHTML("beforeend", `<li><a href="#" id="${i}">${input.value}</a><i class="far fa-times-circle"></i></li>` );
    input.value = "";
    const remFromList = document.querySelectorAll('i');
        remFromList.forEach((icon)=>{
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                let oneDel = e.target.previousSibling;
                let elDel = oneDel.innerHTML;
                deleteTask({input:elDel});
                oneDel.parentNode.remove();
                
            })
        })
        const b = document.getElementById(`${i}`);
        
        let coco = "0";
        
        b.addEventListener('click', (e) => {
            console.log(b.innerHTML);
            e.preventDefault();
            
            if(coco == "0"){
                b.classList.add('done');
                coco = "1";
            }else{
                b.classList.remove('done');
                
                coco = "0";
            }
            smallUpdate({data: b.innerHTML, bool:coco});
        })
        
            btnDel.addEventListener('click', (e) => {
              e.preventDefault();
              deleteTask({input:b.innerHTML});
              listContainer.remove();
          })
        });


        
    



const addTask = (infos) => {
    fetch('api/addtask', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infos),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const getTask = () => {
    fetch('api/gettask', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
       displayTask(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  getTask();


  const displayTask = (task) => {
      listContainer.innerHTML = "";
      task.allTask.forEach((id) => {
        console.log(id);
        let listCard = `
        <li><a href="#" id="${id.task_id}">${id.input}</a><i class="far fa-times-circle"></i></li>`
        listContainer.insertAdjacentHTML('beforeend', listCard);
        const idTask = document.getElementById(`${id.task_id}`);
        

        if(id.isDone == "1"){
          idTask.classList.add('done');
        }
      
        idTask.addEventListener('click', (e) => {
            console.log(task.allTask);
            e.preventDefault();
            //a.classList.toggle('done');
            if(id.isDone == "0"){
                idTask.classList.add('done');
                id.isDone = "1";
            }else{
                idTask.classList.remove('done');
                
                id.isDone = "0";
            }
            console.log(id.isDone);
            console.log(id.input)
            updateTask({isDone:id.isDone, task_id:id.task_id});
            })
            
            btnDel.addEventListener('click', (e) => {
              e.preventDefault();
              deleteTask({input:id.input});
              listContainer.remove();
          })

        })       
        
        
        
     
    
    
    const remFromList = document.querySelectorAll('i');
        remFromList.forEach((icon)=>{
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                let oneDel = e.target.previousSibling;
                let elDel = oneDel.innerHTML;
                deleteTask({input:elDel});
                
                oneDel.parentNode.remove();
                
            })
        })
        
       
  }


  const deleteTask = (task) => {
    fetch('api/remtask', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }

  const refresh = () => {
      window.location.reload();
  }

  const updateTask = (up) => {
    fetch('api/updatetask', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(up),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const smallUpdate = (su) => {
    fetch('api/update', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(su),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }