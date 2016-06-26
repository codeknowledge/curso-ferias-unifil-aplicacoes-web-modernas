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
        return jQuery(anchorSelector).append(html);
    }

    private removeNode(anchorSelector: string, nodeSelector: string): JQuery {
        return jQuery(anchorSelector).remove(nodeSelector);
    }

    private updateNode(anchorSelector: string, nodeSelector: string, newHtml: string): JQuery {
        this.removeNode(anchorSelector, nodeSelector);
        return this.insertNode(anchorSelector, newHtml);
    }

    public reflect(scope: any, htmlNode: CKHtmlNode): void {
        let strategyResult: StrategyResult = this.reflectStrategically(scope, htmlNode, ValueBindingReflectionStrategy);
        htmlNode.html = strategyResult.html;
        strategyResult = this.reflectStrategically(scope, htmlNode, ActionBindingReflectionStrategy);

        this.updateNode(htmlNode.anchor, htmlNode.selector, strategyResult.html).ready(() => {
            ActionBindingReflectionStrategy.applyActions(strategyResult.actionHostAttrs);
        });
    }

    private reflectStrategically<T extends ReflectionStrategy>(scope: any, htmlNode: CKHtmlNode, strategy: new () => T): StrategyResult {
        let reflectStrategy: ReflectionStrategy = new strategy();
        return reflectStrategy.reflect(scope, htmlNode);
    }
}