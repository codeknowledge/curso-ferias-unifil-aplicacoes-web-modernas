import { IDictionary, ForeachProperties } from './IDictionary';
import { ArrayUtil } from '../../../common/ArrayUtil';
import { toString } from '../../object';
import { KeyNotFoundException } from './exception/KeyNotFoundException';

export class Dictionary<TKEY, TVALUE> extends IDictionary<TKEY, TVALUE>
{
    constructor()
    {
        super();
    }

    public add(key : TKEY, value : TVALUE) : void
    {
        if(!this.containsKey(key))
        {
            this._keys.push(key);
            this._values.push(value);
        }

        else
            console.error("The given key already exists in dictionary");
    }

    public remove(key : TKEY) : TVALUE
    {
        let index : number = this.indexOfKey(key);
        if(index === -1)
            throw new KeyNotFoundException(`The given key ${toString(key)} was not found`);

        ArrayUtil.remove(this.keys, index);
        return  ArrayUtil.remove(this.values, index);
    }

    public get(key : TKEY) : TVALUE
    {
        let index : number = this.indexOfKey(key);
        if(index === -1)
            throw new KeyNotFoundException(`The given key ${toString(key)} was not found`);
        
        return this.values[index];
    }

    public containsKey(key : TKEY) : TVALUE
    {
        let index : number = this.indexOfKey(key);
        if(index === -1)
            return null;
        
        return this.values[index];
    }

    public containsValue(value : TVALUE) : TKEY
    {
        let index : number = this.indexOfValue(value);
        if(index === -1)
            return null;
        
        return this.keys[index];
    }

    public set(key : TKEY, value : TVALUE) : void
    {
        let index : number = this.indexOfKey(key);

        if(index === -1)
            throw new KeyNotFoundException(`The given key ${toString(key)} was not found`);
        
        this._values[index] = value; 
    }

    public toString() : string
    {
        let response : string = "[";

        this.foreach((key : TKEY, value : TVALUE, index : number, properties : ForeachProperties) => {
            response += `[${toString(key)} : ${toString(value)}]`;
            if(!properties.last)
                response += ", ";
        });

        return response + "]";
    }
}