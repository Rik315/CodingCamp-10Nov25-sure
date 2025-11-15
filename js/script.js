const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAll");
const taskList = document.getElementById("taskList");

let tasks = [];

addBtn.addEventListener("click", () => {
    if (!taskInput.value || !dueDate.value) {
        alert("Please fill in the fields!");
        return;
    }

    tasks.push({
        name: taskInput.value,
        date: dueDate.value,
        status: "Pending"
    });

    taskInput.value = "";
    dueDate.value = "";

    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.name}</td>
            <td>${new Date(task.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
            <td><span class="status-badge ${task.status === "Pending" ? "pending" : "complete"}">${task.status}</span></td>
            <td>
                <button class="btn completeBtn" onclick="completeTask(${index})">Complete</button>
                <button class="btn deleteBtn" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;

        taskList.appendChild(row);
    });
}

function completeTask(index) {
    tasks[index].status = "Complete";
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        renderTasks();
    }
});