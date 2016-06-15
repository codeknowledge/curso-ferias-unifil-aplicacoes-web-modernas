//Angular2
import { Injector } from '@angular/core';

//Model
import { Entity } from '../model/Entity';

//Service
import { AbstractCrudService } from '../service/AbstractCrudService';

//util
import { ApplicationConfig } from '../util/ApplicationConfig';

export abstract class AbstractController<T extends Entity> {

    protected crudService: AbstractCrudService<T>;

    constructor(private injector: Injector) {
        this.crudService = injector.get(ApplicationConfig.CRUD_SERVICE_TOKEN);
    }

    public abstract beforeCreate(): void;

    public create(entity: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.beforeCreate();
            this.crudService.create(entity).then(() => {
                resolve(entity);
                this.afterCreate();
            }).catch((error) => {
                reject(error);
            });
        });
    }
    public abstract afterCreate(): void;

    public abstract beforeSave(): void;

    public save(entity: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.beforeSave();
            this.crudService.save(entity).then(() => {
                resolve(entity);
                this.afterSave();
            }).catch((error) => {
                reject(error);
            });
        });
    }
    public abstract afterSave(): void;

    public retrieve(id: string): Promise<T> {
        return this.crudService.retrieve(id);
    }

    public retrieveList(): Promise<any> {
        return this.crudService.retrieveList();
    }
    public abstract beforeDelete(): void;

    public delete(entity: T): Promise<void> {
        return this.crudService.delete(entity);
    }

    public abstract afterDelete(): void;

}