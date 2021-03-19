export function displayFraction(section) {
  const pagination = document.querySelector(`.${section} .splide__pagination`);
  const { length } = pagination.children;
  const activeSlide = document.querySelector(`.${section} .splide__pagination__page.is-active`).closest('li');
  const indexActiveSlide = Array.from(pagination.children).indexOf(activeSlide) + 1;
  const sliderArrows = document.querySelector(`.${section} .splide__arrows`);
  sliderArrows.setAttribute(`data-${section}-fractions`, `${indexActiveSlide} / ${length}`);
}

export function disableArrowPaginationA11y(section) {
  const arrowsWrapper = section.querySelector('.splide__arrows');
  const arrows = section.querySelectorAll('.splide__arrow');
  const pagination = section.querySelector('.splide__pagination');
  arrowsWrapper.setAttribute('aria-hidden', 'true');
  arrows.forEach((arrow) => {
    arrow.setAttribute('aria-hidden', true);
    arrow.setAttribute('tabindex', '-1');
  });
  pagination && pagination.setAttribute('aria-hidden', 'true');
}
