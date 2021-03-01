import SimpleBar from 'simplebar';

const scrollbarWrappers = document.querySelectorAll('.head-bar__scrollbar-wrapper');
const burgerBtn = document.querySelector('.burger');
const searchBtn = document.querySelector('.header__btn-search');
const searchForm = document.querySelector('.header__search');
const triggerBtn = document.querySelector('.header__btn-trigger');
const burgerMenu = document.querySelector('.header__nav');
const navList = document.querySelector('.head-nav__list');
const dropDownBtns = document.querySelectorAll('.head-bar__btn-open');

function toggleDropdown() {
	scrollbarWrappers.forEach((wrapper) => {
		if (wrapper !== this.nextElementSibling) {
			wrapper.classList.remove('head-bar__scrollbar-wrapper--visible');
		}
	});

	this.nextElementSibling.classList.toggle('head-bar__scrollbar-wrapper--visible');
}

function toggleSearch() {
	searchForm.classList.toggle('header__search--visible');
	const timeOut = triggerBtn.dataset.mode === 'lens' ? 300 : 0;
	setTimeout(() => {
		triggerBtn.dataset.mode = triggerBtn.dataset.mode === 'lens' ? 'cross' : 'lens';
	}, timeOut);
}

/*
 Открытие/скрытие дропдаунов
 */
dropDownBtns.forEach((btn) => {
	btn.addEventListener('click', toggleDropdown);
});

document.addEventListener('click', (ev) => {
	if (!ev.target.closest('.head-bar__item')) {
		scrollbarWrappers.forEach((wrapper) => {
			wrapper.classList.remove('head-bar__scrollbar-wrapper--visible');
		});
	}
});

/*
 Открытие/скрытие меню
 */
burgerBtn.addEventListener('click', (ev) => {
	ev.currentTarget.classList.toggle('burger--active');
	burgerMenu.classList.toggle('header__nav--opened');
	document.body.classList.toggle('disable-scroll');
});

navList.addEventListener('click', () => {
	document.body.classList.remove('disable-scroll');
	setTimeout(() => {
		burgerBtn.classList.remove('burger--active');
		burgerMenu.classList.remove('header__nav--opened');
	}, 700);
});

window.addEventListener('resize', () => {
	if (window.innerWidth <= 1024 && burgerMenu.getAttribute('aria-hidden') !== 'true' && !burgerMenu.classList.contains('header__nav--opened')) {
		burgerMenu.setAttribute('aria-hidden', 'true');
	}
});

/*
 Раскрытие/скрытие строки поиска при ширине экрана от 576 до 1024px
 */
searchBtn.addEventListener('click', (ev) => {
	if (!searchForm.classList.contains('header__search--expanded') && window.innerWidth > 576) {
		ev.preventDefault();
		searchForm.classList.add('header__search--expanded');
		ev.stopPropagation();
		document.addEventListener('click', (event) => {
			if (!event.target.closest('form') && window.innerWidth > 768) {
				searchForm.classList.remove('header__search--expanded');
			}
		});
		triggerBtn.addEventListener('click', () => {
			searchForm.classList.remove('header__search--expanded');
		});
	}
});

/*
 Появление/скрытие строки поиска при ширине экрана меньше 576px
 */
triggerBtn.addEventListener('click', () => {
	// eslint-disable-next-line no-unused-expressions
	window.innerWidth <= 576 && toggleSearch();
});

/*
 Simlebar
 */
Array.prototype.forEach.call(
	document.querySelectorAll('.simplebar'),
	(el) => new SimpleBar(el, {
		autoHide: false,
		scrollbarMaxSize: 28,
	}),
);
