import SimpleBar from 'simplebar';

const dropdown = document.querySelector('.head-bar__menu');
const scrollbarWrappers = document.querySelectorAll('.head-bar__scrollbar-wrapper');
const burgerBtn = document.querySelector('.burger');
const searchBtn = document.querySelector('.header__btn-search');
const searchForm = document.querySelector('.header__search');
const triggerBtn = document.querySelector('.header__btn-trigger');
const pageHeader = document.querySelector('header');
const burgerMenu = document.querySelector('.header__nav');
const navList = document.querySelector('.head-nav__list');

function hideDropdown(ev) {
	if (!ev.target.closest('.head-bar__item')) {
		scrollbarWrappers.forEach((el) => {
			el.classList.remove('head-bar__scrollbar-wrapper--visible');
			document.removeEventListener('click', hideDropdown);
		});
	}
}

function toggleSearch() {
	searchForm.classList.toggle('header__search--visible');
	const timeOut = triggerBtn.dataset.mode === 'lens' ? 300 : 0;
	setTimeout(() => {
		triggerBtn.dataset.mode = triggerBtn.dataset.mode === 'lens' ? 'cross' : 'lens';
	}, timeOut);
}

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

dropdown.addEventListener('click', (ev) => {
	scrollbarWrappers.forEach((e) => {
		if (e !== ev.target.nextElementSibling) {
			e.classList.remove('head-bar__scrollbar-wrapper--visible');
		}
	});
	const target = ev.target.localName === 'button' ? ev.target : ev.target.querySelector('.head-bar__btn-open');
	target.nextElementSibling.classList.toggle('head-bar__scrollbar-wrapper--visible');
	document.addEventListener('click', hideDropdown);
});

// Анимация дропдаунов

pageHeader.addEventListener('animationstart', (e) => {
	if (e.animationName === 'fade-in') {
		e.target.classList.add('did-fade-in');
	}
});
pageHeader.addEventListener('animationend', (e) => {
	if (e.animationName === 'fade-out') {
		e.target.classList.remove('did-fade-in');
	}
});

// Раскрытие/скрытие строки поиска при ширине экрана от 576 до 1024px

searchBtn.addEventListener('click', (ev) => {
	if (!searchForm.classList.contains('header__search--expanded')) {
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

// Появление/скрытие строки поиска при ширине экрана меньше 576px

triggerBtn.addEventListener('click', () => {
	// eslint-disable-next-line no-unused-expressions
	window.innerWidth <= 576 && toggleSearch();
});

// Simlebar
Array.prototype.forEach.call(
	document.querySelectorAll('.simplebar'),
	(el) => new SimpleBar(el, {
		autoHide: false,
		scrollbarMaxSize: 28,
	}),
);
