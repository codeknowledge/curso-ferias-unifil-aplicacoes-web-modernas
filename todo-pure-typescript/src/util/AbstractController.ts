export abstract class AbstractController<Entity> {
    public abstract save(entity : Entity) : Promise<any>;
    public abstract retrieve() : Promise<any>;
    public abstract retrieveList() : Promise<any>;
    public abstract delete(entity : Entity) : Promise<any>;
    public abstract create(entity : Entity) : Promise<any>;
}