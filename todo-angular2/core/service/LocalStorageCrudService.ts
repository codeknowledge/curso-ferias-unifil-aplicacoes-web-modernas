//Model
import { Entity } from '../model/Entity';

//Service
import { AbstractCrudService } from './AbstractCrudService';

//Util
import { UUID } from '../util/UUID';

export class LocalStorageCrudService<T extends Entity> extends AbstractCrudService<T> {

    public create(entity: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            entity.id = UUID.generateUIID();
            entity.creationDate = new Date();
            this.saveToStorage(entity);
            resolve(entity);
        });
    }

    public save(entity: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            entity.creationDate = new Date();
            this.saveToStorage(entity);
            resolve(entity);
        });
    }

    public retrieve(id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            resolve(this.retrieveFromStorage(id));
        });
    }

    public retrieveList(): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            let list: Array<T> = new Array<T>();
            for (let i = 0, len = localStorage.length; i < len; ++i) {
                let key: string = localStorage.key(i);
                list.push(this.retrieveFromStorage(key));
            }
            resolve(list);
        });

    }

    public delete(entity: T): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            localStorage.removeItem(entity.id);
            resolve();
        });
    }

    private retrieveFromStorage(id: string): T {
        let entity: T = JSON.parse(localStorage.getItem(id));
        return entity;
    }

    private saveToStorage(entity: T) {
        localStorage.setItem(entity.id, JSON.stringify(entity));
    }
}