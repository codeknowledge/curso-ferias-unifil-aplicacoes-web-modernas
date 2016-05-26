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

    public retrieve(id: string): Promise<Todo> {
        return null;
    }

    public retrieveList(): Promise<Array<Todo>> {
        return this.crudService.retrieveList();
    }
    public beforeDelete(): void {

    }

    public delete(entity: Todo): Promise<boolean> {
        return null;

    }

    public afterDelete(): void { }

}