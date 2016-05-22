import { BaseModel } from  './BaseModel';

export class Todo extends BaseModel {

    public name: string;
    public description: string;
    public done: boolean;
    public doneDate: Date;
    
}