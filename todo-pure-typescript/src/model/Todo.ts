import { Entity } from './Entity';
import { UUID } from '../util/UUID';

export class Todo extends Entity {
    public name : string;
    public description : string;
    public done : boolean;
    public doneDate : Date;
    public dueDate : Date;

    public get donePrettyDate() : string {
        return this.prettyDate(this.doneDate);
    }

    public get creationPrettyDate() : string {
        return this.prettyDate(this.creationDate);
    }

    public get updatePrettyDate() : string {
        return this.prettyDate(this.updateDate);
    }

    public get duePrettyDate() : string {
        return this.prettyDate(this.dueDate);
    }

    private prettyDate(date : Date) {
        return date ? date.toLocaleDateString() + " at " + date.toUTCString() : "";
    }
    
    private get formattedDueDate() : string {
            return this.dueDate ? this.dueDate.getFullYear() +
                "-" + this.only2CaractersDatePart(this.dueDate.getMonth() + 1) +
                "-" + this.only2CaractersDatePart(this.dueDate.getDate() + 1) : "";
    }

    private only2CaractersDatePart(datePart : number) : string {
        return datePart < 10 ? 0 + datePart.toString() : datePart.toString();
    }

    public get open() : boolean {
        return !this.done;
    }

    public clone() : Todo {
        let newTodo : Todo = new Todo(this.name, this.description);
        newTodo.creationDate = this.creationDate;
        newTodo.done = this.done;
        newTodo.dueDate = this.dueDate;
        newTodo.id = this.id;
        newTodo.doneDate = this.doneDate;
        newTodo.updateDate = this.updateDate;
        return newTodo;
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