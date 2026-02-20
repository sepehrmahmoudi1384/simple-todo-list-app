
export default class TodoTask{
    constructor(taskTitle){
        this.id = Date.now();
        this.taskTitle = taskTitle;
        this.completed = false;
    }
}