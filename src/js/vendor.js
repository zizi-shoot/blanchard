import '../../node_modules/focus-visible/dist/focus-visible.min';
import smoothscrollPolyfill from 'smoothscroll-polyfill';
import 'smoothscroll-anchor-polyfill';
import 'just-validate/dist/js/just-validate.min';

smoothscrollPolyfill.polyfill();

/*
 * Расчёт высоты вьюпорта для мобильных устройств
 * Safari iOS по умолчанию не вычитает высоту адресной строки из 100vh
 */
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
	vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});
