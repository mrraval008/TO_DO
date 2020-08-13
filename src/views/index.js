import { elements ,updateLocalStorage,debounce,removeSortClass, addSortClass } from './base.js';
import * as todoView from './todoview.js';
import ToDo from './../model/ToDoModel.js';
import ToDoList from './../model/TodoListModel.js';

    window.state = {}
    initApp()
    function initApp() {
        state.ToDoList = new ToDoList()
        let items = state.ToDoList.getToDoItemsFromLocalStorage();
        if(items.length > 0){
            items.forEach(item=>{
                submitTodo(item)
            })
        }
        addEventListeners()
    }

    function addEventListeners() {

        elements.todoItemContainer.addEventListener('click', todoItemClick);
        elements.todoneItemContainer.addEventListener('click',todoItemClick);
        elements.todoCreate.addEventListener('click',function(event){
            submitTodo()
        });
        elements.todoCancel.addEventListener('click',cancelEventClick)
        let searchDebounce = debounce(onSearchInputChange,1000)
        elements.querySearch.addEventListener('keyup',searchDebounce);

        elements.sortBy.addEventListener('click',sortChanged);
        

    }
    function submitTodo(item) {
        
       let {title,date,isDone} = item ? item : todoView.getInputValues()
        if(!title || !date){
            alert('Please provide values...');
            return false;
        }
        if(state.currentUpdatingItem){
            let splittedId = state.currentUpdatingItem.split("-")
            let itemId = splittedId[1];
            let item = state.ToDoList.getItemByID(itemId)
            //update model
            item.updateItem(title,date);
    
            //update UI
            todoView.UpdateItemUI(state.currentUpdatingItem,item.title,item.date)

            state.currentUpdatingItem = null;

            todoView.updateFormUI()

            

        }else{
             //create todo
             let item = new ToDo(title, date,isDone);
             //update obj
             state.ToDoList.addItemToList(item)
             //update view
             todoView.addItemToView(item);

             //clear inputs
             todoView.cleatrInputs()
            
        }

        //update localstorage
        state.ToDoList.updateToDoItemsToLocalStorage()
    }

    function todoItemClick(event) {
        let item = event.target.parentNode.parentNode;
        let id = item.id;
        if (id) {
            let splittedId = id.split("-")
            let itemId = splittedId[1];
            let operation = event.target.id;
            let item = state.ToDoList.getItemByID(itemId)
            if (operation) {
                if (operation === 'edit') {
                    //update Mode
                    state.currentUpdatingItem = id;

                    //update UI
                    todoView.updateFormUI(item);

                    //update localstorage
                    state.ToDoList.updateToDoItemsToLocalStorage()


                } else if (operation === 'delete') {
                    //remove from Model
                    state.ToDoList.removeItem(itemId)

                    //remove from UI
                    todoView.removeUIItem(id);

                    //update localstorage
                    state.ToDoList.updateToDoItemsToLocalStorage()

                } else if (operation === 'revert') {
                    //update model
                    item.markUnDone();

                    //remove from done UI
                    todoView.removeUIItem(id);

                    //Add to todo UI
                    todoView.addItemToView(item);

                    //update localstorage
                    state.ToDoList.updateToDoItemsToLocalStorage()

                } else if (operation === 'done') {

                     //update model
                    item.markDone();

                    //remove from todo UI
                    todoView.removeUIItem(id);

                    //Add to Done UI
                    todoView.addItemToView(item);

                    //update localstorage
                    state.ToDoList.updateToDoItemsToLocalStorage()

                }

            }

        }

    }

    function cancelEventClick(){
        state.currentUpdatingItem = null;
        todoView.updateFormUI()
        todoView.updateFormUIButtons();
    }

    function onSearchInputChange(event){
            let query = event.target.value;
            let items = state.ToDoList.todoItems.slice(0);
            todoView.clearView();
            items = items.filter(item=> item.title.includes(query))
            
            if(items.length > 0){
                items.forEach(item=>{
                    todoView.addItemToView(item);
                })
            }else{

            }
    }

    function sortChanged(event){
        let items = state.ToDoList.todoItems.slice(0);
        if(items.length > 1){
            removeSortClass();
            addSortClass(event);
            let _sortData = event.target.getAttribute('data-sortby');
            let _sortDataSplit = _sortData.split('-');
            let _sortOrder = _sortDataSplit[1];
            let _sortBy = _sortDataSplit[0]
            todoView.clearView();
            items = items.sort((elem1,elem2)=> {
                var x = elem1[_sortBy].toLowerCase();
                var y = elem2[_sortBy].toLowerCase();
                if(_sortOrder == 'asc'){
                        return x < y ? -1 : x > y ? 1 : 0;
                }else{
                    return x < y ? 1 : x > y ? -1 : 0;
                }
            })
            items.forEach(item=>{
                todoView.addItemToView(item);
            })
        }        
    }

    

