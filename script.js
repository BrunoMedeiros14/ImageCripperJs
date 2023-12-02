const imageButton = document.querySelector('#image-button');
const imageInput = document.querySelector('#image-input');
const previewDiv = document.querySelector('#cropCanva');
const modal = document.querySelector('#modal');
const removeCropBtn = document.querySelector('#removeCropBtn');
const addCropBtn = document.querySelector('#addCropBtn');
const previewDivImage = document.querySelector('#previewDivImage');
let cropper;

let prev = document.querySelectorAll('#previewCrop');

const crop = image => {
  return new Cropper(image, {
    dragMode: 'move',
    aspectRatio: 1,
    viewMode: 1,
    preview: prev,
  });
};

const addUpdatedImage = src => {
  const updatedImage = document.createElement('img');
  const actualImage = document.querySelector('#updatedImage');

  if (actualImage) {
    actualImage.remove();
  }

  updatedImage.id = 'updatedImage';
  updatedImage.width = 100;
  updatedImage.height = 100;
  updatedImage.src = src;
  previewDivImage.appendChild(updatedImage);
};

imageButton.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', () => {
  const preview = document.querySelector('#preview-image');
  const previewImage = document.createElement('img');

  if (preview) {
    preview.remove();
  }

  const reader = new FileReader();

  reader.onload = event => {
    previewImage.id = 'preview-image';
    previewImage.width = '100%';
    previewImage.src = event.target.result;
    previewDiv.appendChild(previewImage);
    cropper = crop(previewImage);
    modal.classList.remove('visually-hidden');
  };

  reader.readAsDataURL(imageInput.files[0]);
});

addCropBtn.addEventListener('click', event => {
  if (cropper.cropped) {
    cropper.getCroppedCanvas().toBlob(async blob => {
      const objectURL = URL.createObjectURL(blob);
      addUpdatedImage(objectURL);
      cropper.destroy();
      modal.classList.add('visually-hidden');
    });
  }
});

removeCropBtn.addEventListener('click', event => {
  cropper.destroy();
  modal.classList.add('visually-hidden');
});
