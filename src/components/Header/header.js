import SimpleBar from 'simplebar';

const menu = document.querySelector('.head-bar__menu');
const scrollbarWrappers = document.querySelectorAll('.head-bar__scrollbar-wrapper');
const burgerBtn = document.querySelector('.burger');
const searchBtn = document.querySelector('.header__btn-search');
const searchForm = document.querySelector('.header__search');
const pageHeader = document.querySelector('header');
const burgerMenu = document.querySelector('.header__nav');

Array.prototype.forEach.call(
	document.querySelectorAll('.simplebar'),
	(el) => new SimpleBar(el, {
		autoHide: false,
		scrollbarMaxSize: 28,
	}),
);

burgerBtn.addEventListener('click', (ev) => {
	ev.currentTarget.classList.toggle('burger--active');
	burgerMenu.classList.toggle('header__nav--opened');
});

burgerMenu.addEventListener('click', () => {
	setTimeout(() => {
		burgerBtn.classList.remove('burger--active');
		burgerMenu.classList.remove('header__nav--opened');
	}, 700);
});

searchBtn.addEventListener('click', (ev) => {
	if (!searchForm.classList.contains('header__search--expanded')) {
		searchForm.classList.add('header__search--expanded');
		ev.stopPropagation();
		document.addEventListener('click', (event) => {
			if (!event.target.closest('form')) {
				searchForm.classList.remove('header__search--expanded');
			}
		});
	}
});

function hideMenuFromOut(ev) {
	if (!ev.target.closest('.head-bar__item')) {
		scrollbarWrappers.forEach((el) => {
			el.classList.remove('head-bar__scrollbar-wrapper--visible');
			document.removeEventListener('click', hideMenuFromOut);
		});
	}
}

menu.addEventListener('click', (ev) => {
	scrollbarWrappers.forEach((e) => {
		if (e !== ev.target.nextElementSibling) {
			e.classList.remove('head-bar__scrollbar-wrapper--visible');
		}
	});
	const target = ev.target.localName === 'button' ? ev.target : ev.target.querySelector('.head-bar__btn-open');
	target.nextElementSibling.classList.toggle('head-bar__scrollbar-wrapper--visible');
	document.addEventListener('click', hideMenuFromOut);
});

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
