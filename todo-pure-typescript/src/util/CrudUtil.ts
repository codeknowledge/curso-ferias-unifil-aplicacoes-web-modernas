export class CrudUtil {
    public save(entity : Entity) : Promise<any>;
    public retrieve() : Promise<any>;
    public retrieveList() : Promise<any>;
    public delete(entity : Entity) : Promise<any>;
    public create(entity : Entity) : Promise<any>;
}