export class CKObject {
    public static invoke(obj: any, path: string) {
        let fields: Array<string> = path.split(".");
        let context: any = obj;
        for (var field of fields) {
            if (!context) {
                throw new Error("Cannot invoke property '" + field + "' of undefined");
            }

            context = context[field];
        }

        return context;
    }
}