import { AbstractCrud } from './AbstractCrud';
import { UUID } from './UUID';
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
        entity.updateDate = new Date();
        return new Promise<void>((resolve, reject) => {
            localStorage.setItem(entity.id, JSON.stringify(entity));
            resolve();
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }

    public retrieve(id : string): Promise<Entity> {
        return new Promise<Entity>((resolve, reject) => {
            resolve(this.retrieveFromStorage(id));
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }

    public retrieveList(): Promise<Array<Entity>> {
        let response : Array<Entity> = new Array<Entity>();
        return new Promise<Array<Entity>>((resolve, reject) => {
            for(let i = 0; i < localStorage.length; i++) {
                let key: string = localStorage.key(i);
                response.push(this.retrieveFromStorage(key));
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
        entity.id = UUID.generateUIID();
        entity.creationDate = new Date();
        return new Promise<void>((resolve, reject) => {
            this.saveToStorage(entity);
        }).catch(error => {
            console.error(JSON.stringify(error));
        });
    }

    private retrieveFromStorage(id: string): Entity {
        let entity: Entity = JSON.parse(localStorage.getItem(id));
        return entity;
    }

    private saveToStorage(entity: Entity) {
        localStorage.setItem(entity.id, JSON.stringify(entity));
    }
}