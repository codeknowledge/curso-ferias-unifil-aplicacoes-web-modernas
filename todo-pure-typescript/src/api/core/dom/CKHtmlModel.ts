import { CKObject } from '../CKObject';
import { CKHtmlNode } from './CKHtmlNode';
import { CKDOMManipulator } from './CKDOMManipulator';

export class CKHtmlModel {
    private _originalHtmlNode : CKHtmlNode;
    public get html() : string {
        let valueBindingsValues : Array<string> = new Array<string>();
        let valueBindingsPath : Array<string> = CKDOMManipulator.extractValueBindings(this._originalHtmlNode.html);

        valueBindingsPath.forEach(valueBindingPath => {
            valueBindingsValues.push(CKObject.invoke(this.scope, valueBindingPath));
        });

        return CKDOMManipulator.applyValueBindings(valueBindingsPath, valueBindingsValues, this._originalHtmlNode.html);
    }
    private scope : any;

    constructor(anchor : string, html : string, scope : any) {
        this._originalHtmlNode = new CKHtmlNode(anchor, html);
        this.applyScopeChange(scope);
    }

    public applyScopeChange(scope : any) {
        this.scope = scope;
    }
}