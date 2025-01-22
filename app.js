document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
  
    // Загрузка задач из Local Storage
    const loadTasks = () => {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };
  
    // Сохранение задач в Local Storage
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
  
    // Добавление задачи в DOM
    const addTaskToDOM = (taskText, completed = false) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">✖</button>
      `;
      if (completed) li.classList.add('completed');
  
      // Удаление задачи
      li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation(); // Предотвращаем переключение состояния completed
        li.remove(); // Удаляем элемент из DOM
        saveTasks(); // Обновляем Local Storage
      });
  
      // Переключение completed
      li.querySelector('span').addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
      });
  
      taskList.appendChild(li);
      saveTasks();
    };
  
    // Добавление новой задачи
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTaskToDOM(taskText);
        taskInput.value = '';
        taskInput.focus();
      }
    });
  
    // Добавление задачи по Enter
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTaskBtn.click();
      }
    });
  
    // Загрузка задач при старте
    loadTasks();
  });
  