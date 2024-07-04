document.addEventListener('DOMContentLoaded', loadTasks);

function addTask(listId) {
    const input = document.getElementById(`${listId.split('-')[0]}-input`);
    const taskText = input.value.trim();
    if (taskText === '') return;

    const task = createTaskElement(taskText, false);
    const taskList = document.getElementById(listId);
    taskList.appendChild(task);

    input.value = '';
    saveTasks();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || { 'todo-list': [], 'doing-list': [], 'done-list': [] };

    for (const [listId, taskArray] of Object.entries(tasks)) {
        const taskList = document.getElementById(listId);
        taskArray.forEach(task => {
            const taskElement = createTaskElement(task.text, task.completed);
            taskList.appendChild(taskElement);
        });
    }

    makeSortable('todo-list');
    makeSortable('doing-list');
    makeSortable('done-list');
}


function createTaskElement(taskText, completed) {
    const task = document.createElement('div');
    task.className = 'task';
    if (completed) {
        task.classList.add('completed');
    }

    task.innerHTML = `
        <div class="handle">
            <input type="checkbox" ${completed ? 'checked' : ''}>
            <label style="margin-top:3px">${taskText}</label>
            <button class="remove">Remove</button>
        </div>
    `;

    const checkbox = task.querySelector('input[type="checkbox"]');
    checkbox.onchange = function () {
        task.classList.toggle('completed', checkbox.checked);
        saveTasks();
    };

    const removeButton = task.querySelector('.remove');
    removeButton.onclick = () => {
        task.remove();
        saveTasks();
    };

    return task;
}

function makeSortable(columnId) {
    const list = document.getElementById(columnId);
    Sortable.create(list, {
        group: 'tasks',
        animation: 150,
        onEnd: function (evt) {
            const itemEl = evt.item;
            const originList = evt.from;
            const destinationList = evt.to;

            if (destinationList.id === 'done-list') {
                itemEl.querySelector('input[type="checkbox"]').checked = true;
                itemEl.classList.add('completed');
            } else if (originList.id === 'done-list') {
                itemEl.querySelector('input[type="checkbox"]').checked = false;
                itemEl.classList.remove('completed');
            }
            saveTasks();
        }
    });
}

function saveTasks() {
    const lists = ['todo-list', 'doing-list', 'done-list'];
    const tasks = {};

    lists.forEach(listId => {
        const taskList = document.getElementById(listId);
        tasks[listId] = [];
        taskList.querySelectorAll('.task').forEach(task => {
            const taskText = task.querySelector('label').textContent;
            const completed = task.querySelector('input[type="checkbox"]').checked;
            tasks[listId].push({ text: taskText, completed });
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function deleteCompleted(listId) {
    const taskList = document.getElementById(listId);
    taskList.querySelectorAll('.task').forEach(task => {
        if (task.querySelector('input[type="checkbox"]').checked) {
            task.remove();
        }
    });
    saveTasks();
}