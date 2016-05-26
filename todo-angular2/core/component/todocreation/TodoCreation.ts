//Angular2
import { Component, Input } from '@angular/core';

import { Todo } from '../../model/Todo';

//Controller
import { TodoController } from '../../controller/TodoController';

@Component({
    selector: 'todo-creation',
    templateUrl: 'core/component/todocreation/TodoCreation.html',
    styleUrls: ['core/component/todocreation/TodoCreation.css']
})
export class TodoCreation {

    @Input() todos: Array<Todo>;

    private todo: Todo = new Todo();
    private createMore: boolean = false;

    /**
     *
     */
    constructor(
        private controller: TodoController
    ) {

    }

    ngAfterViewInit(): void {
        jQuery('.modal-trigger').leanModal({
            dismissible: true,
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
        });
        jQuery('input[type="text"], textarea').characterCounter();
    }

    private submit(): void {
        this.controller.create(this.todo).then((todo: Todo) => {
            this.todos.push(todo);
            if (!this.createMore) {
                this.closeModal();
            }
            this.resetForm();
        }).catch((error) => {
            console.debug(JSON.stringify(error));
        });
    }

    private resetForm(): void {
        this.todo = new Todo();
    }

    private closeModal(): void {
        jQuery('.modal').closeModal();
    }

}