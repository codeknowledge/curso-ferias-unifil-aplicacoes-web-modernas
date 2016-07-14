import { DOMManipulator } from './CKDOMManipulator';

export class CKHtmlNode {
    public anchor : string;
    public attr : string;
    public html : string;

    public get copy() : CKHtmlNode {
        return new CKHtmlNode(this.anchor, this.attr, this.html);
    }

    constructor(anchor : string, attr : string, html : string) {
        this.anchor = anchor;
        this.attr = attr;
        this.html = html;
    }
}