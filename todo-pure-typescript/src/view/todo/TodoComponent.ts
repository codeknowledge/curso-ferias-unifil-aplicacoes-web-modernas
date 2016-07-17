//Model
import { Todo } from '../../model/Todo';
//api
import { CKComponent } from '../../api/core/CKComponent';
import { LocalStorageCrud } from '../../util/LocalStorageCrud';
//service
import { TodoModalService } from '../../service/TodoModalService';
import { TodoUpdaterService } from '../../service/TodoUpdaterService';

//Util
export class TodoComponent extends CKComponent{
    
    private get classes() : string {
        if(this.todo.done) {
            return "header name finished";
        } else {
            return "header name";
        }
    }

    constructor(private todo : Todo) {
        super("src/view/todo/TodoComponent.html", "#task-list");
    }
    
    private toggleState(): void {
        let instance : TodoComponent = this;
        this.toggleDoneDate();
        LocalStorageCrud.instance.save(this.todo).then(() => {            
            instance.applyScopeChange();
        });
    }

    private toggleDoneDate(): void {        
        if (this.todo.done)
            this.todo.doneDate = null;
        else
            this.todo.doneDate = new Date();

        this.todo.done = !this.todo.done;
    }

    private edit() : void {
        let instance : TodoComponent = this;
        TodoUpdaterService.instance.stopTimer();
        TodoModalService.instance.openModal((todo : Todo) => {
            instance.todo = todo;
            LocalStorageCrud.instance.save(instance.todo).then(() => {                
                instance.applyScopeChange();
                TodoUpdaterService.instance.startTimer();
            });
        }, () => {

        }, this.todo, false);
    }

    private remove() : void {
        let instance : TodoComponent = this;
        TodoUpdaterService.instance.stopTimer();
        let clonedTodo : Todo = this.todo.clone();
        if(clonedTodo.dueDate)
            clonedTodo.dueDate = new Date(clonedTodo.dueDate.toUTCString());
        
        TodoModalService.instance.openModal((todo : Todo) => {
            LocalStorageCrud.instance.delete(instance.todo).then(() => {
                instance.destroy();
                TodoUpdaterService.instance.startTimer();
            });
        }, () => {

        }, clonedTodo, true);
    }

    private get finished() : string {
        return this.todo.open ? "hidden" : "";
    }

    private get open() : string {
        return this.todo.done ? "hidden" : "";
    }

    private get edited() : string {
        return this.todo.updateDate ? "" : "hidden";
    }

    private get checked() : string {
        return this.todo.done ? "checked" : "";
    }

    private get theresDueDate() : string {
        return this.todo.dueDate ? "" : "hidden";
    }
}