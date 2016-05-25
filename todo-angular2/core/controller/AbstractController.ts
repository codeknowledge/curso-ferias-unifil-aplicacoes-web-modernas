import { Entity } from '../model/Entity';

export abstract class AbstractController<T extends Entity> {

    public abstract save(entity: T): Promise<T>;
    public abstract retrieve(id: string): Promise<T>;
    public abstract retrieveList(): Promise<any>;
    public abstract delete(entity: T): Promise<boolean>;
    public abstract create(entity: T): Promise<T>;

}