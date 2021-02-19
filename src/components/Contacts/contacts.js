ymaps.ready(init);

function init() {
	const mainMap = new ymaps.Map('map', {
		center: [55.758463, 37.601079],
		zoom: 15,
		controls: [],
	});
	const mobMap = new ymaps.Map('map-mobile', {
		center: [55.758463, 37.601079],
		zoom: 15,
		controls: [],
	});

	const myPlacemark1 = new ymaps.Placemark([55.758463, 37.601079], {}, {
		iconLayout: 'default#image',
		iconImageHref: 'img/sprite.svg#placemark',
		iconImageSize: [40, 40],
		iconImageOffset: [-15, -27],
	});
	mainMap.controls
		.add('zoomControl', { size: 'small' })
		.add('geolocationControl', {});
	mainMap.geoObjects.add(myPlacemark1);
	mobMap.controls
		.add('zoomControl', { size: 'small' })
		.add('geolocationControl', {});
	mobMap.geoObjects.add(myPlacemark1);
}
