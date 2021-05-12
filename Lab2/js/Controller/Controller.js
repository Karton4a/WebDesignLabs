import { ShortLinkModel } from '../Model/Model.js'
import { ItemListView } from '../View/ItemListView.js'

export class Controller {

    constructor(view) {

        console.assert(view instanceof ItemListView)
        this.linksArray = []
        this.view = view
        this.view.setController(this)
    }
    addLink(url) {
        if(this.validateUrl(url)) {

            if(this.linksArray.find((element, index, array) => element.originalUrl === url) === undefined) {
                this.linksArray.push(new ShortLinkModel(url,this.generateShortLink()))
            } 
            this.view.renderView(this.linksArray)
        } else {
            this.view.showError("text is not url")
        }

    }

    removeLink(id) {
        this.linksArray.splice(id,1)
        this.view.renderView(this.linksArray)
    }

    onOriginalUrlChanged(id,newUrl) {
        if(this.validateUrl(newUrl)){
            this.linksArray[id].originalUrl = newUrl
            this.linksArray[id].shortUrl = this.generateShortLink(newUrl)
            this.view.renderView(this.linksArray)
        }else {
            this.view.showError("text is not url",id)
        }
    }

    generateShortLink() {
        return window.location.hostname + '/' + Math.random().toString(36).substr(2, 6);
    }
    validateUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

}