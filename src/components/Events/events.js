const moreBtn = document.querySelector('.events__btn-more');

function showMoreEvents() {
	const hiddenEvents = document.querySelectorAll('.events__item--hidden');
	hiddenEvents.forEach((el) => el.classList.remove('events__item--hidden'));
	moreBtn.innerText = 'Показать меньше';
	moreBtn.removeEventListener('click', showMoreEvents);
	moreBtn.addEventListener('click', showLessEvents);
}

function showLessEvents() {
	const events = document.querySelectorAll('.events__item');
	for (let i = 3; i < events.length; i++) {
		events[i].classList.add('events__item--hidden');
		moreBtn.innerText = 'Все события';
	}
	moreBtn.closest('section').scrollIntoView({ block: 'start', behavior: 'smooth' });
	moreBtn.removeEventListener('click', showLessEvents);
	moreBtn.addEventListener('click', showMoreEvents);
}

moreBtn.addEventListener('click', showMoreEvents);
