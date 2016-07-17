//Model
import { Todo } from '../../model/Todo';
import { TodoComponent } from '../../view/todo/TodoComponent';
//api
import { CKComponent } from '../../api/core/CKComponent';
import { CKObject } from '../../api/core/CKObject';
//service
import { TodoModalService } from '../../service/TodoModalService';
import { TodoUpdaterService } from '../../service/TodoUpdaterService';


import { LocalStorageCrud } from '../../util/LocalStorageCrud';
export class TodoListView extends CKComponent {

	private todosRef: Array<Todo>;
    private openTodos : Array<Todo>;
    private closedTodos : Array<Todo>;
	private todoComps: Array<TodoComponent> = new Array<TodoComponent>();
    private timer : number;

	constructor() {
		super("src/view/todolist/TodoListView.html", "#mainContent");
		let instance: TodoListView = this;
        TodoUpdaterService.instance.register(this, this.applyScopeChange, 15000);

        moment.locale('en', {
            relativeTime : {
                future: "in %s",
                past:   "%s ago",
                s:  "seconds",
                m:  "a minute",
                mm: "%d minutes",
                h:  "an hour",
                hh: "%d hours",
                d:  "a day",
                dd: "%d days",
                M:  "a month",
                MM: "%d months",
                y:  "a year",
                yy: "%d years"
            }
        });

        moment.fn.fromDate = function (from : Date) {
            if (Math.abs(this.diff(from)) < 10000) { // 1000 milliseconds
                return 'just now';
            }
            return this.from(from);
        }
        
		this.initView().then(() => {
            this.createView().then(() => {
                TodoModalService.instance.createService(instance);
                instance.createTodos().then(() => {
                    TodoUpdaterService.instance.startTimer();
                });
            });
        });
    }

    private createTodos() : Promise<void>
    {
        let instance : TodoListView = this;
        return new Promise<void>((resolve, reject) =>
        {
            let promises : Array<Promise<TodoComponent>> = new Array<Promise<TodoComponent>>();

            instance.todosRef.forEach(todoResp => {
                let todo : Todo = new Todo(todoResp.name, todoResp.description);
                todo.createdAt = todoResp.createdAt ? new Date(<any>todoResp.createdAt) : null;
                todo.done = todoResp.done;
                todo.doneDate = todoResp.doneDate ? new Date(<any>todoResp.doneDate) : null;
                todo.id = todoResp.id;
                todo.updateDate = todoResp.updateDate ? new Date(<any>todoResp.updateDate) : null;
                todo.dueDate = todoResp.dueDate ? new Date(<any>todoResp.dueDate) : null;

                let todoComp : TodoComponent = new TodoComponent(todo);
                promises.push(todoComp.createView());
            });

            Promise.all(promises).then((results) => {
                instance.todoComps = <any> results;
                resolve();
            }).catch(error => {
                reject(error);
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
        TodoUpdaterService.instance.stopTimer();
        TodoModalService.instance.openModal((todo : Todo) => {
            console.info(`Confirmed !!!`);
            let todoComp : TodoComponent = new TodoComponent(todo);
            todoComp.createView().then(() => {
                instance.todoComps.push(todoComp);
                LocalStorageCrud.instance.create(todo);
            });
        }, () => {
            console.info("Declined");
        });
        console.log("Add todo called!!!");
    }

	private onTodoStatusChange(todo: Todo) {
        let instance : TodoListView = this;
        TodoUpdaterService.instance.stopTimer();
		LocalStorageCrud.instance.save(todo)
        .then(() =>
        {
            instance.applyScopeChange();
        })
        .catch((error) =>
        {
			console.error(error);
		});
	}

    public applyScopeChange() : void
    {
        this.todoComps.forEach(todoComp =>
        {
            todoComp.invoke("applyScopeChange");
        });

        super.applyScopeChange();
    }
}
