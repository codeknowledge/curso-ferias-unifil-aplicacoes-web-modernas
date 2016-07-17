import { Todo } from './Todo';
import { Entity } from './Entity';

export class Iteration extends Entity
{
    public todoList : Array<Todo>;
    public validPeriod : Date;

    constructor(ownerId : string)
    {
        super();
        this.validPeriod = new Date(2100, 11);
        this.ownerId = ownerId;
        this.todoList = [];
    }
}