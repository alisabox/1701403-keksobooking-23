const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview>img');
const housingInput = document.querySelector('.ad-form__input');
const housingPreview = document.querySelector('.ad-form__photo');

const imgPreviewHandler = (input, preview) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const createImage = () => {
  const previewImg = document.createElement('img');
  if (housingPreview.hasChildNodes()) {
    housingPreview.removeChild(housingPreview.children[0]);
  }
  housingPreview.appendChild(previewImg);
  previewImg.width = '70';
  previewImg.height = '70';
  previewImg.alt = 'Фотография жилья';
  return previewImg;
};

avatarInput.addEventListener('change', () => imgPreviewHandler(avatarInput, avatarPreview));

housingInput.addEventListener('change', () => {
  imgPreviewHandler(housingInput, createImage());
});
