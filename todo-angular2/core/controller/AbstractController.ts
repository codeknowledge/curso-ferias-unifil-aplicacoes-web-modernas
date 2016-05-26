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
            this.crudService.create(entity).then((entity: T) => {
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
            this.crudService.save(entity).then((entity: T) => {
                resolve(entity);
                this.afterSave();
            }).catch((error) => {
                reject(error);
            });
        });
    }
    public abstract afterSave(): void;

    public abstract retrieve(id: string): Promise<T>;
    public abstract retrieveList(): Promise<any>;
    public abstract beforeDelete(): void;
    public abstract delete(entity: T): Promise<boolean>;
    public abstract afterDelete(): void;

}