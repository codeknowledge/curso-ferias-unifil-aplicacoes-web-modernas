import { ReflectionStrategy } from './strategy/ReflectionStrategy';
import { StrategyResult } from './strategy/StrategyResult';
import { ActionBindingReflectionStrategy } from './strategy/ActionBindingReflectionStrategy';
import { ValueBindingReflectionStrategy } from './strategy/ValueBindingReflectionStrategy';
import { CKHtmlNode } from './CKHtmlNode';
import { CKObject } from '../CKObject';

export class DOMManipulator {
    private static _instance: DOMManipulator;

    public static get instance(): DOMManipulator {
        if (DOMManipulator._instance == null) {
            DOMManipulator._instance = new DOMManipulator();
        }

        return DOMManipulator._instance;
    }

    constructor() {
        
    }

    private insertNode(anchorSelector: string, html: string): JQuery {
        return jQuery(anchorSelector).append(html).children().last();
    }

    private removeNode(anchorSelector: string, nodeSelector: string): JQuery {
        return jQuery(anchorSelector).find(nodeSelector).remove();
    }

    private updateNode(anchorSelector: string, attr: string, newHtml: string): JQuery {
        let nodeSelector : string = "["+attr+"]";
        if(jQuery(anchorSelector).find(nodeSelector).length > 0) {
            let newContent = jQuery(newHtml);
            let removedElement = jQuery(anchorSelector).find(nodeSelector).replaceWith(newContent).remove();
            newContent.attr(attr, "");
            return newContent;
        } else {
            return this.insertNode(anchorSelector, newHtml).attr(attr, "");
        }
        
    }

    public reflect(scope: any, htmlNode: CKHtmlNode): void {
        let strategyResult: StrategyResult = this.reflectStrategically(scope, htmlNode, ValueBindingReflectionStrategy);
        htmlNode.html = strategyResult.html;
        strategyResult = this.reflectStrategically(scope, htmlNode, ActionBindingReflectionStrategy);

        this.updateNode(htmlNode.anchor, htmlNode.attr, strategyResult.html).ready(() => {
            ActionBindingReflectionStrategy.applyActions(strategyResult.actionHostAttrs);
        });
    }

    private reflectStrategically<T extends ReflectionStrategy>(scope: any, htmlNode: CKHtmlNode, strategy: new () => T): StrategyResult {
        let reflectStrategy: ReflectionStrategy = new strategy();
        return reflectStrategy.reflect(scope, htmlNode);
    }

    public destroy(scope: any, htmlNode : CKHtmlNode) : void {
        this.removeNode(htmlNode.anchor, "["+htmlNode.attr+"]");
    }
}