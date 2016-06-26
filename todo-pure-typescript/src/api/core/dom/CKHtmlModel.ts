import { CKObject } from '../CKObject';
import { CKHtmlNode } from './CKHtmlNode';
import { DOMManipulator } from './CKDOMManipulator';

export class CKHtmlModel {
    private _originalHtmlNode : CKHtmlNode; 
    private scope : any;

    constructor(anchor : string, selector : string, html : string, scope : any) {
        this._originalHtmlNode = new CKHtmlNode(anchor, selector, html);
        this.applyScopeChange(scope);
    }

    public applyScopeChange(scope : any) : void {
        this.scope = scope;
        DOMManipulator.instance.reflect(scope, this._originalHtmlNode.copy);
    }
}