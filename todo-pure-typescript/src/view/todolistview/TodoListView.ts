//Model
import { Todo } from '../../model/Todo';

import { LocalStorageCrud } from '../../util/LocalStorageCrud';
export class TodoListView {

  private todos: Array<Todo>;

  constructor() {
      this.todos = new Array<Todo>();
  }

  initView(): void {
    LocalStorageCrud.instance.retrieveList().then((todos: Array<Todo>) => {
      this.todos = todos;
    }).catch((error) => {
      console.error(error);
    });
  }

  private get hasTodos(): boolean {
    return this.todos.length > 0;
  }

  private onTodoStatusChange(todo: Todo) {
    LocalStorageCrud.instance.save(todo).catch((error) => {
      console.error(error);
    });
  }

  private removeTodo(todo: Todo): void {
    LocalStorageCrud.instance.delete(todo).then(() => {
      this.todos.splice(this.todos.indexOf(todo), 1);
    }).catch((error) => {
      console.error(error);
    });
  }
}
