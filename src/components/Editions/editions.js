import Swiper, { Navigation, Pagination } from 'swiper';

const categories = document.querySelectorAll('.categories__label');
const form = document.querySelector('.categories');
const root = document.documentElement;
const title = document.querySelector('.categories__title');
let isInit = false;
let editionsSwiper = null;

const editionsProps = {
	pagination: {
		el: '.editions__pagination',
		type: 'fraction',
	},
	navigation: {
		nextEl: '.editions__btn-next',
		prevEl: '.editions__btn-prev',
	},
	breakpoints: {
		576: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 34,
		},
		767: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 34,
		},
		1024: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 50,
		},
		1366: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 50,
		},
	},
};

Swiper.use([Navigation, Pagination]);

function swiperMode(swiper, selector, props, media) {
	const matchMedia = window.matchMedia(media);
	if (matchMedia.matches) {
		if (!isInit) {
			isInit = true;
			swiper = new Swiper(selector, props);
		}
		return;
	}
	if (isInit) {
		swiper.destroy(false);
		isInit = false;
	}
}

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

window.addEventListener('load', () => {
	swiperMode(editionsSwiper, '.editions__swiper', editionsProps, '(min-width: 577px)');
});

window.addEventListener('resize', () => {
	swiperMode(editionsSwiper, '.editions__swiper', editionsProps, '(min-width: 577px)');
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
