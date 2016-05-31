/// <reference path="../typings/es6-shim/es6-shim.d.ts" />

import { AbstractController } from './util/AbstractController';
import { LocalStorageCrud } from './util/LocalStorageCrud';
import { Todo } from './model/Todo';

(() => {
    let todo : Todo = new Todo("first todo", "This is the first todo ever");
    LocalStorageCrud.instance.create(todo);
    console.log("%c I'm alive!!! Hello amazing typescript world!!!", "color: blue; font-family: comic-sans; text-size: 12pt");
})();  