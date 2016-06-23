//Model
import { Todo } from '../../model/Todo';
import { CKHtmlModel } from '../../api/core/dom/CKHtmlModel';

//Util
export class TodoView {
    private todo : Todo;
    private htmlModel : CKHtmlModel;
    
    constructor(name : string, description : string) {
        this.todo = new Todo(name, description);
        let instance : TodoView = this;
        jQuery.get("src/view/todoview/TodoView.html", function (html) {
            instance.htmlModel = new CKHtmlModel("#todo-list", "#"+instance.todo.id,html, instance);
        });
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