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

function onKeyUpSearch() {
  setTimeout(() => {
    const searchStr = document.querySelector(".search-Input").value;
    const filterBy = setFilterBy(searchStr);
    renderGallery();
    document.querySelector(".search-Input").value = searchStr;

    const queryStringParams = `?keywords=${filterBy.keywords}`;
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      queryStringParams;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }, 1500);
}

function renderFilterByQueryStringParams() {
  const queryStringParams = new URLSearchParams(window.location.search);
  const filterBy = { keywords: queryStringParams.get("keywords") || "" };
  if (!filterBy.keywords) return;

  setFilterBy(filterBy.keywords);
}
