//Angular2
import { Component, provide } from '@angular/core';

//Model
import { Todo } from '../../model/Todo';

//Component
import { TodoComponent } from '../todo/TodoComponent';
import { TodoCreation } from '../todocreation/TodoCreation';

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
  directives: [TodoComponent, TodoCreation],
  providers: [
    provide(ApplicationConfig.CRUD_SERVICE_TOKEN, { useClass: LocalStorageCrudService }),
    provide(TodoController, { useClass: TodoController })
  ]
})
export class TodoListComponent {

  private todos: Array<Todo> = new Array<Todo>();

  constructor(
    private controller: TodoController
  ) {

  }

  ngAfterViewInit(): void {

    this.controller.retrieveList().then((todos: Array<Todo>) => {
      todos.sort((a: Todo, b: Todo) => {
        return a.order - b.order;
      });
      this.todos = todos;
      if (this.hasTodos) {
        setTimeout(() => {
          Materialize.showStaggeredList('todo');
        });
      }
    }).catch((error) => {
      //TODO: TRATAR ERRO
    });

  }

  private get hasTodos(): boolean {
    return this.todos.length > 0;
  }

  private onTodoStatusChange(todo: Todo) {
    this.controller.save(todo).catch((error) => {
      //TODO: TRATAR ERRO
    });
  }

}
