import { Component } from '@angular/core';

import { Todo } from '../../model/Todo';
import { TodoComponent } from '../todo/TodoComponent';
import { TodoCreation } from '../todocreation/TodoCreation';

@Component({
  selector: 'todo-list',
  templateUrl: 'core/component/todolist/TodoListComponent.html',
  styleUrls: ['core/component/todolist/TodoListComponent.css'],
  directives: [TodoComponent, TodoCreation]
})
export class TodoListComponent {

  private todos = new Array<Todo>();

  constructor(
  ) {

  }

  ngAfterViewInit(): void {


    for (let i = 0; i < 10; i++) {
      let todo = new Todo();
      todo.id = `${i}`;
      todo.creationDate = new Date();
      todo.name = `Todo ${i + 1}`;
      todo.description = `Description ${i + 1}`;
      todo.done = i % 2 ? true : false;
      if (todo.done) {
        todo.doneDate = new Date(1463796582);
      }
      this.todos.push(todo);
    }
    setTimeout(() => {
      Materialize.showStaggeredList('todo');
    });

  }

}
