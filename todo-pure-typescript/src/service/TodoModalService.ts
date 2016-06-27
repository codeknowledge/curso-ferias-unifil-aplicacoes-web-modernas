import { TodoListView } from '../view/todolist/TodoListView';
import { Todo } from '../model/Todo';
import { ModalComponent } from '../view/modal/ModalComponent';

export class TodoModalService {
    private static _instance: TodoModalService = null;
    private todoListView: TodoListView;
    private onConfirm: (todo: Todo) => void;
    private onDecline: () => void;
    private todo: Todo;
    private modalComponent: ModalComponent;

    public static get instance(): TodoModalService {
        if (TodoModalService._instance === null) {
            TodoModalService._instance = new TodoModalService();
        }

        return TodoModalService._instance;
    }

    constructor() {
        this.modalComponent = new ModalComponent();
    }

    public createService(todoListView: TodoListView): TodoModalService {
        this.todoListView = todoListView;
        let instance: TodoModalService = this;
        this.modalComponent.createView().then(() => {
            instance.configureService();
        });

        return this;
    }

    public openModal(onConfirm: (todo: Todo) => void, onDecline: () => void, todo?: Todo): void {
        this.onConfirm = onConfirm;
        this.onDecline = onDecline;
        this.todo = todo;

        if (this.todo) {
            jQuery("#" + this.modalComponent.modalId).modal("show");
        } else {
            jQuery("#" + this.modalComponent.modalId).modal("show");
        }

        this.modalComponent.startEditing(todo);

        console.log("open modal called >> ", this.modalComponent.modalId);
    }

    private editTodo(): void {

    }

    private configureService(): void {
        let instance: TodoModalService = this;
        jQuery("#" + this.modalComponent.modalId).modal({
            onDeny: () => {
                if (instance.onDecline) {
                    instance.onDecline();
                }
            }
        });
    }

    public setTodo(todo: Todo): void {
        if (this.onConfirm) {
            this.onConfirm(todo);
        }
    }
}