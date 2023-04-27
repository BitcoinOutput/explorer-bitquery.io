export default class BootstrapCardComponent {
	constructor(element) {
		this.container = element;
		this.config = this.configuration();
		this.createWrapper();
		
		
	}

	createWrapper() {
		this.wrapper = this.createElementWithClasses('div');
		this.wrapper.style.display = 'flex'
		this.wrapper.style.flexWrap = 'wrap'
		this.wrapper.style.justifyContent = 'space-around'
		this.container.appendChild(this.wrapper);
	}

	createElementWithClasses(elementType, ...classes) {
		const element = document.createElement(elementType);
		element.classList.add(...classes);
		return element;
	}

	onData(data, sub) {
		console.log('onData', data);
		const array = this.config.topElement(data);
		const maxRows = 10;

		array.forEach((rowData) => {
			const cardElement = this.createElementWithClasses('div', 'card', 'mb-3');
			const card = this.createElementWithClasses('div', 'row', 'g-0');
			cardElement.style.width = '640px'
			const cardImg = this.createElementWithClasses('div', 'col-md-2');
			const cardBodyWrapper = this.createElementWithClasses('div', 'col-md-10');
			const cardBody = this.createElementWithClasses('div', 'card-body');
			cardBody.style.display = 'flex';

			const startColumnDiv = this.createElementWithClasses('div', 'col-md-6', 'align-items-start');
			const endColumnDiv = this.createElementWithClasses('div', 'col-md-6', 'align-items-end');

			this.config.columns.forEach((column) => {
				if (column.name && typeof column.name =='string') {
				const cardTitle = this.createElementWithClasses('div', 'card-title');
				const span = this.createTextElement('span', column.name);
				cardTitle.appendChild(span);
				startColumnDiv.appendChild(cardTitle);
				if(column.rendering){
					const cardText = this.createElementWithClasses('div', 'card-title', 'col', 'ellipsis');
					const spanText = column.rendering(column.cell(rowData)) ;
					cardText.appendChild(spanText);
					endColumnDiv.appendChild(cardText);
				} else{
					const cardText = this.createElementWithClasses('div', 'card-title', 'col', 'ellipsis');
					const spanText = this.createTextElement('span', column.cell(rowData));
					cardText.appendChild(spanText);
					endColumnDiv.appendChild(cardText);
				};
				}
				if (column.name && typeof column.name =='function') {
				const cardTitle = this.createElementWithClasses('div', 'card-title');
				startColumnDiv.appendChild(cardTitle);
				if(column.rendering){
					const cardText = this.createElementWithClasses('div', 'card-title', 'col', 'ellipsis');
					const spanText = column.rendering(column.cell(rowData)) ;
					cardText.appendChild(spanText);
					startColumnDiv.appendChild(cardText);
				} else{
					const cardText = this.createElementWithClasses('div', 'card-title', 'col', 'ellipsis');
					const spanText = this.createTextElement('span', column.name(rowData));
					cardText.appendChild(spanText);
					startColumnDiv.appendChild(cardText);
				};
				}

			});

			this.config.columns.forEach(async (column) => {
				if(column.render){
					const div = await column.render(column.cell(rowData));
					cardImg.appendChild(div);
				}
			});
			this.appendChildren(cardElement, card);
			this.appendChildren(card, cardImg,cardBodyWrapper );
			this.appendChildren(cardBodyWrapper, cardBody);
			this.appendChildren(cardBody, startColumnDiv, endColumnDiv);
		if (sub) {
			this.wrapper.insertBefore(cardElement, this.wrapper.firstChild)
			if (this.wrapper.childElementCount > maxRows) {
				this.wrapper.removeChild(this.wrapper.lastChild);
			}
			} else {
				this.wrapper.appendChild(cardElement);
			}
	
		});
	}

	createTextElement(elementType, textContent, readyElement) {
		if(readyElement){
			return readyElement
		}
		const element = document.createElement(elementType);
		element.textContent = textContent;
		return element;
	}

	appendChildren(parent, ...children) {
		children.forEach(child => parent.appendChild(child));
	}
}
