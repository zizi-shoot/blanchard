export default function displayFraction(section) {
	const pagination = document.querySelector(`.${section} .splide__pagination`);
	const { length } = pagination.children;
	const activeSlide = document.querySelector(`.${section} .splide__pagination__page.is-active`).closest('li');
	const indexActiveSlide = Array.from(pagination.children).indexOf(activeSlide) + 1;
	const sliderArrows = document.querySelector(`.${section} .splide__arrows`);
	sliderArrows.setAttribute(`data-${section}-fractions`, `${indexActiveSlide} / ${length}`);
}
