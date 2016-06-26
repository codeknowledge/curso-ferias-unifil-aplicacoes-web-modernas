import { DOMManipulator } from './CKDOMManipulator';

export class CKHtmlNode {
    public anchor : string;
    public selector : string;
    public html : string;

    public get copy() : CKHtmlNode {
        return new CKHtmlNode(this.anchor, this.selector, this.html);
    }

    constructor(anchor : string, selector : string, html : string) {
        this.anchor = anchor;
        this.selector = selector;
        this.html = html;
    }
}