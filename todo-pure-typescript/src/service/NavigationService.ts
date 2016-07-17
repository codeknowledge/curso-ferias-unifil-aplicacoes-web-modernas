import { CKObject } from '../api/core/CKObject';
import { CKComponent } from '../api/core/CKComponent';

export class NavigationService extends CKObject
{
    private static _instance: NavigationService = null;
    private actualComponent : CKComponent;
    private routeParams : RouteParams;
    public get params() : RouteParams
    {
        return this.routeParams;
    }

    public static get instance(): NavigationService
    {
        if (NavigationService._instance === null)
            NavigationService._instance = new NavigationService();

        return NavigationService._instance;
    }

    public config(starterComponent : CKComponent) : void
    {
        this.actualComponent = starterComponent;
    }

    public navigate<T extends CKComponent>(clazz : new () => T, ...params : Array<RouteParam>) : Promise<T>
    {
        let instance : NavigationService = this;
        return new Promise<T>((resolve, reject) => {
            instance.actualComponent.invoke("destroy");
            if(params)
            {
                instance.routeParams = {};
                params.forEach(param => {
                    instance.routeParams[param.key] = param.value;
                })
            }
            
            let component : T = new clazz();
            instance.actualComponent = component;
            resolve();
        });
    }
}

export interface RouteParam
{
    key : string,
    value : any
}

export interface RouteParams
{
    [key : string] : any;
}