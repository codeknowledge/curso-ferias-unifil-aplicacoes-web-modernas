import { CKHtmlNode } from '../CKHtmlNode';
import { CKObject } from '../../CKObject';
import { ReflectionStrategy } from './ReflectionStrategy';
import { BindingOperator } from '../BindingOperator';
import { StrategyResult } from './StrategyResult';

export class ValueBindingReflectionStrategy extends ReflectionStrategy {
    constructor() {
        super();
        this.operator = new BindingOperator();
    }

    public reflect(scope: CKObject, htmlNode: CKHtmlNode): StrategyResult {
        let bindingPaths: Array<string> = this.operator.extractOperatorPaths(htmlNode.html);
        let bindingValues: Array<string> = new Array<string>();
        bindingPaths.forEach(valueBindingPath => {
            let value : any = scope.reflect(valueBindingPath); 
            bindingValues.push(value);
        });

        return { html: this.operator.applyOperatorValues(scope, bindingPaths, bindingValues, htmlNode.html).html };
    }
}