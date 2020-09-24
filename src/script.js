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
      <li class="task">
        <span
          onclick="todo.toggleTaskStatus(${index})"
          style = "text-decoration:${task.isComplete ? "line-through" : ""};"
        >${task.name}</span>
        <button
          class="btn"
          id="deleteTask"
          data-id="${index}"
          onclick="todo.deleteTask(${index})"
        >x</button>
      </li>
    `;
  }
}

let todo;

window.addEventListener("load", () => {
  todo = new ToDo();
});
