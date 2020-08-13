export const elements = {
        formElem: document.forms["todoForm"],
        todoItemContainer:document.querySelector('.todo_items'),
        todoneItemContainer:document.querySelector('.tododone_items'),
        addItem:document.querySelector('.add_item'),
        todoCreate:document.querySelector('.todo_create'),
        todoCancel:document.querySelector('.todo_cancel'),
        inputTitle:document.querySelector('.input_title'),
        inputDate:document.querySelector('.input_date'),
        querySearch:document.querySelector('.query_search'),
        sortBy:document.querySelector('.sort_by'),
        sortIcons:document.querySelectorAll('.sort_icon')
}

export const domString = {
        itemTitle:'item_title',
        itemDate:'item_date'
}       


export const  updateLocalStorage = function(key,value){
        localStorage.setItem(key,JSON.stringify(value))
}

export const getLocalStorage = function(key){
        return localStorage.getItem(key)
}

export const debounce = function(cb,timeout) {
        let timer;
        return function(event){
                clearTimeout(timer)
                let context = this;
                let args =arguments
                timer = setTimeout(function(){
                        cb.apply(context,args)
                }, timeout);
        }
}

export const removeSortClass = function(){
        let icons = Array.from(elements.sortIcons)
        icons.forEach(icon=>icon.classList.remove('black_color'))
}


export const addSortClass = function(event){
        event.target.classList.add('black_color')
    }

