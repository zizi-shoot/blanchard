import '../../node_modules/focus-visible/dist/focus-visible.min';
import smoothscrollPolyfill from 'smoothscroll-polyfill';
import 'smoothscroll-anchor-polyfill';

smoothscrollPolyfill.polyfill();
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
