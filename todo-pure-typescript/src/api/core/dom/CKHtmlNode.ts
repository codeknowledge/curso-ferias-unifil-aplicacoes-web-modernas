export class CKHtmlNode {
    private _anchor : string;
    private _selector : string;
    private _html : string;

    public get html() : string {
        return this._html;
    }

    public setHtml(newHtml : string, newSelector ?: string) {
        this._html = newHtml;
        if(newSelector) {
            this._selector = newSelector;
        }

        this.reflectHtmlChanges();
    }

    public get anchor() : string {
        return this._anchor;
    }

    public set anchor(newAnchor : string) {
        this._anchor = newAnchor;
        this.reflectAnchorChanges();
    }

    constructor(anchor : string, html : string) {
        this._anchor = anchor;
        this._html = html;
    }

    private reflectAnchorChanges() : void {
        //TODO
    }

    private reflectHtmlChanges() : void {

    }
}