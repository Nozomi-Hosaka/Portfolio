import anime from "animejs";
var title = document.getElementById("title");
var jumpGameContainer = document.getElementById("jump-game-container");
var mainContainer = document.getElementById("main-container");

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
  direction: 300,
});
