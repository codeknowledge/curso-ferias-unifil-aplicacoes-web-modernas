import { isPresent, isBlank } from '../common/validators';
import { cast, invoke, getClass, getPrototype, instanceOf } from './object';

export class CKObject
{
    private static obj_id : number = -1;
    private obj_id : number;
    private _creationDate : Date;
    private randomValue : string;

    protected get creationDate() : Date
    {
        return this._creationDate;
    }

    constructor()
    {
        this.obj_id = ++CKObject.obj_id;
        this._creationDate = new Date();
        this.randomValue = ((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
    }

    public reflect(path : string) : any
    {
        return invoke(this, path);
    }

    public get hashCode() : string
    {
        return btoa( 
        btoa(this._creationDate.toString())
        +btoa(typeof this)
        +btoa(this.obj_id.toString())
        +btoa(this.randomValue)
        );
    }

    public equals<T extends CKObject>(otherObject : T) : boolean
    {
        if(isBlank(this) || isBlank(otherObject))
            return false;
        else
            return this.hashCode === otherObject.hashCode;
    }

    public cast<T>() : T
    {
        return cast<T>(this);
    }

    public get class() : new (...args) => any
    {
        return getClass(this);
    }

    public get prototype() : any
    {
        return getPrototype(this);
    }

    public instanceOf<T extends CKObject>(clazz : new () => T) : boolean
    {
        return instanceOf(this, clazz);
    }

    public toString() : string
    {
        return this.hashCode;
    }
}