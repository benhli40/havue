document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  // Load existing tasks
  loadTasks();

  // Add task on button click
  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);
      taskInput.value = '';
    }
  });

  // Add task on Enter key
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTaskBtn.click();
    }
  });

  function addTask(text, isCompleted = false) {
    const li = document.createElement('li');
    li.classList.toggle('completed', isCompleted);

    const span = document.createElement('span');
    span.textContent = text;
    span.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks();
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.addEventListener('click', () => {
      li.remove();
      saveTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
      tasks.push({
        text: li.querySelector('span').textContent,
        completed: li.classList.contains('completed')
      });
    });
    localStorage.setItem('havue_tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('havue_tasks')) || [];
    saved.forEach(task => addTask(task.text, task.completed));
  }
});