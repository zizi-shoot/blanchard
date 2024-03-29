import Accordion from 'accordion-js';
import * as catalog from './editions_data';

const countryNav = document.querySelector('.catalog-nav__list');
const artistLists = document.querySelectorAll('.period-item__artist-list');
const picture = document.querySelector('.artist__picture');
const artist = {
  picture,
  srcSet1025: picture.querySelector('[media="(min-width: 1025px)"]'),
  srcSet577: picture.querySelector('[media="(min-width: 577px)"]'),
  srcSet: picture.querySelector('source:nth-last-of-type(1)'),
  src: picture.querySelector('img'),
  name: document.querySelector('.artist__name'),
  lifeTime: document.querySelector('.artist__lifetime'),
  descr: document.querySelector('.artist__descr'),

  set srcSets([value1025, value577, value, src]) {
    this.srcSet1025.srcset = value1025;
    this.srcSet577.srcset = value577;
    this.srcSet.srcset = value;
    this.src.src = src;
  },
  set nameVal(value) {
    this.name.innerText = value;
  },
  set lifeTimeVal(value) {
    this.lifeTime.innerText = value;
  },
  set descrVal(value) {
    this.descr.innerText = value;
  },
};
const selectedArtist = {
  fra: {
    period: 0,
    artistIndex: 11,
  },
  ger: {
    period: 0,
    artistIndex: 11,
  },
  ita: {
    period: 0,
    artistIndex: 11,
  },
  rus: {
    period: 0,
    artistIndex: 11,
  },
  bel: {
    period: 0,
    artistIndex: 11,
  },
};
const accordion = new Accordion('.accordion-container');

function setCountryDescr(country) {
  document.querySelector('.catalog-tab__descr').innerText = catalog.descrData[country];
}

function setArtistList(country) {
  artistLists.forEach((list) => {
    const periodIndex = Array.from(artistLists).indexOf(list);
    const artistNames = catalog.artistList[country][periodIndex];
    for (const index in artistNames) {
      const name = artistNames[index];
      const listItem = `
				<li class="period-item__artist-item">
					<button class="period-item__btn-artist" data-artist-btn="${country}-${periodIndex}-${+index}">${name}</button>
				</li>
			`;
      list.insertAdjacentHTML('beforeend', listItem);
    }
  });
}

function setArtistBio(country, artistIndex) {
  const {
    lifeTime, descr, name, srcSet1025, srcSet577, srcSet, src,
  } = catalog.artistBio[country][artistIndex];

  artist.srcSets = [srcSet1025, srcSet577, srcSet, src];
  artist.nameVal = name;
  artist.lifeTimeVal = lifeTime;
  artist.descrVal = descr;
}

function chooseArtist(ev) {
  const [country, period, artistIndex] = ev.target.dataset.artistBtn.split('-');
  const artistWrapper = document.querySelector('.catalog-tab__artist-wrapper');

  artistWrapper.classList.add('catalog-tab__artist-wrapper--preanimated');
  setTimeout(() => {
    setArtistBio(country, artistIndex);
    const activeBtn = document.querySelector('.period-item__btn-artist--active');
    activeBtn.classList.remove('period-item__btn-artist--active');
    ev.target.classList.add('period-item__btn-artist--active');
    selectedArtist[country] = {
      period: +period,
      artistIndex: +artistIndex,
    };
    artistWrapper.classList.remove('catalog-tab__artist-wrapper--preanimated');
  }, 300);
}

function setStartCatalog(country, period, artistIndex) {
  setArtistList(country);
  setCountryDescr(country);
  setArtistBio(country, artistIndex);

  const activeData = `${country}-${period}-${artistIndex}`;
  const activeBtn = document.querySelector(`[data-artist-btn="${activeData}"]`);

  activeBtn.classList.add('period-item__btn-artist--active');
  accordion.open(+period);
}

function switchTab(target) {
  const tab = document.querySelector('.catalog__tab');

  tab.classList.add('catalog__tab--preanimated');
  setTimeout(() => {
    const countryBtns = document.querySelectorAll('.catalog-nav__btn');

    accordion.closeAll();
    countryBtns.forEach((btn) => btn.classList.remove('catalog-nav__btn--active'));
    target.classList.add('catalog-nav__btn--active');
    artistLists.forEach((list) => {
      list.innerHTML = '';
    });
    const { country } = target.dataset;
    const { artistIndex, period } = selectedArtist[country];
    setStartCatalog(country, period, artistIndex);
    accordion.open(+period);
    tab.classList.remove('catalog__tab--preanimated');
  }, 300);
}

setStartCatalog('ita', 0, 11);
countryNav.addEventListener('click', (e) => {
  if (e.target.classList.contains('catalog-nav__btn')) {
    switchTab(e.target);
  }
});
document.querySelector('.catalog-tab__choice').addEventListener('click', (ev) => {
  if (ev.target.classList.contains('period-item__btn-artist')) {
    chooseArtist(ev);
    if (window.innerWidth <= 992) {
      const artistPosition = document.querySelector('.catalog-tab__artist-wrapper').offsetTop;
      window.scrollTo({
        top: artistPosition - 15,
        behavior: 'smooth',
      });
    }
  }
});
