import Splide from '@splidejs/splide';
import displayFraction from '../../js/lib';

const categories = document.querySelectorAll('.categories__label');
const form = document.querySelector('.categories');
const root = document.documentElement;
const title = document.querySelector('.categories__title');
const editionsOptions = {
	classes: {
		arrows: 'editions__arrows splide__arrows',
		arrow: 'editions__arrow splide__arrow',
		prev: 'editions__arrow--prev splide__arrow--prev',
		next: 'editions__arrow--next splide__arrow--next',
		pagination: 'editions__pagination splide__pagination',
	},
	gap: 50,
	perPage: 3,
	breakpoints: {
		1366: {
			gap: 50,
			perPage: 2,
		},
		768: {
			gap: 34,
			perPage: 2,
		},
		576: {
			destroy: 'completely',
		},
	},
};
let editionsSlider = new Splide('.editions__slider', editionsOptions);

function expandForm(target) {
	const totalHeight = title.offsetHeight + (title.offsetHeight - 1) * categories.length;
	target.classList.remove('categories--collapsed');
	root.style.setProperty('--categoriesHeight', `${totalHeight}px`);
	target.classList.add('categories--expanded');
}

function collapseForm(target, height) {
	root.style.setProperty('--categoriesHeight', `${height}px`);
	target.classList.add('categories--collapsed');
	setTimeout(() => {
		target.classList.remove('categories--expanded');
	}, 300);
}

function calcFormHeight() {
	const selectedCategories = document.querySelectorAll('.categories__label[data-checked="true"]');
	return title.offsetHeight + (title.offsetHeight - 1) * selectedCategories.length;
}

editionsSlider
	.mount()
	.on('active mounted', () => {
		displayFraction('editions');
	});

window.addEventListener('resize', () => {
	if (window.innerWidth > 576 && editionsSlider.State.is(editionsSlider.STATES.DESTROYED)) {
		editionsSlider = new Splide('.editions__slider', editionsOptions)
			.mount()
			.on('active mounted', () => {
				displayFraction('editions');
			});
		displayFraction('editions');
	}
	if (window.innerWidth <= 576) collapseForm(form, calcFormHeight());
});

collapseForm(form, calcFormHeight());

title.addEventListener('click', () => {
	const isExpanded = form.classList.contains('categories--expanded');
	isExpanded ? collapseForm(form, calcFormHeight()) : expandForm(form);
});

categories.forEach((category) => {
	category.addEventListener('click', (event) => {
		event.currentTarget.dataset.checked = event.currentTarget.querySelector('input').checked ? 'true' : 'false';
	});
});
