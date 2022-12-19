"use strict";

function renderGallery() {
  const images = getImages();
  var strHTML = images.map(
    (img) =>
      `<img onclick="onSelectMeme(${img.id})" src="${img.url}"} alt="" />`
  );

  document.querySelector(".gallery").innerHTML = strHTML.join("");
}

// On Search

function onSetFilter(filterBy) {
  setFilter(filterBy);
  renderGallery();
}
