import { updateLocalStorage , getLocalStorage } from './../views/base.js';
import { addItemToView } from './../views/todoview.js';


export default class ToDoList {
    constructor(query){
       this.todoItems = [];
       this.query = query;
    }
}

ToDoList.prototype.getToDoItemsFromLocalStorage = function(){
    let items = getLocalStorage('todoitems');
    if(items){
        items= JSON.parse(items);
        return items
    }
    return []

}

ToDoList.prototype.updateToDoItemsToLocalStorage = function(){
    let items = this.getToDoItemsFromLocalStorage()

    updateLocalStorage('todoitems',this.todoItems)
}

ToDoList.prototype.addItemToList = function(item){
    this.todoItems.push(item);
    return item;
}

ToDoList.prototype.getItemByID = function(id){
    return this.todoItems.find(elem=>elem.id == id);
}

ToDoList.prototype.removeItem = function(id){
        let index = this.todoItems.indexOf(elem=>elem.id == id)
        this.todoItems.splice(index,1);
}