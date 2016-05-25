import { Component } from '@angular/core';

@Component({
    selector: 'todo-creation',
    templateUrl: 'core/component/todocreation/TodoCreation.html',
    styleUrls: ['core/component/todocreation/TodoCreation.css']
})
export class TodoCreation {

    ngAfterViewInit(): void {
        jQuery('.modal-trigger').leanModal({
            dismissible: true,
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
        });

        jQuery('input[type="text"], textarea').characterCounter();
    }

}