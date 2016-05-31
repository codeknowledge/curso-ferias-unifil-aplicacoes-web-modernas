import { Entity } from './Entity';

export class Todo extends Entity {
    public name : string;
    public description : string;

    /**
     *
     */
    constructor(name : string, description : string) {
        super();
        this.name = name;
        this.description = description;
    }
}