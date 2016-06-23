//Model
import { Todo } from '../../model/Todo';
import { UUID } from '../../util/UUID';
import { CKHtmlModel } from '../../api/core/dom/CKHtmlModel';

//Util
export class TodoView {

    private id: string;
    private todo : Todo;
    private htmlModel : CKHtmlModel;
    
    constructor(name : string, description : string) {
        this.id = UUID.s4();
        this.todo = new Todo(name, description);
        let instance : TodoView = this;
        jQuery.get("src/view/todoview/TodoView.html", function (html) {
            instance.htmlModel = new CKHtmlModel("body", html, instance);
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