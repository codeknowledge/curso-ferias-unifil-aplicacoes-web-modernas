import { DOMManipulator } from './CKDOMManipulator';

export class CKHtmlNode {
    public anchor : string;
    public selector : string;
    public html : string;

    constructor(anchor : string, selector : string, html : string) {
        this.anchor = anchor;
        this.selector = selector;
        this.html = html;
    }
}