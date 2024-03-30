'use strict';

class TextWindow extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
<div class="textWindow_name"></div>
<div class="textWindow_text"></div>
`
        this.child = {
            name: this.querySelector('.textWindow_name'),
            text: this.querySelector('.textWindow_text'),
        }
    }

    static get observedAttributes() {
        return ['name', 'text', 'fllow',];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this[property] = newValue;

        if (property === 'name') {
            this.child.name.textContent = this.name;
        }
        if (property === 'text') {
            this.child.text.textContent = this.text;
        }
        if(property === 'fllow') {
            this.fllowText(this.fllow);
        }
    }

    fllowText(text) {
        let length = 0;
        const _ = () => {
            setTimeout(() => {
                this.setAttribute('text', text.substring(0, length));
                if (length > text.length) {
                    return;
                } else {
                    _();
                }
            }, 100);
            length++;
        }
        _();
    }
}
customElements.define('hello-world', TextWindow);