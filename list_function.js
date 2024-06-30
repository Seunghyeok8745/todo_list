let addList = document.getElementById('add-todo');
let mainInput = document.getElementById('todo-input');
let toDoArray = [];
let tabs = document.querySelectorAll('.task-tabs .menu');
let mode = 'all';
let ongoingList = [];
let underLine = document.querySelector('.task-tabs .under-line');

addList.addEventListener('click', addToDo);
mainInput.addEventListener('focus', function () {
  mainInput.value = '';
});
mainInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addToDo();
  }
});
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}

tabs.forEach((menu) =>
  menu.addEventListener('click', (e) => horizontalIndicator(e))
);
function horizontalIndicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + 'px';
  underLine.style.width = e.currentTarget.offsetWidth + 'px';
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 'px';
}

console.log(tabs);

tabs.forEach((menu) => {
  menu.addEventListener('click', function () {
    tabs.forEach((tab) => tab.classList.remove('active'));
    this.classList.add('active');
  });
});

function changeActive(clickedMenu) {
  document.querySelectorAll('.menu').forEach((menu) => {
    menu.classList.remove('active');
  });

  clickedMenu.classList.add('active');
}

function addToDo() {
  let task = {
    id: randomIDGenerate(),
    taskInput: mainInput.value,
    isComplete: false,
  };
  toDoArray.push(task);
  mainInput.value = '';
  console.log(task);
  if (task.taskInput == '') {
    alert(`할일을 입력 해주세요!`);
    toDoArray.pop(task);
  }
  mode = 'all';
  render();
}

function render() {
  let list = [];
  if (mode === 'all') {
    list = toDoArray;
  } else if (mode === 'ongoing' || mode === 'done') {
    list = ongoingList;
  }

  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div id="task-list" class="transition">
  <div class="task-done">${list[i].taskInput}</div>
  <div class="button-container">
  <i class="fa-solid fa-rotate-left" id = "return" onclick="toggleComplete('${list[i].id}')"></i>
  <i class="fa-solid fa-x" id = "trash" onclick = "deleteToggle('${list[i].id}')"></i>
  </div>
  </div>`;
    } else {
      resultHTML += `<div id="task-list" class="transition2">
    <div class= "task-done2">${list[i].taskInput}</div>
    <div class="button-container">
    <i class="fa-solid fa-check" id = "check" onclick="toggleComplete('${list[i].id}')"></i>
    <i class="fa-solid fa-x" id = "trash" onclick = "deleteToggle('${list[i].id}')"></i>
    </div>
    </div>`;
    }
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < toDoArray.length; i++) {
    if (toDoArray[i].id == id) {
      toDoArray[i].isComplete = !toDoArray[i].isComplete;
      break;
    }
  }
  console.log(toDoArray);
  render();
}

function filter(event) {
  mode = event.target.id;
  ongoingList = [];
  if (mode === 'all') {
    render();
  } else if (mode === 'ongoing') {
    for (let i = 0; i < toDoArray.length; i++) {
      if (toDoArray[i].isComplete === false) {
        ongoingList.push(toDoArray[i]);
      }
    }
    render();
    console.log(ongoingList);
  } else if (mode === 'done') {
    for (let i = 0; i < toDoArray.length; i++) {
      if (toDoArray[i].isComplete === true) {
        ongoingList.push(toDoArray[i]);
      }
    }
    render();
  }
}
function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteToggle(id) {
  for (let i = 0; i < toDoArray.length; i++) {
    if (toDoArray[i].id == id) {
      toDoArray.splice(i, 1);
      break;
    }
  }
  if (mode === 'all') {
    render();
  } else if (mode === 'ongoing') {
    ongoingList = toDoArray.filter((item) => item.isComplete === false);
    render();
  } else if (mode === 'done') {
    ongoingList = toDoArray.filter((item) => item.isComplete === true);
    render();
  }
}
