import { Entity } from './Entity';
import { UUID } from '../util/UUID';

export class Todo extends Entity {
    public name : string;
    public description : string;
    public done : boolean;
    public doneDate : Date;

    /**
     *
     */
    constructor(name : string, description : string) {
        super();
        this.name = name;
        this.description = description;
        this.done = false;
        this.id = UUID.s4();
    }
}