import Swiper, { Pagination } from 'swiper';

Swiper.use([Pagination]);

const moreBtn = document.querySelector('.events__btn-more');
const events = document.querySelectorAll('.events__item');
let isInit = false;
let eventsSwiper = null;

const eventsProps = {
	pagination: {
		el: '.events__pagination',
		clickable: true,
	},
};

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

function calcEventsPerLine() {
	let eventsPerLine = null;
	const windowWidth = window.innerWidth;
	if (windowWidth <= 576) eventsPerLine = 1;
	if (windowWidth > 576) eventsPerLine = 2;
	if (windowWidth > 992) eventsPerLine = 3;
	events.forEach((ev) => ev.classList.remove('events__item--hidden'));
	for (let i = eventsPerLine; i < events.length; i++) {
		events[i].classList.toggle('events__item--hidden');
	}
	return eventsPerLine;
}

document.addEventListener('DOMContentLoaded', calcEventsPerLine);
window.addEventListener('resize', calcEventsPerLine);

function showMoreEvents() {
	const hiddenEvents = document.querySelectorAll('.events__item--hidden');
	hiddenEvents.forEach((el) => el.classList.remove('events__item--hidden'));
	moreBtn.innerText = 'Показать меньше';
	moreBtn.removeEventListener('click', showMoreEvents);
	moreBtn.addEventListener('click', showLessEvents);
}

function showLessEvents() {
	const eventsPerLine = calcEventsPerLine();
	for (let i = eventsPerLine; i < events.length; i++) {
		events[i].classList.add('events__item--hidden');
		moreBtn.innerText = 'Все события';
	}
	moreBtn.closest('section').scrollIntoView({ block: 'start', behavior: 'smooth' });
	moreBtn.removeEventListener('click', showLessEvents);
	moreBtn.addEventListener('click', showMoreEvents);
}

moreBtn.addEventListener('click', showMoreEvents);

window.addEventListener('load', () => {
	swiperMode(eventsSwiper, '.events__wrapper', eventsProps, '(max-width: 576px)');
});

window.addEventListener('resize', () => {
	swiperMode(eventsSwiper, '.events__wrapper', eventsProps, '(max-width: 576px)');
});
