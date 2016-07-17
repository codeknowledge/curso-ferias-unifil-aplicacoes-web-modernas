import { Todo } from './Todo';
import { Entity } from './Entity';

export class Iteration extends Entity
{
    public todoList : Array<Todo>;
    public validPeriod : Date;

    constructor()
    {
        super();
        this.validPeriod = new Date(2100, 11);
    }
}