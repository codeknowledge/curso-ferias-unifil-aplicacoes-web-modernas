//Model
import { Todo } from '../../model/Todo';
import { Project } from '../../model/Project';
import { Iteration } from '../../model/Iteration';
import { TodoComponent } from '../../view/todo/TodoComponent';
//api
import { CKComponent } from '../../api/core/CKComponent';
import { CKObject } from '../../api/core/CKObject';
//service
import { TodoModalService } from '../../service/TodoModalService';
import { TodoUpdaterService } from '../../service/TodoUpdaterService';
import { NavigationService } from '../../service/NavigationService';


import { LocalStorageCrud } from '../../util/LocalStorageCrud';
export class TodoListView extends CKComponent {
    private project : Project;
	private todosRef: Array<Todo> = [];
    private openTodos : Array<Todo>;
    private closedTodos : Array<Todo>;
	private todoComps: Array<TodoComponent> = new Array<TodoComponent>();
    private timer : number;

	constructor() {
		super("src/view/todolist/TodoListView.html", "#dashboard");
		let instance: TodoListView = this;
        TodoUpdaterService.instance.register(this, this.applyScopeChange);
        
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
                let todo : Todo = new Todo(todoResp.name, todoResp.description, todoResp.ownerId);
                todo.createdAt = todoResp.createdAt ? new Date(<any>todoResp.createdAt) : null;
                todo.done = todoResp.done;
                todo.doneDate = todoResp.doneDate ? new Date(<any>todoResp.doneDate) : null;
                todo.id = todoResp.id;
                todo.updateDate = todoResp.updateDate ? new Date(<any>todoResp.updateDate) : null;
                todo.dueDate = todoResp.dueDate ? new Date(<any>todoResp.dueDate) : null;
                instance.project.iterations[0].todoList.push(todo);

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
            let projectId = NavigationService.instance.params["projectId"];
            LocalStorageCrud.instance.retrieve(projectId).then((result : Project) => {
                instance.project = new Project(result.name, result.description);
                instance.project.id = result.id;
                instance.project.createdAt = result.createdAt;
                instance.project.doneDate = result.doneDate;
                instance.project.dueDate = result.dueDate;
                instance.project.iterations = [new Iteration(result.id)];
                instance.project.tags = result.tags;
                instance.project.updateDate = result.updateDate;

                instance.todosRef = result.iterations ? result.iterations[0].todoList || [] : [];
            })
            resolve();
        });
	}

	private get hasTodos(): boolean {
		return this.todoComps.length > 0;
	}

    private addTodo() : void {
        let instance : TodoListView = this;
        TodoUpdaterService.instance.stopTimer();
        TodoModalService.instance.openModal((todo : Todo) => {
            let todoComp : TodoComponent = new TodoComponent(todo);
            todoComp.createView().then(() => {
                instance.todoComps.push(todoComp);
                instance.project.iterations[0].todoList.push(todo);
                LocalStorageCrud.instance.save(instance.project);
            });
        });
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
