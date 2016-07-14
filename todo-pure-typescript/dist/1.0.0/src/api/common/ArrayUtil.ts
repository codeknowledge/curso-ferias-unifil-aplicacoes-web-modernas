export class ArrayUtil
{
    public static remove<T>(array : Array<T>, index : number) : T
    {
        return array.splice(index, 1)[0];
    }
}