import GraphModal from '../../js/vendor/graph-modal.min';
import galleryPictures from './gallery_data';

const modal = new GraphModal();

const galleryList = document.querySelector('.gallery__list');
const canvasWrapper = document.querySelector('.canvas__wrapper');

const pictureContent = {
  author: canvasWrapper.querySelector('.canvas__author'),
  name: canvasWrapper.querySelector('.canvas__name'),
  lifeTime: canvasWrapper.querySelector('.canvas__lifetime'),
  descr: canvasWrapper.querySelector('.canvas__descr'),

  set authorVal(value) {
    this.author.innerText = value;
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

function setPictureData(index) {
  const {
    author, descr, name, lifeTime,
  } = galleryPictures[index];

  pictureContent.authorVal = author;
  pictureContent.nameVal = name;
  pictureContent.lifeTimeVal = lifeTime;
  pictureContent.descrVal = descr;
}

galleryList.addEventListener('click', (e) => {
  if (e.target.classList.contains('gallery__slide-btn')) {
    const pictureInner = e.target.previousElementSibling.innerHTML;
    const pictureIndex = e.target.previousElementSibling.querySelector('img').getAttribute('aria-label').split('-')[1];
    const modalPicture = document.querySelector('.canvas__picture');

    modalPicture.innerHTML = pictureInner;
    setPictureData(pictureIndex);
  }
});
