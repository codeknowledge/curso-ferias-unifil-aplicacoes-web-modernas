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

    public reflect(scope: any, htmlNode: CKHtmlNode): StrategyResult {
        let bindingPaths: Array<string> = this.operator.extractOperatorPaths(htmlNode.html);
        let bindingValues: Array<string> = new Array<string>();
        bindingPaths.forEach(valueBindingPath => {
            bindingValues.push(CKObject.invoke(scope, valueBindingPath));
        });

        return { html: this.operator.applyOperatorValues(scope, bindingPaths, bindingValues, htmlNode.html).html };
    }
}