const imageButton = document.querySelector('#image-button');
const imageInput = document.querySelector('#image-input');
const previewDiv = document.querySelector('#preview-div');

imageButton.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', () => {
  const preview = document.querySelector('#preview-image');

  if (preview) {
    preview.remove();
  }

  const reader = new FileReader();

  reader.onload = event => {
    const previewImage = document.createElement('img');
    previewImage.width = 115;
    previewImage.height = 115;
    previewImage.id = 'preview-image';
    previewImage.classList.add('pb-2');
    previewImage.src = event.target.result;
    previewDiv.appendChild(previewImage);
  };

  reader.readAsDataURL(imageInput.files[0]);
});
