import { Entity } from '../model/Entity';

export abstract class AbstractCrudService<T extends Entity> {

    public abstract create(entity: T): Promise<T>;
    public abstract save(entity: T): Promise<T>;
    public abstract retrieve(id: string): Promise<T>;
    public abstract retrieveList(): Promise<Array<T>>;
    public abstract delete(entity: T): Promise<void>;

}