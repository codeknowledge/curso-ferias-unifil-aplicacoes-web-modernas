import { Todo } from '../model/Todo';

export class TodoList {
    private list : Todo[];
    
     public insertTodo(todo : Todo) : void {
         this.list.push(todo);
     }
     
     public removeTodo(todo : Todo) : number {
         return 0;
     }
     
     public clear() : void {
         this.list = [];
     }
}