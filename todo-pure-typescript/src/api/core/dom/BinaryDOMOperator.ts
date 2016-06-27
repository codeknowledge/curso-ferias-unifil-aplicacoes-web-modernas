export class BinaryDOMOperator {
    protected leftOperator : string;
    protected rightOperator : string;

    public extractOperatorPaths(html : string) : Array<string> {
        let unleftedHtmlArray : Array<string> = html.split(this.leftOperator);
        let operatorValues : Array<string> = new Array<string>();

        unleftedHtmlArray.forEach(leftSplitedHtml => {
            let rightSplitedHtmlArray : Array<string> = leftSplitedHtml.split(this.rightOperator);
            if(rightSplitedHtmlArray.length > 1) {
                operatorValues.push(rightSplitedHtmlArray[0]);
            }
        });

        return operatorValues;
    }

    public applyOperatorValues(scope : any, valueBindingsPaths : Array<string>, valueBindingsValues : Array<any>, html : string, actionTypes ?: Array<string>) : OperationResult {
        return null;
    }
}

export interface OperationResult {
    html : string;
    hostAttrs ?: Array<string>;
}