"use strict";

let currImg;
var gFilterBy = { keyWords: "" };

let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };

const defaultLine = {
  txt: "",
  size: 20,
  align: "left",
  color: "trasparent",
};

let gImgs = [
  { id: 1, url: "img/1.jpg", keywords: ["funny", "cat"] },
  { id: 2, url: "img/2.jpg", keywords: ["funny", "cat"] },
  { id: 3, url: "img/3.jpg", keywords: ["buddy", "cat"] },
  { id: 4, url: "img/4.jpg", keywords: ["funny", "cat"] },
  { id: 5, url: "img/5.jpg", keywords: ["funny", "cat"] },
  { id: 6, url: "img/6.jpg", keywords: ["funny", "cat"] },
  { id: 7, url: "img/7.jpg", keywords: ["funny", "cat"] },
  { id: 8, url: "img/8.jpg", keywords: ["funny", "cat"] },
  { id: 9, url: "img/9.jpg", keywords: ["funny", "loli"] },
  { id: 10, url: "img/10.jpg", keywords: ["funny", "cat"] },
  { id: 11, url: "img/11.jpg", keywords: ["funny", "cat"] },
  { id: 12, url: "img/12.jpg", keywords: ["funny", "cat"] },
  { id: 13, url: "img/13.jpg", keywords: ["funny", "cat"] },
  { id: 14, url: "img/14.jpg", keywords: ["funny", "cat"] },
  { id: 15, url: "img/15.jpg", keywords: ["funny", "cat"] },
  { id: 16, url: "img/16.jpg", keywords: ["funny", "cat"] },
  { id: 17, url: "img/17.jpg", keywords: ["funny", "cat"] },
  { id: 18, url: "img/18.jpg", keywords: ["funny", "cat"] },
];

let gMeme = {
  selectedImgId: 5,
  // selectedLineIdx: lines.length - 1 || 0,
  selectedLineIdx: 0,
  lines: [],
};

function setGMeme(id) {
  gMeme.selectedImgId = id;
}

function creatNewLine() {
  gMeme.lines.push(defaultLine);
}

function getGMeme() {
  return gMeme;
}

function getCurImg() {
  const curImg = gImgs.find((img) => img.id === gMeme.selectedImgId);
  console.log(curImg);
  return curImg;
}

function setFilterBy(filterBy) {
  //   const keyWords = gImgs.filter((img) => img.keywords);
  //   console.log(keyWords);

  // if (filterBy.title !== undefined) gFilterBy.title = filterBy.title;
  // console.log(filterBy.title);
  //   keyWords.keyWords = filterBy;
  gFilterBy.keyWords = filterBy;
  //   return gFilterBy;
  console.log(filterBy);
  return filterBy;
}

function getImages() {
  const images = gImgs;
  return images;
}

// function getMeme(id) {
//     const meme = gMeme.find(meme=> )
//   return gMeme;
// }

function setLineTxt(text) {
  gMeme.lines[0].txt = text;
}

function increaseFontSize() {
  gMeme.lines[0].size = gMeme.lines[0].size + 3;
  console.log(gMeme.lines[0].size);
  console.log("Text increased");
}

function decreaseFontSize() {
  gMeme.lines[0].size = gMeme.lines[0].size - 3;
  console.log("Text decreased");
}

function moveText() {
  console.log("move text");
}

function changeTextColor(val) {
  gMeme.lines[0].color = val;
}
