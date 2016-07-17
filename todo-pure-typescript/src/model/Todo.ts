import { Entity } from './Entity';
import { UUID } from '../util/UUID';

export class Todo extends Entity {
    public name: string;
    public description: string;
    public done: boolean;
    public doneDate: Date;
    public dueDate: Date;

    public get donePrettyDate(): string {
        return this.prettyDate(this.doneDate);
    }

    public get creationPrettyDate(): string {
        return this.prettyDate(this.createdAt);
    }

    public get updatePrettyDate(): string {
        return this.prettyDate(this.updateDate);
    }

    public get duePrettyDate(): string {
        return this.prettyDate(this.dueDate);
    }

    private prettyDate(date: Date): string {
        return date ? date.toUTCString() : "";
    }

    public get doneInsightedDate(): string {
        return this.insightedDate(this.doneDate);
    }

    public get creationInsightedDate(): string {
        return this.insightedDate(this.createdAt);
    }

    public get updateInsightedDate(): string {
        return this.insightedDate(this.updateDate);
    }

    public get dueInsightedDate(): string {
        return this.insightedDate(this.dueDate);
    }


    /*public get hasDueInsightedDate(): string {
        return this.dueInsightedDate ? "" : "hidden";
    }

    public get hasDoneInsightedDate(): string {
        return this.doneInsightedDate ? "" : "hidden";
    }

    public get hasCreationInsightedDate(): string {
        return this.creationInsightedDate ? "" : "hidden";
    }

    public get hasUpdateInsightedDate(): string {
        return this.updateInsightedDate ? "" : "hidden";
    }*/
    

    private insightedDate(date: Date): string {
        if(!date)
            return "";
        
        let diffFromNow : number = (new Date()).getDate() - date.getDate();
        //let sufix : string = diffFromNow < 0 ? " ago" : "";
        
        return moment(date).fromDate(new Date());
    }

    private get formattedDueDate(): string {
        return this.dueDate ? this.dueDate.getFullYear() +
            "-" + this.only2CaractersDatePart(this.dueDate.getMonth() + 1) +
            "-" + this.only2CaractersDatePart(this.dueDate.getDate() + 1) : "";
    }

    private only2CaractersDatePart(datePart: number): string {
        return datePart < 10 ? 0 + datePart.toString() : datePart.toString();
    }

    public get open(): boolean {
        return !this.done;
    }

    public clone(): Todo {
        let newTodo: Todo = new Todo(this.name, this.description);
        newTodo.createdAt = this.createdAt;
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
    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
        this.done = false;
        this.id = UUID.s4();
    }
}