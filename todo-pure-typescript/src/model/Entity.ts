export class Entity {
    public id : string;
    public creationDate: Date;
    public updateDate: Date;

    /**
     *
     */
    constructor() {
        this.creationDate = new Date();
    }
}