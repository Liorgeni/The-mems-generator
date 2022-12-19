"use strict";

// Global vars
const CANVAS_PADDING = 360;
const TOUCH_EVS = ["touchstart", "touchmove", "touchend"];

let gElCanvas;
let gCtx;
let isDrag = false;
let isText = false;
let isImgSelected = false;
let gLastOffsetX;
let gLastOffsetY;
let gDiffX;
let gDiffY;
let isDownloading = false;

// Renders

function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  CANVAS_PADDING;
  gElCanvas.width = elContainer.offsetWidth - CANVAS_PADDING;
  gElCanvas.height = elContainer.offsetWidth - CANVAS_PADDING;
}

function renderMeme() {
  const curImg = getCurImg();
  if (!getCurImg) {
    return;
  }
  const imageToDraw = new Image();
  const lines = getGMemeLines();
  imageToDraw.src = curImg.url;
  imageToDraw.onload = function () {
    gCtx.drawImage(imageToDraw, 0, 0, gElCanvas.width, gElCanvas.height);
    lines.forEach((line, idx) => {
      const textWidth = gCtx.measureText(line.txt, line.x, line.y).width;
      drawText(
        line.txt,
        line.x,
        line.y,
        line.size,
        line.color,
        line.align,
        line.stroke
      );
      if (idx === gMeme.selectedLineIdx) {
        drawRect(
          line.x - 5,
          line.y - (line.size * 1.333) / 2 - 5,
          textWidth + 20,
          line.size * 1.333
        );
      }
    });
  };
}

// Actions

function onSelectMeme(id) {
  isImgSelected = true;
  document.querySelector(".gallery-content").classList.add("hide");
  document.querySelector(".grid-container").style.display = "grid";
  resizeCanvas();
  setGMeme(id);
  renderMeme();
}

function onClearCanvas() {
  isText = false;
  clearCanvas();
  clearInput();
  renderMeme();
}

function onTextInput(text) {
  isText = true;
  setTextInput(text);
  renderMeme();
}

function onAddLine() {
  creatNewLine();
  renderMeme();
  clearInput();
}

// set Text

function onIncreaseFont() {
  setFontSizeUp();
  renderMeme();
}

function onDecreaseFont() {
  setFontSizeDown();
  renderMeme();
}

// Set Text color

function onChangeTextColor(color) {
  setTextColor(color);
  renderMeme();
}

function onChangeStrokeColor(stroke) {
  setStrokeColor(stroke);
  renderMeme();
}

// Set text align

function onAlignTextLeft() {
  const curLine = getCurLine();
  if (!curLine.txt) return;
  moveText(10, curLine.y);
  renderMeme();
}
function onAlignTextRight() {
  const curLine = getCurLine();
  if (!curLine.txt) return;
  const textWidth = gCtx.measureText(curLine.txt, curLine.x, curLine.y).width;
  moveText(gElCanvas.width - textWidth - 15, curLine.y);
  renderMeme();
}
function onAlignTextCenter() {
  const curLine = getCurLine();
  if (!curLine.txt) return;
  const textWidth = gCtx.measureText(curLine.txt, curLine.x, curLine.y).width;
  moveText(gElCanvas.width / 2 - textWidth / 2, curLine.y);
  renderMeme();
}

// Draw Text

function drawText(text, x, y, size, color, align, stroke) {
  gCtx.lineWidth = 1;
  gCtx.strokeStyle = stroke;
  gCtx.fillStyle = color;
  gCtx.font = size + "px impact";
  gCtx.textAlign = align;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function clearInput() {
  document.querySelector(".text-input").value = "";
}

function onChangeTextValue() {
  const curLine = getCurLine();
  document.querySelector(".text-input").value = curLine.txt;
}

function drawRect(x, y, width, height) {
  if (!isText) return;
  gCtx.beginPath();
  gCtx.strokeStyle = "black";
  gCtx.strokeRect(x, y, width, height);
}

// Drag Events

function onDown(ev) {
  const indexOfClickedText = indexOfClickedOnText(ev.offsetX, ev.offsetY);
  if (indexOfClickedText > -1) {
    isDrag = true;
    gLastOffsetX = ev.offsetX;
    gLastOffsetY = ev.offsetY;
    setSelectedLineIdx(indexOfClickedText);
    onChangeTextValue();
    renderMeme();
  }
}

function onMove(ev) {
  if (!isDrag) return;

  if (gLastOffsetX !== ev.offsetX || gLastOffsetY !== ev.offsetY) {
    gElCanvas.style.cursor = "grabbing";
    gDiffX = ev.offsetX - gLastOffsetX;
    gDiffY = ev.offsetY - gLastOffsetY;
    gLastOffsetX = ev.offsetX;
    gLastOffsetY = ev.offsetY;
  }

  const curLine = getCurLine();
  if (curLine.x + gDiffX !== NaN && curLine.y + gDiffY) {
    moveText(curLine.x + gDiffX, curLine.y + gDiffY);
    renderMeme();
  }
}

function onUp(ev) {
  gElCanvas.style.cursor = "grab";
  isDrag = false;
  gElCanvas.style.cursor = "default";
}

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

function addListeners() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener("resize", () => {
    if (!isImgSelected) return;
    resizeCanvas();
    renderMeme();
  });
}

function addMouseListeners() {
  gElCanvas.addEventListener("mousemove", onMove);
  gElCanvas.addEventListener("mousedown", onDown);
  gElCanvas.addEventListener("mouseup", onUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener("touchmove", onMove);
  gElCanvas.addEventListener("touchstart", onDown);
  gElCanvas.addEventListener("touchend", onUp);
}

function indexOfClickedOnText(x, y) {
  const lines = getGMemeLines();
  let indexToReturn = -1;

  lines.forEach((line, index) => {
    const textWidth = gCtx.measureText(line.txt, line.x, line.y).width;

    if (
      line.x - 5 < x &&
      x < line.x + textWidth + 20 &&
      line.y - (line.size * 1.333) / 2 - 5 < y &&
      y < line.size * 1.333 + line.y
    ) {
      indexToReturn = index;
    }
  });

  return indexToReturn;
}

function downloadImg(elLink) {
  isDownloading = true;
  isText = false;
  renderMeme();
  const imgContent = gElCanvas.toDataURL();
  elLink.href = imgContent;
}
