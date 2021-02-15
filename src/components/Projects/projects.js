import Splide from '@splidejs/splide';
import tippy from 'tippy.js';

const projectsOptions = {
	classes: {
		arrows: 'projects__arrows splide__arrows',
		arrow: 'projects__arrow splide__arrow',
		prev: 'projects__arrow--prev splide__arrow--prev',
		next: 'projects__arrow--next splide__arrow--next',
	},
	pagination: false,
	gap: 50,
	perPage: 3,
	breakpoints: {
		1024: {
			perPage: 2,
			gap: 50,
		},
		768: {
			perPage: 2,
			gap: 34,
		},
		567: {
			perPage: 1,
			gap: 21,
		},
	},
};
const tippySettings = {
	theme: 'tooltip',
	maxWidth: 264,
};
const projectsSlider = new Splide('.projects__slider', projectsOptions);
projectsSlider.mount();

tippy('#tooltip-1', {
	content: 'Пример современных тенденций - современная методология разработки',
	...tippySettings,
});
tippy('#tooltip-2', {
	content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
	...tippySettings,
});
tippy('#tooltip-3', {
	content: 'В стремлении повысить качество',
	...tippySettings,
});

const tooltips = document.querySelectorAll('[id*="tooltip-"]');
const isIOS = /iPhone|iPad|iPod/.test(navigator.platform);
tooltips.forEach((button) => {
	tippy(button, {
		onShow() {
			if (isIOS) {
				button.click();
				console.log(isIOS);
			}
		},
	});
	button.addEventListener('click', (ev) => {
		console.log(ev.currentTarget.getAttribute('id'));
	});
});
