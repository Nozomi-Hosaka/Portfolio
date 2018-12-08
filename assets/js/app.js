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
var title = document.getElementById("title");
var jumpGameContainer = document.getElementById("jump-game-container");
var mainContainer = document.getElementById("main-container");
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
document.addEventListener(
  scroll_event,
  function() {
    isDisplay(profileButtonContainer, profileContainer);
  }.bind(profileButtonContainer, profileContainer)
);
document.addEventListener(
  "touchmove.noScroll",
  function() {
    isDisplay(profileButtonContainer, profileContainer);
  }.bind(profileButtonContainer, profileContainer)
);

function isDisplay(target, displayObj) {
  var targetTop = target.getBoundingClientRect().top;
  var targetBottom = target.getBoundingClientRect().bottom;
  if (0 < targetTop && targetBottom <= window.innerHeight) {
    anime({
      targets: displayObj,
      translateX: -1920,
      direction: 300
    });
  }
}

anime({
  targets: title,
  translateY: 100
});
anime({
  targets: jumpGameContainer,
  translateY: 500
});
anime({
  targets: mainContainer,
  translateX: 1920,
  direction: 300
});
