document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    
    let currentTaskElement = null;

    // Verifica se é a primeira vez que o app está sendo carregado
    const isFirstVisit = window.sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer');
    if (isFirstVisit == 'false' || isFirstVisit == null) {
        // Define o tempo de exibição da splash screen em milissegundos
        const splashDuration = 3000;
        setTimeout(function() {
            document.getElementById('splash-screen').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            // Marca que o app já foi aberto pela primeira vez
            window.sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', 'false');
        }, splashDuration);
    } else {
        // Se não for a primeira visita, pula a splash screen
        document.getElementById('splash-screen').style.display = 'none';
    }

    // Carrega tarefas salvas do localStorage
    loadTasks();

    addTaskButton.addEventListener('click', function() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            newTaskInput.value = '';
        }
    });

    function addTask(text, isCompleted = false) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const taskSpan = document.createElement('span');
        taskSpan.textContent = text;
        if (isCompleted) {
            taskSpan.classList.add('completed');
        }
        li.appendChild(taskSpan);
        
        const buttonsDiv = document.createElement('div');

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-sm btn-warning me-2';
        editButton.textContent = 'Editar';
        editButton.setAttribute('data-bs-toggle', 'modal');
        editButton.setAttribute('data-bs-target', '#editTaskModal');
        editButton.addEventListener('click', function() {
            document.getElementById('edit-task-input').value = taskSpan.textContent;
            currentTaskElement = taskSpan;
        });
        buttonsDiv.appendChild(editButton);

        const completeButton = document.createElement('button');
        completeButton.className = 'btn btn-sm btn-success me-2';
        completeButton.textContent = 'Concluído';
        completeButton.addEventListener('click', function() {
            taskSpan.classList.toggle('completed');
            saveTasks();
        });
        buttonsDiv.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-sm btn-danger';
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks();
        });
        buttonsDiv.appendChild(deleteButton);

        li.appendChild(buttonsDiv);
        taskList.appendChild(li);

        saveTasks();
    }

    document.getElementById('save-task-edit').addEventListener('click', function() {
        const newText = document.getElementById('edit-task-input').value.trim();
        if (currentTaskElement && newText !== '') {
            currentTaskElement.textContent = newText;
            saveTasks();
            currentTaskElement = null;
            const editModal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
            editModal.hide(); // Fecha o modal corretamente
        }
    });

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(function(taskItem) {
            const taskText = taskItem.querySelector('span').textContent;
            const isCompleted = taskItem.querySelector('span').classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            addTask(task.text, task.completed);
        });
    }
});