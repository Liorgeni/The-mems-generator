"use strict";

let currImg;
var gFilterBy = { keywords: "" };
let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };

const gImgs = [
  { id: 1, url: "img/1.jpg", keywords: ["trump", "usa"] },
  { id: 2, url: "img/2.jpg", keywords: ["dogs", "love"] },
  { id: 3, url: "img/3.jpg", keywords: ["baby", "dog"] },
  { id: 4, url: "img/4.jpg", keywords: ["love", "cat"] },
  { id: 5, url: "img/5.jpg", keywords: ["funny", "baby"] },
  { id: 6, url: "img/6.jpg", keywords: ["funny", "man"] },
  { id: 7, url: "img/7.jpg", keywords: ["funny", "baby"] },
  { id: 8, url: "img/8.jpg", keywords: ["tell", "man"] },
  { id: 9, url: "img/9.jpg", keywords: ["funny", "baby"] },
  { id: 10, url: "img/10.jpg", keywords: ["president", "usa"] },
  { id: 11, url: "img/11.jpg", keywords: ["man", "love"] },
  { id: 12, url: "img/12.jpg", keywords: ["man", "good"] },
  { id: 13, url: "img/13.jpg", keywords: ["leonardo", "actor"] },
  { id: 14, url: "img/14.jpg", keywords: ["matrix", "man"] },
  { id: 15, url: "img/15.jpg", keywords: ["man", "actor"] },
  { id: 16, url: "img/16.jpg", keywords: ["movies", "man"] },
  { id: 17, url: "img/17.jpg", keywords: ["russia", "president"] },
  { id: 18, url: "img/18.jpg", keywords: ["movies", "baby"] },
];

var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "",
      size: 70,
      align: "left",
      color: "white",
      x: 10,
      y: 50,
    },
  ],
};

function getDefaultNewLine() {
  return {
    txt: "",
    size: 40,
    align: "left",
    color: "white",
    x: 10,
    y: 50,
  };
}

function setGMeme(id) {
  gMeme.selectedImgId = id;
}

function creatNewLine() {
  const newLine = getDefaultNewLine();
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
  gMeme.lines[gMeme.selectedLineIdx].y =
    gMeme.lines[gMeme.selectedLineIdx - 1].y + 30;
}

function getGMeme() {
  return gMeme;
}

function getCurImg() {
  const curImg = gImgs.find((img) => img.id === gMeme.selectedImgId);
  return curImg;
}

function setFilterBy(filterBy) {
  gFilterBy.keywords = filterBy;
  return gFilterBy;
}

function getImages() {
  const images = gImgs;
  return images;
}

function setTextInput(text) {
  gMeme.lines[gMeme.selectedLineIdx].txt = text;
}
function setFontSizeUp() {
  gMeme.lines[gMeme.selectedLineIdx].size += 3;
}

function setFontSizeDown() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 3;
}

function setTextColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function getGMemeLines() {
  return gMeme.lines;
}

function clearCanvas() {
  gMeme.selectedLineIdx = 0;
  gMeme.lines = [getDefaultNewLine()];
}

function getCurLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function moveText(x, y) {
  gMeme.lines[gMeme.selectedLineIdx].x = x;
  gMeme.lines[gMeme.selectedLineIdx].y = y;
}

function setSelectedLineIdx(index) {
  gMeme.selectedLineIdx = index;
}
