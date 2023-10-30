document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const totalTasks = document.getElementById("totalTasks");
    const completedTasks = document.getElementById("completedTasks");

    let tasks = [];

    function updateTaskCount() {
        totalTasks.textContent = tasks.length;
        completedTasks.textContent = tasks.filter(task => task.completed).length;
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <label>
                    <input type="checkbox" ${task.completed ? "checked" : ""}>
                    ${task.text}
                </label>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);

            const checkbox = listItem.querySelector("input[type='checkbox']");
            checkbox.addEventListener("change", () => {
                tasks[index].completed = checkbox.checked;
                updateTaskCount();
            });

            const deleteButton = listItem.querySelector(".delete-button");
            deleteButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                renderTasks();
                updateTaskCount();
            });
        });

        updateTaskCount();
    }

    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            renderTasks();
            updateTaskCount();
        }
    });

    renderTasks();
});
