//Model
import { Todo } from '../../model/Todo';
import { TodoComponent } from '../../view/todo/TodoComponent';
//api
import { CKComponent } from '../../api/core/CKComponent';
//service
import { TodoModalService } from '../../service/TodoModalService';


import { LocalStorageCrud } from '../../util/LocalStorageCrud';
export class TodoListView extends CKComponent {

	private todosRef: Array<Todo>;
	private todoComps: Array<TodoComponent> = new Array<TodoComponent>();

	constructor() {
		super("src/view/todolist/TodoListView.html", "#mainContent");
		let instance: TodoListView = this;
		this.initView().then(() => {
            this.createView().then(() => {
                TodoModalService.instance.createService(instance);
                instance.todosRef.forEach(todoResp => {
                    let todo : Todo = new Todo(todoResp.name, todoResp.description);
                    todo.creationDate = todoResp.creationDate ? new Date(<any>todoResp.creationDate) : null;
                    todo.done = todoResp.done;
                    todo.doneDate = todoResp.doneDate ? new Date(<any>todoResp.doneDate) : null;
                    todo.id = todoResp.id;
                    todo.updateDate = todoResp.updateDate ? new Date(<any>todoResp.updateDate) : null;

                    let todoComp : TodoComponent = new TodoComponent(todo);
                    todoComp.createView().then(() => {
                        instance.todoComps.push(todoComp);
                    });
                });
            });
        });
    }

	initView(): Promise<any> {
		let instance: TodoListView = this;
        return new Promise<any>((resolve, reject) => {
            LocalStorageCrud.instance.retrieveList().then((todos: Array<Todo>) => {
                instance.todosRef = todos;
                resolve();
            }).catch((error) => {
                reject(error);
                console.error(error);
            });
        });
	}

	private get hasTodos(): boolean {
		return this.todoComps.length > 0;
	}

    private addTodo() : void {
        let instance : TodoListView = this;
        TodoModalService.instance.openModal((todo : Todo) => {
            console.info(`Confirmed !!!`);
            let todoComp : TodoComponent = new TodoComponent(todo);
            todoComp.createView().then(() => {
                instance.todoComps.push(todoComp);
                LocalStorageCrud.instance.save(todo);
            });
        }, () => {
            console.info("Declined");
        });
        console.log("Add todo called!!!");
    }

	private onTodoStatusChange(todo: Todo) {
		LocalStorageCrud.instance.save(todo).catch((error) => {
			console.error(error);
		});
	}
}
