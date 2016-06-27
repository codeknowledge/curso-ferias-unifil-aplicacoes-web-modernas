//Model
import { Todo } from '../../model/Todo';
//api
import { CKComponent } from '../../api/core/CKComponent';
//service
import { TodoModalService } from '../../service/TodoModalService';

export class ModalComponent extends CKComponent{
    private todo : Todo;
    private _modalId : string = "todoRegisterModal";
    public get modalId() : string {
        return this._modalId;
    }
    constructor() {
        super("src/view/modal/ModalComponent.html", "#modalComponent");
    }

    public startEditing(todo ?: Todo) : void {
        if(todo) {
            this.todo = todo;
        } else {
            this.todo = new Todo("", "");
        }
    }

    private setTodoName(event : Event) {
        this.todo.name = event.currentTarget['value'];
    }

    private setTodoDescription(event : Event) {
        this.todo.description = event.currentTarget['value'];
    }

    private setTodo() {
        TodoModalService.instance.setTodo(this.todo);
    }
    
}