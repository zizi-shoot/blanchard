import SimpleBar from 'simplebar';

Array.prototype.forEach.call(
	document.querySelectorAll('.simplebar'),
	(el) => new SimpleBar(el, {
		autoHide: false,
		scrollbarMaxSize: 28,
	}),
);
const menu = document.querySelector('.head-bar__menu');
const scrollbarWrappers = document.querySelectorAll('.head-bar__scrollbar-wrapper');

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

const pageHeader = document.querySelector('header');

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
