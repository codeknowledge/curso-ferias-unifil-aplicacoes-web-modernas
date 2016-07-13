//Model
import { Todo } from '../../model/Todo';
//api
import { CKComponent } from '../../api/core/CKComponent';
//service
import { TodoModalService } from '../../service/TodoModalService';

export class ModalComponent extends CKComponent{
    private todo : Todo;
    private _modalId : string = "todoRegisterModal";
    private editing : boolean = false;
    private removing : boolean = false;

    private get reflectColor() : string {
        return this.removing ? "red" : 
            this.creating ? "green" : "blue";
    }

    private get reflectIcon() : string {
        return this.editing ? "check" : "plus";
    }

    private get creating() : boolean {
        return !this.editing && !this.removing;
    }
    public get modalId() : string {
        return this._modalId;
    }

    private testHidden(value : boolean) : string {
        return value ? "" : "hidden";
    }

    private get whenCreating() : string {
        return this.testHidden(this.creating);
    }

    private get whenEditing() : string {
        return this.testHidden(this.editing);
    }

    private get whenRemoving() : string {
        return this.testHidden(this.removing);
    }

    private get whenNotRemoving() : string {
        return this.testHidden(!this.removing);
    }

    constructor() {
        super("src/view/modal/ModalComponent.html", "#modalComponent");
    }

    public startEditing(todo ?: Todo) : void {
        if(todo) {
            this.editing = true;
            this.removing = false;
        }

        this.todo = todo ? todo : new Todo("", "");
        let instance : ModalComponent = this;

        if(this.htmlModel) {
            instance.applyScopeChange();
            jQuery("#" + this.modalId).modal("show");
        } else {
            this.createView().then(() => {
                jQuery("#" + this.modalId).modal({
                    onVisible : () => {
                        instance.applyScopeChange();
                    }
                }).modal("show");
            });
        }
    }

    public startRemoving(todo : Todo) {
        this.todo = todo;
        this.removing = true;
        this.editing = false;

        let instance : ModalComponent = this;

        if(this.htmlModel) {
            instance.applyScopeChange();
            jQuery("#" + this.modalId).modal("show");
        } else {
            this.createView().then(() => {
                jQuery("#" + this.modalId).modal({
                    onVisible : () => {
                        instance.applyScopeChange();
                    }
                }).modal("show");
            });
        }
    }

    private setTodoName(event : Event) {
        this.todo.name = event.currentTarget['value'];
    }

    private setTodoDescription(event : Event) {
        this.todo.description = event.currentTarget['value'];
    }

    private setDueDate(event : Event) {
        this.todo.dueDate = new Date(event.currentTarget['value']);
    }

    private setTodo() {
        TodoModalService.instance.setTodo(this.todo);
        this.clean();
    }

    private clean() {
        this.editing = false;
        this.removing = false;
    }

    private remove() {
        TodoModalService.instance.setTodo(this.todo);
        this.clean();
    }
}