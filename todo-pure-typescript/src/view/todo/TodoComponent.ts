//Model
import { Todo } from '../../model/Todo';
//api
import { CKComponent } from '../../api/core/CKComponent';
import { LocalStorageCrud } from '../../util/LocalStorageCrud';
//service
import { TodoModalService } from '../../service/TodoModalService';

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
        super("src/view/todo/TodoComponent.html", "#todo-list");
    }
    
    private toggleState(): void {
        this.todo.done = !this.todo.done;
        this.setDoneDate();
        console.log(this.todo.done ? "checked" : "unchecked");
        this.applyScopeChange();
        LocalStorageCrud.instance.save(this.todo);
    }

    private setDoneDate(): void {
        if (this.todo.done) {
            this.todo.doneDate = new Date();
        } else {
            this.todo.doneDate = undefined;
        }
    }

    private edit() : void {
        let instance : TodoComponent = this;
        TodoModalService.instance.openModal((todo : Todo) => {
            instance.todo = todo;
            instance.applyScopeChange();
            LocalStorageCrud.instance.save(instance.todo);
        }, () => {

        }, this.todo, false);
    }

    private remove() : void {
        let instance : TodoComponent = this;
        let clonedTodo : Todo = this.todo.clone();
        clonedTodo.dueDate = new Date(clonedTodo.dueDate.toUTCString());
        TodoModalService.instance.openModal((todo : Todo) => {
            LocalStorageCrud.instance.delete(instance.todo);
            this.destroy();
        }, () => {

        }, clonedTodo, true);
    }

    private get finished() : string {
        return this.todo.open ? "hidden" : "";
    }

    private get open() : string {
        return this.todo.done ? "hidden" : "";
    }

    private get checked() : string {
        return this.todo.done ? "checked" : "";
    }
}