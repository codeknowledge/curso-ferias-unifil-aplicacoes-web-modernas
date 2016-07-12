module validator
{
    export function isPresent(value : any) : boolean
    {
        return value !== null && value !== undefined;
    }

    export function isBlank(value : any) : boolean
    {
        return value === null || value === undefined;
    }
}

export var isPresent = validator.isPresent;
export var isBlank = validator.isBlank;