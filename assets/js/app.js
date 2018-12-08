console.log("%cはじめまして！こんにちは！", "font-size:20px;");
console.log("%cここは保坂　望のポートフォリオサイトです！", "font-size:20px;");
console.log(
  "%c他にもブログとかあるので、こちらも見てください！",
  "font-size:15px;color:#ff0000;"
);
console.log("技術ブログ");
console.log("%chttp://blog.nozomi.bike/", "font-size:25px;color:#ff0000;");
console.log("勉強用ブログ");
console.log("%chttp://non-it-infomation.com/", "font-size:25px;color:#ff0000;");

import anime from "animejs";
var carouselMsg = document.getElementById("carousel-msg");
var jumpGameBeforePoint = document.getElementById("jump-game-before-point");
var mainBeforePoint = document.getElementById("main-before-point");
var jumpGameContainer = document.getElementById("jump-game-container");
var mainContainer = document.getElementById("main-container");
var introductionLink = document.getElementById("introduction-link");
var profileLink = document.getElementById("profile-link");
var technicLink = document.getElementById("technic-link");
var contactLink = document.getElementById("contact-link");
var profileButtonContainer = document.getElementById(
  "profile-button-container"
);
var profileContainer = document.getElementById("profile-container");
var scroll_event =
  "onwheel" in document
    ? "wheel"
    : "onmousewheel" in document
    ? "mousewheel"
    : "DOMMouseScroll";
document.addEventListener(scroll_event, function() {
  isDisplay(profileButtonContainer, profileContainer);
  //isDisplay(jumpGameBeforePoint, jumpGameContainer);
  isDisplayCSS(jumpGameBeforePoint, jumpGameContainer);
  isDisplay(mainBeforePoint, mainContainer);
});
document.addEventListener("touchmove.noScroll", function() {
  isDisplay(profileButtonContainer, profileContainer);
  //isDisplay(jumpGameBeforePoint, jumpGameContainer);
  isDisplayCSS(jumpGameBeforePoint, jumpGameContainer);
  isDisplay(mainBeforePoint, mainContainer);
});
introductionLink.addEventListener("click", function() {
  display(mainContainer);
});
profileLink.addEventListener("click", function() {
  display(mainContainer);
});
technicLink.addEventListener("click", function() {
  display(mainContainer);
});
contactLink.addEventListener("click", function() {
  display(mainContainer);
});
function isDisplay(target, displayObj) {
  var targetTop = target.getBoundingClientRect().top;
  var targetBottom = target.getBoundingClientRect().bottom;
  if (0 < targetTop && targetBottom <= window.innerHeight) {
    display(displayObj);
  }
}
function display(displayObj) {
  anime({
    targets: displayObj,
    translateX: 1920,
    direction: 300
  });
}
function isDisplayCSS(target, displayObj) {
  var targetTop = target.getBoundingClientRect().top;
  var targetBottom = target.getBoundingClientRect().bottom;
  if (0 < targetTop && targetBottom <= window.innerHeight) {
    displayCSS(displayObj);
  }
}
function displayCSS(displayObj) {
  displayObj.classList.add("anime-visible");
}
anime({
  targets: carouselMsg,
  translateY: 700
});
