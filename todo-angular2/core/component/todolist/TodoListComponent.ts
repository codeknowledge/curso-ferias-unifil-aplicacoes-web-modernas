//Angular2
import { Component, provide, ViewChild } from '@angular/core';

//Model
import { Todo } from '../../model/Todo';

//Component
import { TodoComponent } from '../todo/TodoComponent';
import { TodoRegister } from '../todoregister/TodoRegister';

//Controller
import { TodoController } from '../../controller/TodoController';

//Service
import { LocalStorageCrudService } from '../../service/LocalStorageCrudService';

//Util
import { ApplicationConfig } from '../../util/ApplicationConfig';

@Component({
  selector: 'todo-list',
  templateUrl: 'core/component/todolist/TodoListComponent.html',
  styleUrls: ['core/component/todolist/TodoListComponent.css'],
  directives: [TodoComponent, TodoRegister],
  providers: [
    provide(ApplicationConfig.CRUD_SERVICE_TOKEN, { useClass: LocalStorageCrudService }),
    provide(TodoController, { useClass: TodoController })
  ]
})
export class TodoListComponent {

  private todos: Array<Todo> = new Array<Todo>();

  @ViewChild(TodoRegister) todoRegister;

  constructor(
    private controller: TodoController
  ) {

  }

  ngAfterViewInit(): void {

    this.controller.retrieveList().then((todos: Array<Todo>) => {
      this.todos = todos;
    }).catch((error) => {
      console.error(error);
    });

  }

  private get hasTodos(): boolean {
    return this.todos.length > 0;
  }

  private onTodoStatusChange(todo: Todo) {
    this.controller.save(todo).catch((error) => {
      console.error(error);
    });
  }

  private editTodo(todo: Todo): void {
    this.todoRegister.editTodo(todo);
  }

  private removeTodo(todo: Todo): void {
    this.controller.delete(todo).then(() => {
      this.todos.splice(this.todos.indexOf(todo), 1);
    }).catch((error) => {
      console.error(error);
    });
  }

}
