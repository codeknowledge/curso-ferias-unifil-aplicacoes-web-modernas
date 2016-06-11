//Angular2
import { Component, Input } from '@angular/core';

import { Todo } from '../../model/Todo';

//Controller
import { TodoController } from '../../controller/TodoController';

@Component({
    selector: 'todo-register',
    templateUrl: 'core/component/todoregister/TodoRegister.html',
    styleUrls: ['core/component/todoregister/TodoRegister.css']
})
export class TodoRegister {

    @Input() todos: Array<Todo>;

    private _isEditing: boolean = false;

    private get isEditing(): boolean {
        return this._isEditing;
    }

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
        let instance: TodoRegister = this;
        jQuery('#todoRegisterModal')
            .modal({
                blurring: true
            });
        jQuery('.ui.checkbox')
            .checkbox();
    }

    private save(): void {
        if (this.isEditing) {
            this.controller.save(this.todo).then((todo: Todo) => {
                let oldTodo = this.todos.filter((arrayTodo) => { //find the Todo that has been updated.
                    return todo.id === arrayTodo.id;
                })[0];
                this.todos[this.todos.indexOf(oldTodo)] = todo;
                this.closeModal();
                this.resetForm();
            }).catch((error) => {
                console.debug(JSON.stringify(error));
            });
        } else {
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
    }

    private createTodo(): void {
        this._isEditing = false;
        this.resetForm();
        this.openModal();
    }

    private editTodo(todo: Todo): void {
        this.controller.retrieve(todo.id).then((retrievedTodo: Todo) => {
            this.todo = retrievedTodo;
            this._isEditing = true;
            this.openModal();
        }).catch((error) => {
            console.error(error);
        })
    }

    private resetForm(): void {
        this.todo = new Todo();
    }

    private openModal(): void {
        jQuery('#todoRegisterModal').modal('show')
    }

    private closeModal(): void {
        jQuery('#todoRegisterModal').modal('hide');
    }



    private cancelar(): void {
        this.resetForm();
        this.closeModal();
    }

}