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
        return this;
    }

    public openModal(onConfirm: (todo: Todo) => void, onDecline?: () => void, todo?: Todo, removing ?: boolean): void {
        this.onConfirm = onConfirm;
        this.onDecline = onDecline;
        this.todo = todo;
        if(!removing) {
            this.modalComponent.startEditing(todo);
        } else {
            this.modalComponent.startRemoving(todo);
        }
    }

    public setTodo(todo: Todo): void {
        if (this.onConfirm) {
            this.onConfirm(todo);
        }
    }

    public removeTodo(todo: Todo): void {
        if (this.onConfirm) {
            this.onConfirm(todo);
        }
    }
}