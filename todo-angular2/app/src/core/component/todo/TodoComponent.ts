import { Component, Input } from '@angular/core';

import { Todo } from '../../model/Todo';
import { RelativeTimePipe } from '../../pipe/RelativeTimePipe'

@Component({
    selector: 'todo',
    templateUrl: 'app/src/core/component/todo/TodoComponent.html',
    styleUrls: ['app/src/core/component/todo/TodoComponent.css'],
    directives: [TodoComponent],
    pipes: [RelativeTimePipe]
})
export class TodoComponent {

    @Input() todo: Todo;

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