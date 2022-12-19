"use strict";

function onInit() {
  gElCanvas = document.getElementById("my-canvas");
  gCtx = gElCanvas.getContext("2d");
  document.querySelector(".grid-container").style.display = "none";
  document.querySelector(".gallery-content").classList.remove("hide");
  addListeners();
  renderGallery();
  resizeCanvas();
}

function toggleMenu() {
  document.body.classList.toggle("menu-open");
}
