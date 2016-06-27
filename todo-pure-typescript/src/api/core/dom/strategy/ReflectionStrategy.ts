
import { CKHtmlNode } from '../CKHtmlNode';
import { BinaryDOMOperator } from '../BinaryDOMOperator';
import { StrategyResult } from './StrategyResult';

export abstract class ReflectionStrategy {
    protected operator : BinaryDOMOperator;
    public abstract reflect(scope : any, htmlNode : CKHtmlNode) : StrategyResult;
}