import { BinaryDOMOperator } from './BinaryDOMOperator';
import { BindingOperator } from './BindingOperator';
import { ActionOperator } from './ActionOperator';
import { CKHtmlNode } from './CKHtmlNode';
import { CKObject } from '../CKObject';

export class DOMManipulator {
    private static _instance : DOMManipulator;
    private bindingOperator : BindingOperator;
    private actionOperator : ActionOperator;
    
    public static get instance() : DOMManipulator {
        if(DOMManipulator._instance == null) {
            DOMManipulator._instance = new DOMManipulator();
        }
        
        return DOMManipulator._instance;
    }

    constructor() {
        this.bindingOperator = new BindingOperator();
        this.actionOperator = new ActionOperator();
    }

    private insertNode(anchorSelector : string, html : string) : void {
        jQuery(anchorSelector).append(html);
    }

    private removeNode(anchorSelector : string, nodeSelector : string) : void {
        jQuery(anchorSelector).remove(nodeSelector);
    }

    private updateNode(anchorSelector : string, nodeSelector : string, newHtml : string) : void {
        this.removeNode(anchorSelector, nodeSelector);
        this.insertNode(anchorSelector, newHtml);
    }

    public reflect(scope : any, htmlNode : CKHtmlNode) : void {
        let reflectedHtml : string = this.reflectStrategically(scope, htmlNode, BindingOperator);
        //reflectedHtml = this.reflectStrategically(scope, htmlNode, ActionOperator);

        this.updateNode(htmlNode.anchor, htmlNode.selector, reflectedHtml);
    }

    private reflectStrategically<T extends BinaryDOMOperator>(scope : any, htmlNode : CKHtmlNode, operator : new () => T) : string {
        let reflectStrategy : BinaryDOMOperator = new operator();
        let bindingPaths : Array<string> = reflectStrategy.extractOperatorPaths(htmlNode.html);
        let bindingValues : Array<string> = new Array<string>();
        bindingPaths.forEach(valueBindingPath => {
            bindingValues.push(CKObject.invoke(scope, valueBindingPath));
        });

        return reflectStrategy.applyOperatorValues(bindingPaths, bindingValues, htmlNode.html);
    }
}