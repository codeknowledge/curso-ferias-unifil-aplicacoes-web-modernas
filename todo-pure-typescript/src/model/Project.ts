import { Iteration } from './Iteration';
import { Entity } from './Entity';

export class Project extends Entity
{
    public iterations : Array<Iteration>;
    public tags : Array<string>;
    public done: boolean;
    public doneDate: Date;
    public dueDate: Date;

    constructor(public name : string, public description : string)
    {
        super();
    }

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

    public clone(): Project {
        let newProject: Project = new Project(this.name, this.description);
        newProject.createdAt = this.createdAt;
        newProject.done = this.done;
        newProject.dueDate = this.dueDate;
        newProject.id = this.id;
        newProject.doneDate = this.doneDate;
        newProject.updateDate = this.updateDate;
        return newProject;
    }
}