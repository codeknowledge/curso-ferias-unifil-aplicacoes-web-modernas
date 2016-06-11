import { Entity } from '../model/Entity';

export abstract class AbstractCrud {
    public abstract save(entity : Entity) : Promise<void>;
    public abstract retrieve(id : string) : Promise<Entity>;
    public abstract retrieveList() : Promise<Array<Entity>>;
    public abstract delete(entity : Entity) : Promise<void>;
    public abstract create(entity : Entity) : Promise<void>;
}