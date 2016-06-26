import { OperationResult, BinaryDOMOperator } from './BinaryDOMOperator';
import { Action, ActionMap } from './ActionMap';

export class ActionOperator extends BinaryDOMOperator {
    /**
     *
     */
    constructor() {
        super();
        this.leftOperator = "((";
        this.rightOperator = "))";
    }

    public applyOperatorValues(scope: any, valueBindingsPaths: Array<string>, valueBindingsValues: Array<Function>, html: string): OperationResult {
        let hostAttrs : Array<string> = new Array<string>();
        valueBindingsPaths.forEach((bindingPath: string, index) => {
            let hostAttr: string = ActionMap.instance.regiterAction({ scope: scope, func: valueBindingsValues[index] });
            hostAttrs.push(hostAttr);
            html = html.replace(this.leftOperator + bindingPath + this.rightOperator, hostAttr);
        });
        return {html: html, hostAttrs: hostAttrs};
    }
}