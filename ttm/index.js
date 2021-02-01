let content = document.querySelector('body');
if (localStorage.getItem('content')) content.innerHTML = localStorage.getItem('content');

const view = document.querySelector('.view');
let columns = document.querySelectorAll('.column');
let column_headers = document.querySelectorAll('.column_header');
let items = document.querySelectorAll('.item');

let selected_column = 0, selected_item = 0;

//______AUX
const createElementExt = (element_type, classes) => {
    const element = document.createElement(element_type);
    element.classList.add(...classes);
    return element;
}

const updateLists = () => {
    columns = document.querySelectorAll('.column');
    column_headers = document.querySelectorAll('.column_header');
    items = document.querySelectorAll('.item');
}

const select = (column, item) => {

    if (column < columns.length && column >= 0) {
        selected_column = column;
        column_headers.forEach(element => element.classList.remove('column_selected'));
        column_headers[selected_column].classList.add('column_selected');
    }

    if (item == 0) item++;
    const column_items = columns[selected_column].children;
    if (item < column_items.length && item > 0) {
        selected_item = item;
        items.forEach(element => element.classList.remove('item_selected'));
        column_items[selected_item].classList.add('item_selected');
    }
}

//___ADD
const addColumn = () => {
    const column = createElementExt('div', ['column']);
    view.appendChild(column);
    const column_header = createElementExt('h2', ['column_header']);
    column_header.textContent = prompt('Enter the new column\'s header');
    column.appendChild(column_header);

    updateLists();
    select(columns.length - 1, 0);
}

const addItem = (schedule) => {
    const item = createElementExt('div', ['item']);
    const content = prompt('Enter the new item\'s content');
    item.textContent = content;
    columns[selected_column].appendChild(item);

    if (schedule == true) {
        item.classList.add('schedule');
        const schedule_element = createElementExt('span', ['time']);
        schedule_element.textContent = prompt('Enter the new item\'s schedule');
        item.prepend(schedule_element);
    }

    updateLists();
    select(selected_column, columns[selected_column].children.length - 1);
}

//___MOVE ITEM
const swap = (direction) => {
    if (direction == 0 && selected_item + 1 < columns[selected_column].children.length) {
        columns[selected_column].children[selected_item + 1].parentNode.insertBefore(columns[selected_column].children[selected_item + 1], columns[selected_column].children[selected_item]);
        updateLists();
        select(selected_column, selected_item + 1);
    }

    if (direction == 1 && selected_item - 1 > 0) {
        columns[selected_column].children[selected_item].parentNode.insertBefore(columns[selected_column].children[selected_item], columns[selected_column].children[selected_item - 1]);
        updateLists();
        select(selected_column, selected_item - 1);
    }
}

//___REMOVE
const removeItem = () => {
    if (columns[selected_column].children.length == 1) return;

    columns[selected_column].removeChild(columns[selected_column].children[selected_item]);

    updateLists();
    select(selected_column, selected_item - 1);
}

document.onkeyup = (event) => {
    switch (event.key) {
        case 'A': addItem(true); break; //--> New Scheduled Item
        case 'a': addItem(false); break; //--> New Item
        case 'n': addColumn(); break; //--> New Column
        case 'e': ; break; //--> Edit Item
        case 'd': removeItem(); break; //--> Delete Item
        case 'j': select(selected_column, selected_item + 1); break; //--> Item Down
        case 'k': select(selected_column, selected_item - 1); break; //--> Item Up
        case 'l': select(selected_column + 1, 0); break; //--> Column Right
        case 'h': select(selected_column - 1, 0); break; //--> Column Left
        case 'J': swap(0); break; //--> Move Item Down
        case 'K': swap(1); break; //--> Move Item Up
        case 'H': ; break; //--> Move Column Left
        case 'L': ; break; //--> Move Column Right
    }

    localStorage.setItem('content', content.innerHTML);
}