'use strict'

let form = document.querySelector('.todo-control'),
    input = document.querySelector('.header-input'),
    buttonAdd = form.querySelector('#add'),

    todoList = document.getElementById('todo'),
    todoComplited = document.getElementById('completed'),

    // Буфер для LocalStorange / список дел
    todoData = load();

// Функция Рисовальщик - отрисовывает текущее состояние системы на страницу и навешивает слушатели событий: переключение статуса у задачи, удаление задачи
function render() {
  todoList.textContent = '';
  todoComplited.textContent = '';

  todoData = load();

  todoData.forEach(function(item, index) {
    let li = addElement(item.value);

    if (item.statusComplete) {
      todoComplited.append(li);
    }
    else {
      todoList.append(li);
    }

    // Обработчик Изменить статус Дела
    li.querySelector('.todo-complete').addEventListener('click', function() {
      todoData = toggleStatus(todoData, index);
      save(todoData);

      render();
    })

    // Обработчик Удалить Дело
    li.querySelector('.todo-remove').addEventListener('click', function() {
      todoData = removeTodo(todoData, index);
      save(todoData);

      render();
    })

  })
} // конец render

// Обработчик формы: пользователь в input либо нажал enter, либо нажал на "Плюс"
form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (input.value !== '') {
    
    // Добавить новое дело в список дел
    todoData = addTodo(todoData, input);

    // Залить новый список дел в localStorage
    save(todoData);
    
    input.value = '';
    //todoData.splice(0, todoData.lenght);
  }

  render();
  
}) // Конец обработчик формы


//Функция Добавить Дело
function addTodo(list, todo) {
  
  //Шаблон для Дела
  let newTodo = {
    value: todo.value,
    statusComplete: false
  };

  if (newTodo.value !== '') {
    list.push(newTodo);
  }
  
  return list;
}

//Функция Сохранить в хранилище localStorage
function save(list) {
  return localStorage.setItem('todo', JSON.stringify(list));
}

//Функция Загрузить список из хранилища
function load() {
  let data = JSON.parse(localStorage.getItem('todo'));
  if (!data) {
    data = [];
  }
  return data;
}

//Функция Удаления Дела
function removeTodo(list, index) {
  list.splice(index, 1);
  return list;
}

//Функция Переключить состояние
function toggleStatus(list, index) {
  list[index].statusComplete = !list[index].statusComplete;
  return list;
}

//Функция добавляет элемент на страницу
function addElement(element) {
  const li = document.createElement('li');
  
  li.classList.add('todo-item');
  li.innerHTML = '<span class="text-todo">' + element + '</span>' +
                  '<div class="todo-buttons">' +
                    '<button class="todo-remove"></button>' +
                    '<button class="todo-complete"></button>' +
                  '</div>';
  return li;
}

render();