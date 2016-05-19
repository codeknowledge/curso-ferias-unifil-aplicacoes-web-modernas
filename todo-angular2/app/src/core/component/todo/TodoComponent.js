"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Todo_1 = require('../../model/Todo');
var TodoComponent = (function () {
    function TodoComponent() {
    }
    TodoComponent.prototype.toggleState = function () {
        this.todo.done = !this.todo.done;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Todo_1.Todo)
    ], TodoComponent.prototype, "todo", void 0);
    TodoComponent = __decorate([
        core_1.Component({
            selector: 'todo',
            templateUrl: 'app/src/core/component/todo/TodoComponent.html',
            directives: [TodoComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], TodoComponent);
    return TodoComponent;
}());
exports.TodoComponent = TodoComponent;
//# sourceMappingURL=TodoComponent.js.map