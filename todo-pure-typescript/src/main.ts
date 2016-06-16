/// <reference path="../typings/es6-shim/es6-shim.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

import { AbstractController } from './util/AbstractController';
import { LocalStorageCrud } from './util/LocalStorageCrud';
import { Todo } from './model/Todo';

(() => {
     jQuery("#mainContent").load("src/view/todoview/TodoView.html");
})();