import { Entity } from './Entity';
import { UUID } from '../util/UUID';

export class Todo extends Entity {
    public name : string;
    public description : string;
    public done : boolean;
    public doneDate : Date;
    public conclusionDate : Date;

    public get donePrettyDate() : string {
        return this.prettyDate(this.doneDate);
    }

    public get creationPrettyDate() : string {
        return this.prettyDate(this.creationDate);
    }

    public get updatePrettyDate() : string {
        return this.prettyDate(this.updateDate);
    }

    public get conclusionPrettyDate() : string {
        return this.prettyDate(this.conclusionDate);
    }

    private prettyDate(date : Date) {
        return date ? date.toDateString() + " at " + date.toTimeString() : "";
    }

    public get open() : boolean {
        return !this.done;
    }

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