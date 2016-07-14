import { CKObject } from '../../CKObject';
import { cast } from '../../object';

export abstract class IDictionary<TKEY, TVALUE> extends CKObject {
    protected _keys : Array<TKEY>;
    protected _values : Array<TVALUE>;

    constructor()
    {
        super();
        this._keys = new Array<TKEY>();
        this._values = new Array<TVALUE>();
    }

    public abstract add(key : TKEY, value : TVALUE) : void;
    public abstract remove(key : TKEY) : TVALUE;
    public abstract get(key : TKEY) : TVALUE;
    public abstract containsKey(key : TKEY) : TVALUE;
    public abstract containsValue(value : TVALUE) : TKEY;

    public get keys() : Array<TKEY>
    {
        return this._keys;
    }

    public get values() : Array<TVALUE>
    {
        return this._values;
    }

    public get size() : number
    {
        return this._keys.length;
    }

    protected indexOfValue(value : TVALUE) : number
    {
        let indexResult : number = -1;

        this.values.forEach((ivalue : TVALUE, index : number) =>
        {
            if(ivalue instanceof CKObject)
            {
                if(cast<CKObject>(ivalue).equals(cast<CKObject>(value)))
                    return indexResult = index;
            }
            else if(ivalue === value)
                return indexResult = index;
        });

        return indexResult;
    }

    protected indexOfKey(key : TKEY) : number
    {
        let indexResult : number = -1;

        this.keys.forEach((ikey : TKEY, index : number) =>
        {
            if(ikey instanceof CKObject)
            {
                if(cast<CKObject>(ikey).equals(cast<CKObject>(key)))
                    return indexResult = index;
            }
            else if(ikey === key)
                return indexResult = index;
        });

        return indexResult;
    }

    public foreach(iterator : (key : TKEY, value ?: TVALUE, index ?: number, properties ?: ForeachProperties) => void) : void
    {
        for(let i = 0; i < this._keys.length; i++)
        {
            let first : boolean = i === 0;
            let last : boolean = i === this._keys.length - 1;
            iterator(this.keys[i], this.values[i], i, { first: first, last : last });
        }
    }
}

export interface ForeachProperties
{
    first : boolean,
    last : boolean
}