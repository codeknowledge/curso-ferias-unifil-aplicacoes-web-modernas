import { Entity } from '../model/Entity';

export abstract class AbstractCrudService<T extends Entity> {

    public abstract create(entity: T): Promise<void>;
    public abstract save(entity: T): Promise<void>;
    public abstract retrieve(id: string): Promise<T>;
    public abstract retrieveList(): Promise<Array<T>>;
    public abstract delete(entity: T): Promise<void>;

}