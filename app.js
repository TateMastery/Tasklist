document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
  
    
    const loadTasks = () => {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };
  
 
    const saveTasks = () => {
      const tasks = [];
      document.querySelectorAll('#task-list li').forEach(taskItem => {
        tasks.push({
          text: taskItem.querySelector('span').textContent,
          completed: taskItem.classList.contains('completed'),
        });
      }); 
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToDOM = (taskText, completed = false) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">✖</button>
      `;
      if (completed) li.classList.add('completed');
  
  
      li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation(); 
        li.remove();
        saveTasks(); 
      });
  
     
      li.querySelector('span').addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
      });
  
      taskList.appendChild(li);
      saveTasks();
    };
  
    
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTaskToDOM(taskText);
        taskInput.value = '';
        taskInput.focus();
      }
    });

    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTaskBtn.click();
      }
    });
  
  
    loadTasks();
  });
  