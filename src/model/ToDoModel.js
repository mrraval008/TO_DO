
export default class ToDo {
    constructor(title,date,isDone=false){
        this.id = Math.random().toString(36).substr(2, 9)
        this.title = title;
        this.date = date;
        this.isDone = isDone;
    }
}

ToDo.prototype.markDone = function(){
    this.isDone = true;
}

ToDo.prototype.markUnDone = function(){
    this.isDone = false;
}

ToDo.prototype.updateItem = function(title,date){
    this.title = title;
    this.date = date;
}