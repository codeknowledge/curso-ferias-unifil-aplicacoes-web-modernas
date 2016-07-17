import { CKObject } from '../api/core/CKObject';

export class TodoUpdaterService
{
    private static _instance: TodoUpdaterService = null;
    private updateFunction : () => void;
    private loopTime : number;
    private timer : number;
    private owner : CKObject;

    public static get instance(): TodoUpdaterService
    {
        if (TodoUpdaterService._instance === null)
            TodoUpdaterService._instance = new TodoUpdaterService();

        return TodoUpdaterService._instance;
    }

    public register(owner : CKObject, updateFunction : () => void, loopTime : number = 10000) : void
    {
        this.owner = owner;
        this.updateFunction = updateFunction;
        this.loopTime = loopTime;
    }

    public startTimer() : void
    {
        let instance : TodoUpdaterService = this;
        this.timer = setInterval(() => {
            instance.updateFunction.apply(instance.owner);
        }, instance.loopTime);
    }

    public stopTimer() : void
    {
        clearInterval(this.timer);
    }
}