import Accordion from 'accordion-js';
import * as catalog from './editions_data';

const countryBtns = document.querySelectorAll('.catalog-nav__btn');
const countryDescr = document.querySelector('.catalog-tab__descr');
const artistLists = document.querySelectorAll('.period-item__artist-list');
const artistChoice = document.querySelector('.catalog-tab__choice');
const tab = document.querySelector('.catalog__tab');
const artistWrapper = document.querySelector('.catalog-tab__artist-wrapper');
const artist = {
    img: document.querySelector('.artist__pic'),
    name: document.querySelector('.artist__name'),
    lifeTime: document.querySelector('.artist__lifetime'),
    descr: document.querySelector('.artist__descr'),

    set imgSrc(value) {
        this.img.setAttribute('src', value);
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
    countryDescr.innerText = catalog.descrData[country];
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
        lifeTime, descr, name, imgSrc,
    } = catalog.artistBio[country][artistIndex];

    artist.imgSrc = imgSrc;
    artist.nameVal = name;
    artist.lifeTimeVal = lifeTime;
    artist.descrVal = descr;
}

function chooseArtist(ev) {
    const [country, period, artistIndex] = ev.target.dataset.artistBtn.split('-');
    artistWrapper.classList.add('catalog-tab__artist-wrapper--preanimated');
    setTimeout(() => {
        setArtistBio(country, artistIndex);
        const activeBtn = artistChoice.querySelector('.period-item__btn-artist--active');
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

function switchTab() {
    tab.classList.add('catalog__tab--preanimated');

    setTimeout(() => {
        accordion.closeAll();
        countryBtns.forEach((btn) => btn.classList.remove('catalog-nav__btn--active'));
        this.classList.add('catalog-nav__btn--active');
        artistLists.forEach((list) => {
            list.innerHTML = '';
        });
        const { country } = this.dataset;
        const { artistIndex, period } = selectedArtist[country];
        setStartCatalog(country, period, artistIndex);
        accordion.open(+period);
        tab.classList.remove('catalog__tab--preanimated');
    }, 300);
}

setStartCatalog('ita', 0, 11);
countryBtns.forEach((btn) => {
    btn.addEventListener('click', switchTab);
});
artistChoice.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('period-item__btn-artist')) {
        chooseArtist(ev);
    }
});
