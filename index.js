
window.onload = function() {
  const taskField = document.querySelector("#taskField");
  const addTaskBtn = document.querySelector("#addTaskBtn");
  const allTasksParent = document.querySelector("#allTasks");
  console.log(allTasksParent.offsetWidth);
  taskField.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
      createTask(allTasksParent, this.value);

      this.value = "";
    }
  });

  addTaskBtn.addEventListener("click", function() {
    createTask(allTasksParent, this.value);

    taskField.value = "";
  });
};

function createTask(parent, taskData) {
  const col = create({ class: "col-sm-3 py-4" });

  parent.appendChild(col);
  const singleTask = create({ class: "single-task d-flex" });

  col.appendChild(singleTask);

  const singleTaskp = create("p", { class: "single-taskp" });
  singleTaskp.innerText = taskData;
  singleTask.appendChild(singleTaskp);

  const span = create("span", { class: "ml-auto" });
  span.innerHTML = '<i class="far fa-times-circle"></i>';
  span.style.cursor = "pointer";
  span.addEventListener("click", function() {
    parent.removeChild(col);
  });
  singleTask.appendChild(span);

  createTaskController(singleTask);
}

function createTaskController(parent) {
  const color = [
    "#808080",
    "#D6394A",
    "#0F111A",
    "#476DFE",
    "#248D28",
    "#9B58B5",
    "E77E23"
  ];

  const colorDiv = create({
    class: "task-control-panel align-items-center d-flex "
  });

  color.forEach(color => {
    const colorCircle = create({ class: "color-circle ml-1" });

    colorCircle.style.background = color;

    colorDiv.appendChild(colorCircle);

    colorCircle.addEventListener("click", function(event) {
      parent.style.background = color;
    });
  });

  creteBtn(parent, colorDiv);

  parent.appendChild(colorDiv);

  colorDiv.style.visibility = "hidden";

  parent.onmouseenter = function() {
    colorDiv.style.visibility = "visible";
  };

  parent.onmouseleave = function() {
    colorDiv.style.visibility = "hidden";
  };
}

function creteBtn(parent, parent2) {
  const span = create("span", { class: "ml-auto mr-1 " });
  span.innerHTML = '<i class="far fa-edit"></i>';
  parent2.appendChild(span);

  span.addEventListener("click", function() {
    const p = parent.querySelector("p");

    const textAria = create("textarea", { class: "inner-textarea" });

    textAria.style.width = parent.offsetWidth + "px";
    textAria.style.height = parent.offsetHeight + "px";

    textAria.innerHTML = p.innerHTML;

    textAria.addEventListener("keypress", function(event) {
      if (event.keyCode === 13) {
        event.stopPropagation();

        if (this.value) {
          p.innerHTML = this.value;

          parent.removeChild(this);
        } else {
          alert("please enter any value");
        }
      }
    });

    parent.appendChild(textAria);
  });
}


window.create = function() {
  if (arguments.length === 0) {
    return document.createElement("div");
  }

  if (arguments.length === 1 && typeof arguments[0] != "object") {
    return document.createElement(arguments[0]);
  }

  var tag = arguments[0];
  var attr = arguments[1] || arguments[0];

  if (arguments.length === 1 && typeof arguments[0] === "object") {
    tag = "div";
  }

  var element = document.createElement(tag);

  for (var i in attr) {
    element.setAttribute(i, attr[i]);
  }

  return element;
};
