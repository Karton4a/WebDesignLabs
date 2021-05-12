import { Controller } from "../Controller/Controller.js";
import { ShortLinkModel } from '../Model/Model.js'
export class VirtualItemView {

    constructor(controller) {
        console.assert(controller instanceof Controller)
        this.controller = controller
        this.rootElement = document.createElement('div')
        this.errorElement = document.createElement('p')
        this.errorElement.style.color = "red";
    }
    generateView() {

        this.rootElement.innerHTML = 
        `
        <div class="row">
            <div class="col">
                <input type="text" class="form-control">
            </div>
            <div class="col" style="padding-left: 0%;">
                <div class="url-list-group input-group" style="margin-left: 0%;">
                    <input type="text" class="form-control" disabled>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-default btn-copy js-tooltip js-copy shadow-none" data-toggle="tooltip" data-placement="bottom" title="Copy to clipboard">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `
        this.inputField =  this.rootElement.getElementsByTagName('input')[0]
        this.inputField.addEventListener('focusout',this.onFocusChanged)
        window.setTimeout(()=> { this.inputField.focus() }, 0);
        return this.rootElement
    }
    showError(text){
		let textNode = document.createTextNode(text);
		this.errorElement.appendChild(textNode)
		this.rootElement.appendChild(this.errorElement)
	}
    clearError() {
        this.errorElement.remove()
        this.errorElement.innerHTML = ''
    }
    onFocusChanged = () => {

		if(this.inputField.value !== "") {
			this.controller.addLink(this.inputField.value)
		} else {
            this.rootElement.parentElement.removeChild(this.rootElement)
            console.log('remove child')
        }
    }
}