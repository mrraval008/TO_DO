import  { elements , domString } from './base.js'


const months = {
    0:'Jan',
    1:'Feb',
    2:'Mar',
    3:'Apr',
    4:'May',
    5:'Jun',
    6:'Jul',
    7:'Aug',
    8:'Sep',
    9:'Oct',
    10:'Nov',
    11:'Dec'
}

export const addItemToView = function(item){
        //prepare markup
        let markup = preparemarkup(item)

        //append to UI
        if(item.isDone){
            elements.todoneItemContainer.insertAdjacentHTML('beforeend',markup)
        }else{
            elements.todoItemContainer.insertAdjacentHTML('beforeend',markup)
        }
}

export const clearView = function(item){
    elements.todoneItemContainer.innerHTML = "";
    elements.todoItemContainer.innerHTML = "";
}

export const updateFormUI = function(item){
    if(state.currentUpdatingItem){
        elements.todoCreate.textContent = 'Update';
        elements.todoCancel.style.display = 'initial';
        elements.inputTitle.value = item.title;
        elements.inputDate.value = item.date;
    }else{
        elements.todoCreate.textContent = 'Create';
        elements.todoCancel.style.display = 'none';
        cleatrInputs()
    }
}

export const getInputValues = function(){
    let title = elements.inputTitle.value;
    let date = elements.inputDate.value;
    return {title,date}
}




export const UpdateItemUI = function(id,title,date){

    let nodeItem = document.querySelector(`#${id}`)

    if(nodeItem){
        nodeItem.querySelector(`.${domString.itemTitle}`).textContent = title;
        nodeItem.querySelector(`.${domString.itemDate}`).textContent = formatDate(date);
        
    }


}

export const cleatrInputs = function(){
    elements.inputTitle.value = "";
    elements.inputDate.value = "";
}

export const removeUIItem = function(itemId){
    let elem = document.querySelector(`#${itemId}`);
    elem.parentNode.removeChild(elem)
}

function preparemarkup(item){
    return `<div class="add_item" id="${item.isDone ? "done" : "todo"}-${item.id}">
     <span class="${domString.itemDate}">${formatDate(item.date)}</span>
     <span class="${domString.itemTitle}">${item.title}</span>
     <div class="item_valbtn">
             <i class="fa fa-pencil-square-o icon" id="edit" aria-hidden="true"></i>
             <i class="fa fa-trash-o icon" id="delete"  aria-hidden="true"></i>
             ${item.isDone ? '<i class="fa fa-undo icon" id="revert"  aria-hidden="true"></i>' : '<i class="fa fa-check icon" id="done"  aria-hidden="true"></i>'}
     </div>
</div>`  
}

function formatDate(date){
    let dt = new Date(date)
    return `${dt.getDate()} ${months[dt.getMonth()]}`
}
