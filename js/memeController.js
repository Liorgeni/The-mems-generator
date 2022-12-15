"use strict";

// Global vars

const TOUCH_EVS = ["touchstart", "touchmove", "touchend"];

let gElCanvas;
let gCtx;
let isDrag = false;

// let fontSize = gMeme.lines[0].size;
// let gFillColor = gMeme.lines[0].color;

let fontSize = 10;
let gFillColor = "white";
let gStrokelColor = "black";

function onInit() {
  gElCanvas = document.getElementById("my-canvas");
  gCtx = gElCanvas.getContext("2d");
  renderGallery();
  resizeCanvas();
  //   addListeners();
  renderCanvas();
}

// Renders

function renderGallery() {
  const images = getImages();
  console.log(images);
  var strHTML = images.map(
    (img) =>
      `<img onclick="onSelectMeme(${img.id})" src="${img.url}"} alt="" />`
  );

  document.querySelector(".gallery").innerHTML = strHTML.join();
}

// onSelectMeme(){

// }

function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  gElCanvas.width = 500;
  gElCanvas.height = 500;
  console.log(elContainer);
  console.log(gElCanvas.width);
}

function renderCanvas() {
  gCtx.fillStyle = "white";
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function renderMeme() {
  const gMeme = getGMeme();
  const curImg = getCurImg();
  console.log(curImg.url);
  const imageToDraw = new Image();
  imageToDraw.src = curImg.url;
  imageToDraw.onload = function () {
    gCtx.drawImage(imageToDraw, 0, 0, gElCanvas.width, gElCanvas.height);
  };
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

// Actions

function onSelectMeme(id) {
  setGMeme(id);
  renderMeme();
}

function onTextInput(text) {
  setLineTxt(text);
  drawText(text, 100, 100);
}

function onIncreaseFont() {
  fontSize = fontSize + 3;
  increaseFontSize();
}

function onDecreaseFont() {
  fontSize = fontSize - 3;
  decreaseFontSize();
}

function onChangeTextColor(val) {
  gFillColor = val;
  changeTextColor(val);
}

// Set Colors

function drawText(text, x, y) {
  console.log(fontSize);
  gCtx.lineWidth = 1;
  gCtx.strokeStyle = gStrokelColor;
  gCtx.fillStyle = gFillColor;
  gCtx.font = fontSize + "px arial";
  gCtx.textAlign = "left";
  gCtx.textBaseline = "middle";
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
  gCtx.fill();
}

// const defaultLine = {
//   txt: "",
//   size: 20,
//   align: "left",
//   color: "trasparent",
// };
// Mouse Events

// function onDown(ev) {
//   isDrag = true;
//   moveText(ev);
// }

// function onMove(ev) {
//   if (!isDrag) return;
//   moveText(ev);
// }

// function onUp() {
//   isDrag = false;
// }

// function moveText(ev) {
//   const { offsetX, offsetY } = ev;
//   console.log("offsetX, offsetY:", offsetX, offsetY);
// }

// On Download-Upload

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg);
}

function onUploadImg() {
  const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    );
  }
  doUploadImg(imgDataUrl, onSuccess);
}

// Listeners

// function addListeners() {
//   addMouseListeners();
//   addTouchListeners();
//   window.addEventListener("resize", () => {
//     resizeCanvas();
//     renderCanvas();
//   });
// }

// function addMouseListeners() {
//   gElCanvas.addEventListener("mousemove", onMove);
//   gElCanvas.addEventListener("mousedown", onDown);
//   gElCanvas.addEventListener("mouseup", onUp);
// }

// function addTouchListeners() {
//   gElCanvas.addEventListener("touchmove", onMove);
//   gElCanvas.addEventListener("touchstart", onDown);
//   gElCanvas.addEventListener("touchend", onUp);
// }

// On Search

function onKeyUpSearch() {
  setTimeout(() => {
    const searchStr = document.querySelector(".search-Input").value;
    const filterBy = setFilterBy(searchStr);
    renderGallery();
    document.querySelector(".search-Input").value = searchStr;

    const queryStringParams = `?keyWords=${filterBy.keyWords}`;
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      queryStringParams;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }, 1500);
}
