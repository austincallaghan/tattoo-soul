import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

import './cropModal.css';

const CropImage = props => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(4 / 3);
  const [visible, setVisibility] = useState(false);
  const [srcImg, setSrcImg] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const createImage = url =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });

  /**
   * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
   * @param {File} image - Image File url
   * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
   */
  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = image.width * 2;
    canvas.height = image.height * 2;
    ctx.translate(image.width, image.height);
    ctx.translate(-image.width, -image.height);

    ctx.drawImage(image, image.width / 2, image.height / 2);
    const data = ctx.getImageData(
      0,
      0,
      image.width * 2,
      image.height * 2,
    );

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
      data,
      0 - image.width / 2 - pixelCrop.x,
      0 - image.height / 2 - pixelCrop.y,
    );

    const base64Image = canvas.toDataURL('image/jpeg');
    return new Promise(resolve => {
      canvas.toBlob(blob => {
        console.log('blob', blob, 'base', base64Image);
        resolve(URL.createObjectURL(blob));
        props.setBlobAndBase64(blob, base64Image);
      }, 'image/jpeg');
    });
  };

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener('load', () => setSrcImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setVisibility(true);
    }
  };

  const OnSubmit = async () => {
    try {
      await getCroppedImg(srcImg, croppedAreaPixels);
    } catch (e) {
      console.error(e);
    }

    props.closeAndOpen ? props.closeAndOpen() : props.closeModal();
  };

  return (
    <div className="crop-modal--container">
      <div className="crop-modal--temp">
        <div
          className="crop-modal--back-nav"
          onClick={props.closeModal}
        >
          <i class="fas fa-arrow-left" />
        </div>
        {visible ? (
          <Cropper
            image={srcImg}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        ) : (
          <div className="crop-modal--choose-file">
            <input
              type="file"
              hidden
              name="file"
              id="file"
              className="inputfile"
              onChange={onSelectFile}
            />
            <label htmlFor="file">Choose a file</label>
          </div>
        )}
      </div>

      <div className="crop-modal--dialogue">
        <div className="crop-modal--aspects">
          <div onClick={() => setAspect(4 / 3)}>4 : 3</div>
          <div onClick={() => setAspect(3 / 2)}>3 : 2</div>
          <div onClick={() => setAspect(1 / 1)}>1 : 1</div>
          <div onClick={() => setAspect(2 / 3)}>2 : 3</div>
          <div onClick={() => setAspect(3 / 4)}>3 : 4</div>
        </div>
        {visible && (
          <div className="crop-modal--cta" onClick={OnSubmit}>
            {props.cta ? props.cta : 'Submit'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropImage;
