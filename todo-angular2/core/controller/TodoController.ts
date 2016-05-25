import { Injectable } from '@angular/core';

import { Todo } from '../model/Todo';
import { AbstractController } from './AbstractController';

export abstract class TodoController extends AbstractController<Todo>{

}