import Splide from '@splidejs/splide';

const moreBtn = document.querySelector('.events__btn-more');
const events = document.querySelectorAll('.events__item');
const eventsOptions = {
	destroy: true,
	arrows: false,
	breakpoints: {
		576: {
			perPage: 1,
			gap: '27px',
		},
	},
};
const eventsSlider = new Splide('.events__slider', eventsOptions);

function calcEventsPerLine() {
	let eventsPerLine = null;
	const windowWidth = window.innerWidth;
	if (windowWidth <= 576) eventsPerLine = 1;
	if (windowWidth > 576) eventsPerLine = 2;
	if (windowWidth > 992) eventsPerLine = 3;
	events.forEach((ev) => ev.classList.remove('events__item--hidden'));
	for (let i = eventsPerLine; i < events.length; i++) {
		events[i].classList.add('events__item--hidden');
	}
	return eventsPerLine;
}

function showMoreEvents() {
	const hiddenEvents = document.querySelectorAll('.events__item--hidden');
	hiddenEvents.forEach((el) => el.classList.remove('events__item--hidden'));
	moreBtn.innerText = 'Показать меньше';
	moreBtn.removeEventListener('click', showMoreEvents);
	// eslint-disable-next-line no-use-before-define
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

eventsSlider.mount();
calcEventsPerLine();
moreBtn.addEventListener('click', showMoreEvents);
window.addEventListener('resize', calcEventsPerLine);
