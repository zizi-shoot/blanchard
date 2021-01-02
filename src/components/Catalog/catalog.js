import Accordion from 'accordion-js';

let accordion = new Accordion('.catalog__tab--visible .accordion-container');
accordion.open(0);
let activeCountry = document.querySelector('.catalog__tab--visible');
const openedAccordions = {
	1: 1, // France
	2: 1, // Germany
	3: 1, // Italy
	4: 1, // Russia
	5: 1, // Belgium
};
const countryBtns = document.querySelectorAll('.catalog-nav__btn');
const artistBtns = document.querySelectorAll('.period-item__artist-btn');

function createItem(event, tabName, tabClass, btnClass, dataName) {
	const target = tabClass === 'catalog-tab__artist' ? event.currentTarget.closest('section') : document;
	const targetList = tabClass === 'catalog-tab__artist' ? event.currentTarget.closest('section').querySelectorAll('.period-item__artist-btn') : countryBtns;
	return {
		btnPrev: Array.from(targetList).find((targetItem) => targetItem.classList.contains(`${btnClass}--active`)),
		btnNext: event.currentTarget,
		btnNextData: event.currentTarget.dataset[dataName],
		all: target.querySelectorAll(`.${tabClass}`),
		prev() {
			return Array.from(this.all).find((el) => el.classList.contains(`${tabClass}--visible`));
		},
		next() {
			return target.querySelector(`[data-${tabName}="${this.btnNextData}"]`);
		},
	};
}

function addTabListener(itemList, tabName, tabClass, btnClass, dataName) {
	itemList.forEach((el) => {
		el.addEventListener('click', (event) => {
			if (tabName === 'country') accordion.destroy();
			const item = createItem(event, tabName, tabClass, btnClass, dataName);
			item.prev().classList.add(`${tabClass}--hidden`);
			item.btnNext.classList.add(`${btnClass}--active`);
			item.btnPrev.classList.remove(`${btnClass}--active`);

			setTimeout(() => {
				item.prev().classList.remove(`${tabClass}--visible`, `${tabClass}--hidden`);
			}, 200);

			item.next().classList.remove(`${tabClass}--hidden`);

			setTimeout(() => {
				item.next().classList.add(`${tabClass}--visible`);
				if (tabName === 'country') {
					accordion = new Accordion(`.${tabClass}--visible .accordion-container`);
					accordion.open(openedAccordions[activeCountry.dataset[tabName]] - 1);
				}
			}, 200);

			if (tabName === 'country') {
				activeCountry = document.querySelector(`[data-country="${item.btnNextData}"]`);
			} else if (tabName === 'artist') {
				openedAccordions[activeCountry.dataset.country] = parseInt(item.btnNextData, 10);
			}
		});
	});
}

addTabListener(countryBtns, 'country', 'catalog__tab', 'catalog-nav__btn', 'country_btn');
addTabListener(artistBtns, 'artist', 'catalog-tab__artist', 'period-item__artist-btn', 'artist_btn');
