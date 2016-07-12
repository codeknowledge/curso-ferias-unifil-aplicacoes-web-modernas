import { Exception } from './Exception';

export class IndexNotFoundException extends Exception
{
    constructor(message : string = "Index not found exception")
    {
        super(message);
    }
}