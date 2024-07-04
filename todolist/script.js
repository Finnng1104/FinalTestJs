document.addEventListener('DOMContentLoaded', loadTasks);

function addTask(listId) {
    const input = document.getElementById(`${listId.split('-')[0]}-input`);
    const taskText = input.value.trim();
    if (taskText === '') return;

    const task = createTaskElement(taskText, false);
    document.getElementById(listId).appendChild(task);

    input.value = '';
    saveTasks();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || { 'todo-list': [], 'doing-list': [], 'done-list': [] };

    Object.entries(tasks).forEach(([listId, taskArray]) => {
        const taskList = document.getElementById(listId);
        taskArray.forEach(task => {
            const taskElement = createTaskElement(task.text, task.completed);
            taskList.appendChild(taskElement);
        });
    });

    ['todo-list', 'doing-list', 'done-list'].forEach(makeSortable);
}

function createTaskElement(taskText, completed) {
    const task = document.createElement('div');
    task.className = `task${completed ? ' completed' : ''}`;
    task.innerHTML = `
        <div class="handle">
            <input type="checkbox" ${completed ? 'checked' : ''}>
            <label style="margin-top:3px">${taskText}</label>
            <button class="remove">Remove</button>
        </div>
    `;

    task.querySelector('input[type="checkbox"]').onchange = function () {
        task.classList.toggle('completed', this.checked);
        saveTasks();
    };

    task.querySelector('.remove').onclick = () => {
        task.remove();
        saveTasks();
    };

    return task;
}

function makeSortable(columnId) {
    Sortable.create(document.getElementById(columnId), {
        group: 'tasks',
        animation: 150,
        onEnd: function ({ item, from, to }) {
            item.querySelector('input[type="checkbox"]').checked = to.id === 'done-list';
            item.classList.toggle('completed', to.id === 'done-list');
            saveTasks();
        }
    });
}

function saveTasks() {
    const tasks = ['todo-list', 'doing-list', 'done-list'].reduce((acc, listId) => {
        acc[listId] = Array.from(document.getElementById(listId).querySelectorAll('.task')).map(task => ({
            text: task.querySelector('label').textContent,
            completed: task.querySelector('input[type="checkbox"]').checked
        }));
        return acc;
    }, {});

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteCompleted(listId) {
    document.getElementById(listId).querySelectorAll('.task').forEach(task => {
        if (task.querySelector('input[type="checkbox"]').checked) task.remove();
    });
    saveTasks();
}