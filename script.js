class ToDo {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    this.loadTasks();
  }

  loadTasks() {
    let html = this.tasks.reduce(
      (html, task, index) => html + this.generateTaskHtml(task, index),
      ""
    );
    document.getElementById("tasks").innerHTML = html;
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask() {
    const taskInput = document.getElementById("task");
    const newTask = {
      name: taskInput.value,
      isComplete: false,
    };

    this.tasks.push(newTask);
    this.loadTasks();
    taskInput.value = "";
  }

  toggleTaskStatus(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
    this.loadTasks();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.loadTasks();
  }

  generateTaskHtml(task, index) {
    return `
      <li>
        <input 
          id="toggleTaskStatus" 
          type="checkbox"
          onchange="todo.toggleTaskStatus(${index})"
          ${task.isComplete ? "checked" : ""} 
        />
        <span>${task.name}</span>
        <button
          id="deleteTask"
          data-id="${index}"
          onclick="todo.deleteTask(${index})"
        >delete</button>
      </li>
    `;
  }
}

let todo;

window.addEventListener("load", () => {
  todo = new ToDo();
});
