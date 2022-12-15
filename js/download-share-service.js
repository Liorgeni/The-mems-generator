"use strict";

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append("img", imgDataUrl);
  fetch("//ca-upload.com/here/upload.php", { method: "POST", body: formData })
    .then((res) => res.text())
    .then((url) => {
      onSuccess(url);
    });
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader();
  reader.onload = (event) => {
    let img = new Image();
    img.src = event.target.result;
    img.onload = () => onImageReady(img);
  };

  reader.readAsDataURL(ev.target.files[0]);
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  elLink.href = data;
}

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL();
  elLink.href = imgContent;
}
