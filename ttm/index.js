const view = document.querySelector('.view');
let columns = document.querySelectorAll('.column');
let column_headers = document.querySelectorAll('.column_header');
let items = document.querySelectorAll('.row');

let selected_column = 0;

//______AUX
const createElementExt = (element_type, classes) => {
    const element = document.createElement(element_type);
    element.classList.add(...classes);
    return element;
}

const select = (column, item) => {
    if (columns.length > 0 && column < columns.length && column >= 0) {
        selected_column = column;
        column_headers.forEach(element => element.classList.remove('selected'));
        column_headers[selected_column].classList.add('selected');
    }
    if (items[0]) {
        selected_item = item;
        items[selected_item].classList.add('selected');
    }
}

const update_lists = () => {
    columns = document.querySelectorAll('.column');
    column_headers = document.querySelectorAll('.column_header');
    items = document.querySelectorAll('.row');
}

//___ADD
const add_column = () => {
    const column = createElementExt('div', ['column']);
    view.appendChild(column);
    const column_header = createElementExt('h2', ['column_header']);
    column_header.textContent = prompt('Enter the new column\'s header');
    column.appendChild(column_header);
    update_lists();
    select(0, 0);
}

const add_item = (schedule) => {
    const item = createElementExt('div', ['item']);
    const content = prompt('Enter the new item\'s content');
    item.textContent = content;

    if (schedule == true) {
        item.classList.add('schedule');
        const schedule_element = createElementExt('span', ['time']);
        schedule_element.textContent = prompt('Enter the new item\'s schedule');
        item.prepend(schedule_element);
    }
    
    columns[selected_column].appendChild(item);
    update_lists();
}


document.onkeyup = (event) => {
    switch (event.key) {
        case 'A': add_item(true); break; //--> New Scheduled Item
        case 'a': add_item(false); break; //--> New Item
        case 'n': add_column(); break; //--> New Column
        case 'e': ; break; //--> Edit Item
        case 'x': ; break; //--> Delete Item
        case 'j': ; break; //--> Item Down
        case 'k': ; break; //--> Item Up
        case 'h': select(selected_column - 1, 0); break; //--> Column Left
        case 'l': select(selected_column + 1, 0); break; //--> Column Right
        case 'J': ; break; //--> Move Item Down
        case 'K': ; break; //--> Move Item Up
        case 'H': ; break; //--> Move Column Left
        case 'L': ; break; //--> Move Column Right
    }
}