import { Entity } from  './Entity';

export class Todo extends Entity {

    public name: string;
    public description: string;
    public done: boolean = false;;
    public doneDate: Date;

}