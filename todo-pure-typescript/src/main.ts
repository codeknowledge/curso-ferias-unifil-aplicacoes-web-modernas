/// <reference path="../typings/es6-shim/es6-shim.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

import { DOMManipulator } from './api/core/dom/CKDOMManipulator';
import { AbstractController } from './util/AbstractController';
import { LocalStorageCrud } from './util/LocalStorageCrud';
import { Todo } from './model/Todo';
import { TodoListView } from './view/todolist/TodoListView';

import { Dictionary } from './api/core/datastructure/generic/Dictionary';

(() => {
    new TodoListView();
    /*let dictionary : Dictionary<string, string> = new Dictionary<string, string>();
    dictionary.add("one", "one value");
    dictionary.add("second", "second value");
    dictionary.add("third", "third value");
    dictionary.add("fourth", "fourth value");
    console.log("to string: " + dictionary.toString());
    console.log(dictionary.containsKey("one"));
    console.log(dictionary.containsKey("two"));
    console.log(dictionary.containsKey("second"));
    console.log(dictionary.containsKey("one val"));
    console.log("to string: " + dictionary.toString());
    console.log(dictionary.get("one"));
    console.log(dictionary.hashCode);
    console.log(dictionary.reflect("_keys"));
    dictionary.remove("third");
    dictionary.set("second", "new second value");
    console.log("to string: " + dictionary.toString());*/
})();