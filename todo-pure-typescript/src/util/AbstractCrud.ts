import { Entity } from '../model/Entity';

export abstract class AbstractCrud {
    public abstract save(entity : Entity) : Promise<Entity>;
    public abstract retrieve() : Promise<Entity>;
    public abstract retrieveList() : Promise<Entity>;
    public abstract delete(entity : Entity) : Promise<Entity>;
    public abstract create(entity : Entity) : Promise<Entity>;
}