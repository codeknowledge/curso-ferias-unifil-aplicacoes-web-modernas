import { CKHtmlNode } from '../CKHtmlNode';
import { CKObject } from '../../CKObject';
import { ReflectionStrategy } from './ReflectionStrategy';
import { ActionOperator } from '../ActionOperator';
import { Action, ActionMap } from '../ActionMap';
import { StrategyResult } from './StrategyResult';
import { OperationResult } from '../BinaryDOMOperator';


export class ActionBindingReflectionStrategy extends ReflectionStrategy
{
    constructor()
    {
        super();
        this.operator = new ActionOperator();
    }

    public reflect(scope : CKObject, htmlNode : CKHtmlNode) : StrategyResult
    {
        let bindingPaths : Array<string> = this.operator.extractOperatorPaths(htmlNode.html);
        let bindingActions : Array<string> = new Array<string>();
        let bindingValues : Array<string> = new Array<string>();
        bindingPaths.forEach(valueBindingPath =>
        {
            let splittedValuePath : Array<string> = valueBindingPath.split(":");
            bindingActions.push(splittedValuePath[0]);
            bindingValues.push(scope.reflect(splittedValuePath[1]));
        });

        let operationResult : OperationResult = this.operator.applyOperatorValues(scope, bindingPaths, bindingValues, htmlNode.html, bindingActions);
        return {html : operationResult.html, actionHostAttrs: operationResult.hostAttrs};
    }

    public static applyActions(hostAttrs : Array<string>) : void
    {
        hostAttrs.forEach(attr =>
        {
            let action : Action = ActionMap.instance.getAction(attr);
            jQuery("["+attr+"]").on(action.type+".ckAPI", (params) =>
            {
                action.func.apply(action.scope, [params]);
            });
        });
    }
}