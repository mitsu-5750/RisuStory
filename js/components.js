'use strict';

class MainView extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
<parson-list></parson-list>
<text-window></text-window>
<like-value></like-value>
`;
		this.child = {
			parsonList: this.querySelector('parson-list'),
			textWindow: this.querySelector('text-window'),
		};
		this.bgm = 0;
	}

	run(data, position = -1) {
		let index = position;

		this.addEventListener('click', () => {
			index++;
			if (!data[index]) {
				return;
			}
			for (let func of data[index]) {
				func();
			}
		});
	}
}
customElements.define('main-view', MainView);


class TextWindow extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
<div class="textWindow_name"></div>
<div class="textWindow_text"></div>
`;
		this.child = {
			name: this.querySelector('.textWindow_name'),
			text: this.querySelector('.textWindow_text'),
		}

		this.text = '';
		this.name = '';
		this.nameColor = '';
		this.voice = null;
	}

	setData(parson, text) {
		this.name = parson.name;
		this.child.name.innerHTML = parson.name;
		this.nameColor = parson.color;
		this.child.name.style.backgroundColor = parson.color;
		this.fllowText(text);
	}

	setDataOfValue(name, text, color) {
		this.name = name;
		this.child.name.innerHTML = name;
		this.nameColor = color;
		this.child.name.style.backgroundColor = color;
		this.fllowText(text);
	}

	setText(text) {
		this.text = text;
		this.child.text.innerHTML = text;
	}

	fllowText(text) {
		let length = 0;
		const _ = () => {
			setTimeout(() => {
				this.setText(text.substring(0, length));
				if (length > text.length) {
					return;
				} else {
					_();
				}
			}, 10);
			length++;
		}
		_();
	}
}
customElements.define('text-window', TextWindow);

class ParsonImg extends HTMLElement {
	constructor(name, nameValue, color) {
		super();
		this.name = name;
		this.nameValue = nameValue;
		this.color = color;
		this.innerHTML = `
<img class="parsonList_parsonImg">
`;
		this.child = {
			img: this.querySelector('img'),
		};
		this.setImgPath('defo');
		this.setIsView(false);
		this.setX(0);
	}

	setImgPath(ImgPath) {
		this.ImgPath = ImgPath;
		this.child.img.src = `../img/parsons/${this.nameValue}/${ImgPath}.png`;
		return this;
	}

	setIsView(isView) {
		this.isView = isView;
		if (isView) {
			this.classList.add('parsonList_parsonImg__isView');
		} else {
			this.classList.remove('parsonList_parsonImg__isView');
		}
		return this;
	}

	setX(x) {
		this.x = x;
		this.style.left = `${x}%`;
		return this;
	}

	jump() {
		this.style = {};
		setTimeout(() => this.style.animation = 'jump .2s alternate 2 running', 1);
		return this;
	}
}
customElements.define('parson-img', ParsonImg);

class ParsonList extends HTMLElement {
	constructor() {
		super();
		this.konomi = new ParsonImg('好', 'konomi', '#9d5b8b');
		this.appendChild(this.konomi);
		this.yuuma = new ParsonImg('ゆうま', 'yuuma', '#84ad54');
		this.appendChild(this.yuuma);
		this.mitsu = new ParsonImg('みつ', 'mitsu', '#ee7800');
		this.appendChild(this.mitsu);
		this.yuuta = new ParsonImg('ゆうた', 'yuuta', '#ee7800');
		this.appendChild(this.yuuta);
		this.ai = new ParsonImg('あい', 'ai', '#ee7800');
		this.appendChild(this.ai);
	}
}
customElements.define('parson-list', ParsonList);


class LikeValue extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = 0;
		this.limit = 0;
	}

	addValue(value) {
		this.value = this.value + value;
		if (this.value > 100) {
			this.value = 100;
		}
		this.innerHTML = this.value;
	}

	removeValue(value) {
		this.value = this.value - value;
		if (this.value <= 0) {
			alert('ゲームオーバー');
		}
		this.innerHTML = this.value;
	}
}
customElements.define('like-value', LikeValue);
