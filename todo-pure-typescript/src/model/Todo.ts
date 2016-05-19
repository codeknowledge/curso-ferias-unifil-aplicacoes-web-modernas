import { Entity } from './Entity';

export class Todo extends Entity {
    public name : string;
    public order  : number;
    public description : string;
}