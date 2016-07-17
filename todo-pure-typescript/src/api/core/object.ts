module object
{
    export function cast<T>(value : any) : T
    {
        return <T> value;
    }

    export function reflect(obj: any, path: string) : any
    {
        let fields: Array<string> = path.split(".");
        let context: any = obj;
        for (var field of fields)
        {
            if (!context)
                throw new Error("Cannot invoke property '" + field + "' of undefined");

            context = context[field];
        }

        return context;
    }

    export function getClass(object : any) : new (...args) => any
    {
        return object.constructor;
    }

    export function getPrototype(object : any) : any
    {
        return Object.getPrototypeOf(object);
    }

    export function instanceOf<T>(object : any, clazz : new(...args) => T) : boolean
    {
        return object instanceof clazz;
    }

    export function toString(object : any) : string
    {
        if(object.toString)
            return object.toString();
        else
            return JSON.stringify(object);
    }
}

export var cast = object.cast;
export var reflect = object.reflect;
export var getClass = object.getClass;
export var getPrototype = object.getPrototype;
export var instanceOf = object.instanceOf;
export var toString = object.toString;