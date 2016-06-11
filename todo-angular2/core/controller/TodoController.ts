import { Injectable, Injector } from '@angular/core';

import { Todo } from '../model/Todo';
import { AbstractController } from './AbstractController';

@Injectable()
export class TodoController extends AbstractController<Todo>{
    /**
     *
     */
    constructor(injector: Injector) {
        super(injector);
    }



    public beforeCreate(): void {

    }

    public afterCreate(): void {

    }

    public beforeSave(): void {

    }
    
    public afterSave(): void {

    }
    
    public beforeDelete(): void {

    }

    public afterDelete(): void { }

}