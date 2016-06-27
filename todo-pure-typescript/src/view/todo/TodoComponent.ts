//Model
import { Todo } from '../../model/Todo';
//api
import { CKComponent } from '../../api/core/CKComponent';
import { LocalStorageCrud } from '../../util/LocalStorageCrud';

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
        console.log("Editing todo!!!");
    }

    private remove() : void {
        console.log("Removing Todo!!!");
    }

    private get hidden() : string {
        return this.todo.open ? "hidden" : "";
    }

    private get checked() : string {
        return this.todo.done ? "checked" : "";
    }
}