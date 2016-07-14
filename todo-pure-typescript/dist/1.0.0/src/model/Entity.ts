import { CKObject } from '../api/core/CKObject';

export class Entity extends CKObject
{
    public id : string;
    public createdAt: Date;
    public updateDate: Date;

    /**
     *
     */
    constructor()
    {
        super();
        this.createdAt = this.creationDate;
    }
}