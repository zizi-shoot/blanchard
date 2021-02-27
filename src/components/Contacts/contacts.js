import Inputmask from 'inputmask';

/*
 Яндекс.Карта
 */
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
	const placeData = {
		iconLayout: 'default#image',
		iconImageHref: '../img/sprite.svg#placemark',
		iconImageSize: [40, 40],
		iconImageOffset: [-15, -27],
	};
	const myPlacemarkMain = new ymaps.Placemark([55.758463, 37.601079], {}, placeData);
	const myPlacemarkMob = new ymaps.Placemark([55.758463, 37.601079], {}, placeData);

	mainMap.controls
		.add('zoomControl', { size: 'small' })
		.add('geolocationControl', {});
	mainMap.geoObjects.add(myPlacemarkMain);
	mobMap.controls
		.add('zoomControl', { size: 'small' })
		.add('geolocationControl', {});
	mobMap.geoObjects.add(myPlacemarkMob);
}

/*
 Маска для ввода телефона
 */

const im = new Inputmask('+7(999) 999-99-99');
const inputTel = document.querySelector('.callback-form__input[type="tel"]');
im.mask(inputTel);

/*
 Валидация формы обратного звонка
 */
const validateOptions = {
	rules: {
		name: {
			required: true,
			minLength: 2,
		},
		phone: {
			required: true,
			function: () => {
				const phone = inputTel.inputmask.unmaskedvalue();
				return Number(phone) && phone.length === 10;
			},
		},
	},
	messages: {
		name: {
			required: 'Укажите Ваше имя',
			minLength: 'Имя должно содержать хотя бы 2 буквы',
		},
		phone: {
			required: 'Укажите Ваш телефон',
			function: 'Телефон должен содержать 10 цифр',
		},
	},
	focusWrongField: true,
};
const validate = new window.JustValidate('.callback-form', validateOptions);
