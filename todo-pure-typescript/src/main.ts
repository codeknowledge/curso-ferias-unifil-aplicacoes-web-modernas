/// <reference path="../typings/es6-shim/es6-shim.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

import { DOMManipulator } from './api/core/dom/CKDOMManipulator';
import { AbstractController } from './util/AbstractController';
import { LocalStorageCrud } from './util/LocalStorageCrud';
import { Todo } from './model/Todo';
import { TodoView } from './view/todoview/TodoView';

(() => {
    jQuery("#mainContent").load("src/view/todolistview/TodoListView.html", () => {
        new TodoView("name test", "description test");
    });
})();