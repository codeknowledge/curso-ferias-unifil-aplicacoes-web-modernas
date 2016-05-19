import { Component, Input } from '@angular/core';

import { Todo } from '../../model/Todo';

@Component({
    selector: 'todo',
    templateUrl: 'app/src/core/component/todo/TodoComponent.html',
    directives: [TodoComponent]
})
export class TodoComponent {

    @Input() todo: Todo;
    
    private toggleState(): void {
        this.todo.done = !this.todo.done;
    }
}