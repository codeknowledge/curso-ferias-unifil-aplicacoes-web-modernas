import { Exception } from '../../../../exception/Exception';

export class KeyNotFoundException extends Exception
{
    constructor(message : string = "Key not found exception")
    {
        super(message);
    }
}