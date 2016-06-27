import { OperationResult, BinaryDOMOperator } from './BinaryDOMOperator';

export class BindingOperator extends BinaryDOMOperator {

    /**
     *
     */
    constructor() {
        super();
        this.leftOperator = "{{";
        this.rightOperator = "}}";
    }

    public applyOperatorValues(scope: any, valueBindingsPaths: Array<string>, valueBindingsValues: Array<string>, html: string): OperationResult {
        valueBindingsPaths.forEach((bindingPath: string, index) => {
            html = html.replace(this.leftOperator + bindingPath + this.rightOperator, valueBindingsValues[index]);
        });
        return { html: html };
    }
}