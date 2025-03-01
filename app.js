document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todoInput");
  const addButton = document.getElementById("addButton");
  const todoList = document.getElementById("todoList");

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    todoList.innerHTML = "";

    const activeTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);

    const todosToRender = [...activeTodos, ...completedTodos];

    todosToRender.forEach((todo) => {
      const originalIndex = todos.indexOf(todo); // Get original index in main array
      const li = document.createElement("li");
      li.className = `todo-item ${todo.completed ? "completed" : ""}`;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => toggleTodo(originalIndex));

      const span = document.createElement("span");
      span.textContent = todo.text;

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-btn";
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.addEventListener("click", () => deleteTodo(originalIndex));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteButton);
      todoList.appendChild(li);
    });
  }

  function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
      todos.push({ text, completed: false });
      todoInput.value = "";
      saveTodos();
      renderTodos();
    }
  }

  function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
  }

  function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  }

  // Event listeners
  addButton.addEventListener("click", addTodo);
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });

  // Initial render
  renderTodos();
});

// Create and append blur overlay on page load
window.addEventListener("load", () => {
  const overlay = document.createElement("div");
  overlay.className = "blur-overlay";

  // Remove overlay after animation
  overlay.addEventListener("animationend", () => {
    overlay.remove();
  });

  document.body.appendChild(overlay);
});
