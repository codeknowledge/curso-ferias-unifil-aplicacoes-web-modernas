/// <reference path="../typings/es6-shim/es6-shim.d.ts" />

import { AbstractController } from './util/AbstractController';
import { LocalStorageCrud } from './util/LocalStorageCrud';
import { Todo } from './model/Todo';

(() => {
    let todo : Todo = new Todo("first todo", "This is the first todo ever");
    let todo2 : Todo = new Todo("second todo", "This is the second todo ever");
    let todo3 : Todo = new Todo("third todo", "This is the third todo ever");
    LocalStorageCrud.instance.create(todo);
    LocalStorageCrud.instance.create(todo2);
    LocalStorageCrud.instance.create(todo3);
    LocalStorageCrud.instance.retrieveList().then((entities : Array<Todo>) => {
        entities.forEach(entity => {
            console.trace("This is a trace, if it's what I think it was, it's going to be great!!!, and of course the entity name: " + entity.name + ", entity description: " + entity.description);
        });

        console.warn("Cleaning the todos!!!");

        LocalStorageCrud.instance.delete(todo);
        LocalStorageCrud.instance.delete(todo3);

        console.info(`The todo2 values before save. name : ${todo2.name} - description : ${todo2.description}`);

        todo2.name = "This is the altered name of todo2";
        todo2.description = "This is the altered version of todo2 description";
        
        LocalStorageCrud.instance.save(todo2).then(() => {

            LocalStorageCrud.instance.retrieve(todo2.id).then((response : Todo) => {
                console.info(`The todo2 values after save. name : ${response.name} - description : ${response.description}`);
            }).catch(error => {
                console.error(error);
            });
        }).catch(error => {
            console.error(error);
        });
    });
})();