//Model
import { Todo } from '../../model/Todo';
import { UUID } from '../../util/UUID';

//Util
export class TodoView {

    private id: string;
    private todo : Todo;
    
    constructor() {
        this.id = UUID.s4();
        this.todo = new Todo("", "");
    }
    
    private toggleState(): void {
        this.todo.done = !this.todo.done;
        this.setDoneDate();
    }

    private setDoneDate(): void {
        if (this.todo.done) {
            this.todo.doneDate = new Date();
        } else {
            this.todo.doneDate = undefined;
        }
    }
}