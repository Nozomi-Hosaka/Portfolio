console.log("%cはじめまして！こんにちは！", "font-size:20px;");
console.log("%cここは保坂　望のポートフォリオサイトです！", "font-size:20px;");
console.log("%c他にもブログとかあるので、こちらも見てください！", "font-size:15px;color:#ff0000;");
console.log("技術ブログ");
console.log("%chttp://blog.nozomi.bike/", "font-size:25px;color:#ff0000;");
console.log("勉強用ブログ");
console.log("%chttp://non-it-infomation.com/", "font-size:25px;color:#ff0000;");

import anime from "animejs";
var carouselMsg = document.getElementById("carousel-msg");
var jumpGameBeforePoint = document.getElementById("jump-game-before-point");
var jumpGameContainer = document.getElementById("jump-game-container");
var introductionContainer = document.getElementById("introduction-container");
var introductionBeforePoint = document.getElementById("introduction-before-point");
var profileContainer = document.getElementById("profile-container");
var profileBeforePoint = document.getElementById("profile-before-point");
var technicTitle = document.getElementById('technic-title');
var technicTitleBeforePoint = document.getElementById('technic-title-before-point');
var programLangContainer = document.getElementById('program-lang-container');
var programLangBeforePoint = document.getElementById('program-lang-before-point');
var toolContainer = document.getElementById('tool-container');
var toolContainerBeforePoint = document.getElementById('tool-container-before-point');
var otherContainer = document.getElementById('other-container');
var otherContainerBeforePoint = document.getElementById('other-container-before-point');
var contactContainer = document.getElementById('contact-container');
var contactContainerBeforePoint = document.getElementById('contact-container-before-point');
var productContainer = document.getElementById('product-container');
var productContainerBeforePoint = document.getElementById('product-container-before-point');
var introductionLink = document.getElementById("introduction-link");
var profileLink = document.getElementById("profile-link");
var technicLink = document.getElementById("technic-link");
var productLink = document.getElementById('product-link');
var contactLink = document.getElementById("contact-link");
var scroll_event = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
document.addEventListener(scroll_event, function() {
  //isDisplay(jumpGameBeforePoint, jumpGameContainer);
  isDisplayCSS(jumpGameBeforePoint, jumpGameContainer);
  isDisplay(introductionBeforePoint, introductionContainer);
  isDisplay(profileBeforePoint, profileContainer);
  isDisplay(technicTitleBeforePoint, technicTitle);
  isDisplay(programLangBeforePoint, programLangContainer);
  isDisplay(toolContainerBeforePoint, toolContainer);
  isDisplay(otherContainerBeforePoint, otherContainer);
  isDisplay(contactContainerBeforePoint, contactContainer);
  isDisplay(productContainerBeforePoint, productContainer);
});
document.addEventListener("touchmove.noScroll", function() {
  //isDisplay(jumpGameBeforePoint, jumpGameContainer);
  isDisplayCSS(jumpGameBeforePoint, jumpGameContainer);
  isDisplay(introductionBeforePoint, introductionContainer);
  isDisplay(profileBeforePoint, profileContainer);
  isDisplay(technicTitleBeforePoint, technicTitle);
  isDisplay(programLangBeforePoint, programLangContainer);
  isDisplay(toolContainerBeforePoint, toolContainer);
  isDisplay(otherContainerBeforePoint, otherContainer);
  isDisplay(contactContainerBeforePoint, contactContainer);
  isDisplay(productContainerBeforePoint, productContainer);
});
introductionLink.addEventListener("click", function() {
  display(introductionContainer);
});
profileLink.addEventListener("click", function() {
  display(profileContainer);
});
technicLink.addEventListener("click", function() {
  display(technicTitle);
  display(programLangContainer);
  display(toolContainer);
  display(otherContainer);
});
productLink.addEventListener("click", function() {
  display(productContainer);
})
contactLink.addEventListener("click", function() {
  display(contactContainer);
});
function isDisplay(target, displayObj) {
  var targetTop = target.getBoundingClientRect().top;
  var targetBottom = target.getBoundingClientRect().bottom;
  if (0 < targetTop && targetBottom <= window.innerHeight - 200) {
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
  if (0 < targetTop && targetBottom <= window.innerHeight - 200) {
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
