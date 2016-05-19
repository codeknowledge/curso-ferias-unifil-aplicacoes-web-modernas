import { Component } from '@angular/core';

import { TodoComponent } from '../todo/TodoComponent';
import { Todo } from '../../model/Todo';

@Component({
  selector: 'todo-list',
  templateUrl: 'app/src/core/component/todolist/TodoListComponent.html',
  directives: [TodoComponent]
})
export class TodoListComponent {

  private todos = new Array<Todo>();

  ngAfterViewInit(): void {


    for (let i = 0; i < 2; i++) {
      let todo = new Todo();
      todo.id = `${i}`;
      todo.creationDate = new Date();
      todo.name = `Todo ${i + 1}`;
      todo.description = `Description ${i + 1}`;
      todo.done = i % 2 ? true : false;
      this.todos.push(todo);
    }
    
      $(document).ready(function() {
        $('input[type="text"], textarea').characterCounter();
      });
        

  }

}
