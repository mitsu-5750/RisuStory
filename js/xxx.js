'use strict';

class View extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
<text-window name="aaa" text="bbb">
`
		this.child = {
			textWindow: document.querySelector('text-window'),
		}
	}

	static get observedAttributes() {
		return ['json'];
	}

	attributeChangedCallback(property, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}
		this[property] = newValue;
		if (property === 'json') {
			this.json = this.json;
		}
	}
}
customElements.define('main-view', View);

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
		if (property === 'fllow') {
			this.fllowText(this.fllow);
		}
	}

	fllowText(text) {
		let length = -1;
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
customElements.define('text-window', TextWindow);

class Person extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
<img>
`
		this.child = {
			img: this.querySelector('.textWindow_name'),
		}
	}

	static get observedAttributes() {
		return ['imgPath', 'jump',];
	}

	attributeChangedCallback(property, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}
		this[property] = newValue;
		if (property === 'imgPath') {
			this.child.img.src=this.imgPath;
		}
		if (property === 'isjump') {
			if(!this.jump) {
				return;
			}
			this.isjump();
		}
	}

	jump() {
		alert(0);
		this.removeAttribute('isjump');
	}
}
customElements.define('per-son', Person);