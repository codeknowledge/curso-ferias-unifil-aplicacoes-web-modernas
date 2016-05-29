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
        jQuery('#more' + this.id).dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
        });
    }
}