ymaps.ready(init);

function init() {
	const myMap = new ymaps.Map('map', {
		center: [55.758463, 37.601079],
		zoom: 15,
		controls: [],
	});
	myMap.controls.add('zoomControl', {
		size: 'small',
		float: 'none',
		position: {
			bottom: '350px',
			right: '30px',
		},
	});
	myMap.controls.add('geolocationControl', {
		float: 'none',
		position: {
			bottom: '300px',
			right: '30px',
		},
	});
	const myPlacemark1 = new ymaps.Placemark([55.758463, 37.601079], {}, {
		iconLayout: 'default#image',
		iconImageHref: '/img/sprite.svg#placemark',
		iconImageSize: [40, 40],
		iconImageOffset: [-15, -27],
	});
	myMap.geoObjects.add(myPlacemark1);
}

function calcFormPaddingLeft() {
	const pageContainer = document.querySelector('.page-container');
	const connectForm = document.querySelector('.contacts__connect');
	const containerPadding = window.innerWidth <= 1024 ? 50 : 30;
	connectForm.style.paddingLeft = `${pageContainer.offsetLeft + containerPadding}px`;
}

document.addEventListener('DOMContentLoaded', calcFormPaddingLeft);
window.addEventListener('resize', calcFormPaddingLeft);
