import { AbstractCrud } from './AbstractCrud';
import { Entity } from '../model/Entity';

export class LocalStorageCrud extends AbstractCrud {
    
    private static _instance : LocalStorageCrud;
    
    public static get instance() : LocalStorageCrud {
        if(LocalStorageCrud._instance == null) {
            LocalStorageCrud._instance = new LocalStorageCrud();
        }
        
        return LocalStorageCrud._instance;
    }
    
    constructor() {
        super();
    }
    
    public save(entity: Entity): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            localStorage.setItem(entity.id, JSON.stringify(entity));
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }

    public retrieve(id : string): Promise<Entity> {
        return new Promise<Entity>((resolve, reject) => {
            localStorage.getItem(id);
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }

    public retrieveList(): Promise<Array<Entity>> {
        let response : Array<Entity> = new Array<Entity>();
        return new Promise<Array<Entity>>((resolve, reject) => {
            for(let i; i < localStorage.length; i++) {
                response.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
            
            resolve(response);
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }

    public delete(entity: Entity): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            localStorage.removeItem(entity.id);
            resolve();
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }

    public create(entity: Entity): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            localStorage.setItem(entity.id, JSON.stringify(entity));
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }
}