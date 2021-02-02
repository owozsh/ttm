//___LOAD SAVED CONTENT
let content = document.querySelector('body');
if (localStorage.getItem('content')) content.innerHTML = localStorage.getItem('content');

//___GLOBAL VALUES
let view = document.querySelector('.view');
let columns = document.querySelectorAll('.column');
let column_headers = document.querySelectorAll('.column_header');
let items = document.querySelectorAll('.item');

let selected_column = 0, selected_item = 0;

//___AUX
//---> creates an element with classes
const createElementExt = (element_type, classes) => {
    const element = document.createElement(element_type);
    element.classList.add(...classes);
    return element;
}

//---> update column's and item's lists
const updateLists = () => {
    view = document.querySelector('.view');
    columns = document.querySelectorAll('.column');
    column_headers = document.querySelectorAll('.column_header');
    items = document.querySelectorAll('.item');
}

//---> handle selection of columns/items
const select = (column, item) => {

    //---> column selector
    if (column < columns.length && column >= 0) {
        selected_column = column;
        column_headers.forEach(element => element.classList.remove('column_selected'));
        column_headers[selected_column].classList.add('column_selected');
    }

    //---> item selector
    let column_items;
    if (columns[selected_column]) {
        if (columns[selected_column].children.length == 1) items.forEach(element => element.classList.remove('item_selected'));
        if (item == 0) item++; // skip column's h2 child
        column_items = columns[selected_column].children; // creates a list with the selected column's items
        if (item < column_items.length && item > 0) {
            selected_item = item;
            items.forEach(element => element.classList.remove('item_selected'));
            column_items[selected_item].classList.add('item_selected');
        }
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

    //---> swap the selected item with the item below
    if (direction == 0 && selected_item + 1 < columns[selected_column].children.length) {
        columns[selected_column].children[selected_item + 1].parentNode.insertBefore(columns[selected_column].children[selected_item + 1], columns[selected_column].children[selected_item]);
        updateLists();
        select(selected_column, selected_item + 1);
    }

    //---> swap the selected item with the item above
    if (direction == 1 && selected_item - 1 > 0) {
        columns[selected_column].children[selected_item].parentNode.insertBefore(columns[selected_column].children[selected_item], columns[selected_column].children[selected_item - 1]);
        updateLists();
        select(selected_column, selected_item - 1);
    }
}

//___REMOVE
const removeItem = () => {
    if (columns[selected_column].children.length == 1) return; // stops the function if there is no item to remove

    columns[selected_column].removeChild(columns[selected_column].children[selected_item]);

    updateLists();
    select(selected_column, selected_item - 1);
}

const removeColumn = () => {
    if (columns.length == 0) return; // stops the function if there is no column to remove

    view.removeChild(columns[selected_column]);
    updateLists();
    select(selected_column, selected_item - 1);
}

updateLists();
select(0,0);

//___KEY BINDINGS
document.onkeyup = (event) => {
    switch (event.key) {
        case 'A': addItem(true); break; //--> New Scheduled Item
        case 'a': addItem(false); break; //--> New Item
        case 'n': addColumn(); break; //--> New Column
        case 'e': ; break; //--> Edit Item
        case 'd': removeItem(); break; //--> Delete Item
        case 'D': removeColumn(); break; //--> Delete Item
        case 'j': select(selected_column, selected_item + 1); break; //--> Item Down
        case 'k': select(selected_column, selected_item - 1); break; //--> Item Up
        case 'l': select(selected_column + 1, 0); break; //--> Column Right
        case 'h': select(selected_column - 1, 0); break; //--> Column Left
        case 'J': swap(0); break; //--> Move Item Down
        case 'K': swap(1); break; //--> Move Item Up
        case 'H': ; break; //--> Move Column Left
        case 'L': ; break; //--> Move Column Right
    }

    localStorage.setItem('content', content.innerHTML); //---> send the page's state to the Local Storage on every change
}