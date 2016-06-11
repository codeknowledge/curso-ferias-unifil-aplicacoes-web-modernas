import { Entity } from './Entity';

export class Todo extends Entity {
    public name : string;
    public description : string;

    /**
     *
     */
    constructor(name : string, description : string) {
        super();
        this.id = name;
        this.name = name;
        this.description = description;
    }
}