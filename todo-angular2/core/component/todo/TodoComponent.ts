//Angular2
import { Component, Input, Output, EventEmitter } from '@angular/core';

//Model
import { Todo } from '../../model/Todo';

//Util
import { UUID } from '../../util/UUID';


//Pipe
import { RelativeTimePipe } from '../../pipe/RelativeTimePipe';

@Component({
    selector: 'todo',
    templateUrl: 'core/component/todo/TodoComponent.html',
    styleUrls: ['core/component/todo/TodoComponent.css'],
    directives: [TodoComponent],
    pipes: [RelativeTimePipe]
})
export class TodoComponent {

    private id: string = UUID.s4();

    @Input() todo: Todo;
    @Output() statusChange: EventEmitter<Todo> = new EventEmitter();
    @Output() onEdit: EventEmitter<Todo> = new EventEmitter();
    @Output() onRemove: EventEmitter<Todo> = new EventEmitter();

    private toggleState(): void {
        this.todo.done = !this.todo.done;
        this.setDoneDate();
        this.statusChange.emit(this.todo);
    }

    private setDoneDate(): void {
        if (this.todo.done) {
            this.todo.doneDate = new Date();
        } else {
            this.todo.doneDate = undefined;
        }
    }

    ngAfterViewInit(): void {
        let instance: TodoComponent = this;
        jQuery('#confirm-modal-' + this.todo.id)
            .modal(
            {
                closable: false,
                blurring: true,
            });
    }

    private showModal(): void {
        jQuery('#confirm-modal-' + this.todo.id).modal('show');
    }

    private hideModal(): void {
        jQuery('#confirm-modal-' + this.todo.id).modal('hide');
    }

    private confirmDelete(): void {
        this.onRemove.emit(this.todo);
        this.hideModal();
    }
}