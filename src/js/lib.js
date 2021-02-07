import Swiper, { Pagination } from 'swiper';

Swiper.use([Pagination]);

export default function toggleSwiper(swiper, props, target, media) {
	const matchMedia = window.matchMedia(`(${media})`);
	console.log(target, matchMedia.matches);
	if (matchMedia.matches) {
		if (target.dataset.swiper === 'false') {
			target.dataset.swiper = 'true';
		}
		return new Swiper(target, props);
	}
	if (target.dataset.swiper === 'true') {
		swiper.destroy();
		target.dataset.swiper = 'false';
		return null;
	}
}
