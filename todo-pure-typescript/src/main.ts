/// <reference path="../typings/es6-shim/es6-shim.d.ts" />

import { AbstractController } from './util/AbstractController';
import { LocalStorageCrud } from './util/LocalStorageCrud';
import { Todo } from './model/Todo';

(() => {
    let todo : Todo = new Todo("first todo", "This is the first todo ever");
    LocalStorageCrud.instance.create(todo);
    LocalStorageCrud.instance.retrieveList().then((entities : Array<Todo>) => {
        entities.forEach(entity => {
            console.trace("This is a trace, if it's what I think it was, it's going to be great!!!, and of course the entity name: " + entity.name + ", entity description: " + entity.description);
        });
    });
    console.log("%c I'm alive!!! Hello amazing typescript world!!!", "color: blue; font-family: comic-sans; text-size: 12pt");

    console.trace("%c RConsole%c:%cDebug %c>>> %c I'm alive!!! Hello amazing typescript world!!!", "color: purple; font-family: cursive; font-size: 12pt", "color: black; font-family: monospace; font-size: 12pt; font-weight: bold", "color: royalblue; font-family: monospace; font-size: 12pt", "color: black; font-family: monospace; font-size: 11pt; font-weight: bold", "color: royalblue; font-family: monospace; font-size: 12pt");

    console.info("%c RConsole%c:%cInfo %c>>> %c I'm alive!!! Hello amazing typescript world!!!", "color: purple; font-family: cursive; font-size: 12pt", "color: black; font-family: monospace; font-size: 12pt; font-weight: bold", "color: blueviolet; font-family: monospace; font-size: 12pt", "color: black; font-family: monospace; font-size: 11pt; font-weight: bold", "color: blueviolet; font-family: monospace; font-size: 12pt");

    var coolLog = function() { console.group("%c RConsole:Info", "color: blue; font-family: cursive"); console.info("Test"); console.dir({a : {b : {c : 10, d : 20, e : 30}}}); console.groupEnd(); return ""; }
})();  