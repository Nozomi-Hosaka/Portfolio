import moment from "moment";
moment.locale("ja");
var jumpGameCanvas = document.getElementById("jump-game-canvas");
var jumpGameStartButton = document.getElementById("jump-game-start-button");
var jumpGameRestartButton = document.getElementById("jump-game-restart-button");
var jumpGameEndButton = document.getElementById("jump-game-end-button");
var jumpGameJampButton = document.getElementById("jump-game-jump-button");
var jumpGamePauseButton = document.getElementById("jump-game-pause-button");
onload = function() {
  // ゲーム準備
  if (!jumpGameCanvas || !jumpGameCanvas.getContext) {
    return false;
  }
  var jgConvas = jumpGameCanvas.getContext("2d");
  var jumpGame = new JumpGame(jgConvas, 1400, 200);
  jumpGame.init();
  // イベント作成
  jumpGameStartButton.addEventListener("click", function() {
    jumpGame.changeJumpGameButtonStatus(this, false);
    jumpGame.changeJumpGameButtonStatus(jumpGameJampButton, true);
    jumpGame.changeJumpGameButtonStatus(jumpGameRestartButton, true);
    jumpGame.changeJumpGameButtonStatus(jumpGamePauseButton, true);
    jumpGame.start();
    return false;
  });
  jumpGameRestartButton.addEventListener("click", function() {
    jumpGame.changeJumpGameButtonStatus(jumpGameStartButton, false);
    jumpGame.changeJumpGameButtonStatus(jumpGameEndButton, true);
    jumpGame.changeJumpGameButtonStatus(jumpGameJampButton, true);
    jumpGame.changeJumpGameButtonStatus(jumpGamePauseButton, true);
    jumpGame.restart();
    return false;
  });
  jumpGameEndButton.addEventListener("click", function() {
    jumpGame.changeJumpGameButtonStatus(jumpGameStartButton, true);
    jumpGame.changeJumpGameButtonStatus(jumpGameJampButton, false);
    jumpGame.changeJumpGameButtonStatus(jumpGameRestartButton, false);
    jumpGame.changeJumpGameButtonStatus(jumpGamePauseButton, false);
    jumpGame.end();
    return false;
  });
  jumpGameJampButton.addEventListener("mousedown", function() {
    jumpGame.ballJump();
    return false;
  });
  jumpGamePauseButton.addEventListener("click", function() {
    if (jumpGame.isBallMove === true) {
      return false;
    }
    if (jumpGame.isPause === false) {
      jumpGame.isPause = true;
      jumpGame.pause();
      jumpGame.changeJumpGameButtonStatus(jumpGameJampButton, false);
    } else {
      jumpGame.isPause = false;
      jumpGame.obstacleMove();
      jumpGame.changeJumpGameButtonStatus(jumpGameJampButton, true);
    }
    return false;
  });
};

class JumpGame {
  constructor(jgConvas, canvasWidth, canvasHeight, fps = 500) {
    this.jgConvas = jgConvas;
    this.ballR = 10;
    this.obstacleW = 30;
    this.obstacleH = 30;
    this.ball = new Ball(
      this.jgConvas,
      this.ballR,
      190,
      this.ballR,
      0,
      Math.PI * 2,
      false
    );
    this.obstacle = new Obstacle(
      this.jgConvas,
      canvasWidth - this.obstacleW,
      canvasHeight - this.obstacleH,
      this.obstacleW,
      this.obstacleH
    );
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fps = fps;
    this.ballTimeId = null;
    this.obstacleTimeId = [];
    this.ballJumpTimeId = null;
    this.isBallMove = false;
    this.isObstacleMove = false;
    this.addObstacle = [];
    this.dateContainer = null;
    this.isPause = false;
  }
  init() {
    console.log("Init jump game.");
    this.remove();
    this.ball.init();
    this.obstacle.init();
    this.addObstacle = [];
    this.isPause = false;
  }
  start() {
    console.log("Start jump game!!");
    this.ballMoveToDefaultPostion();
  }
  restart() {
    console.log("Restart jump game!!");
    this.init();
    if (this.isBallMove == false) {
      this.start();
    }
    if (this.isObstacleMove == true) {
      for (var i = 0; i < this.obstacleTimeId.length; i++) {
        clearTimeout(this.obstacleTimeId[i]);
      }
    }
  }
  end() {
    console.log("End jump game.");
    clearTimeout(this.ballTimeId);
    for (var i = 0; i < this.obstacleTimeId.length; i++) {
      clearTimeout(this.obstacleTimeId[i]);
    }
    this.init();
  }
  ballMoveToDefaultPostion() {
    this.remove();
    this.ball.move(1, 0);
    this.obstacle.draw();
    this.ballTimeId = setTimeout(
      function() {
        this.ballMoveToDefaultPostion();
      }.bind(this),
      1000 / this.fps
    );
    this.isBallMove = true;
    if (this.ball.centerX >= this.canvasWidth / 5 && this.ballTimeId) {
      clearTimeout(this.ballTimeId);
      this.isBallMove = false;
      this.obstacleMove();
    }
  }
  obstacleMove() {
    this.remove();
    var ballY = 0;
    if (this.ball.centerY == this.ball.initY) {
      // 初期値点
      if (this.ball.jumpStatus == 1) {
        // 上昇中
        ballY = 1;
      } else {
        ballY = 0;
      }
    } else if (this.ball.centerY == this.ball.initY - this.ball.jumpPower) {
      // 最高到達点
      ballY = -1;
      this.ball.jumpStatus = 2;
    } else if (!(this.ball.centerY >= this.ball.initY)) {
      // 滞空中
      if (this.ball.jumpStatus == 1) {
        // 上昇中
        ballY = 1;
      } else if (this.ball.jumpStatus == 2) {
        // 下降中
        ballY = -1;
      }
    }
    this.ball.move(0, ballY);
    this.obstacle.move(1, 0);
    this.isObstacleMove = true;

    var randNum = Math.floor(Math.random() * (5000 - 1000) + 1000);
    var baseDate = moment().subtract(randNum, "ms");
    if (
      moment(baseDate).isAfter(this.dateContainer) ||
      this.dateContainer == null
    ) {
      var randNumW = Math.floor(Math.random() * (40 - 10) + 10);
      var randNumH = Math.floor(Math.random() * (40 - 10) + 10);
      this.addObstacle.push(
        new Obstacle(
          this.jgConvas,
          this.canvasWidth - randNumW,
          this.canvasHeight - randNumH,
          randNumW,
          randNumH
        )
      );
      this.dateContainer = moment();
    }
    if (this.addObstacle.length > 0) {
      for (
        var obstacleCounter = 0;
        obstacleCounter < this.addObstacle.length;
        obstacleCounter++
      ) {
        this.addObstacle[obstacleCounter].move(1, 0);
        // ヒットしていないもののみを取ればいい
        if (this.ball.nowXR < this.addObstacle[obstacleCounter].nowXL) {
          // ヒットしない
        } else if (this.ball.nowXL > this.addObstacle[obstacleCounter].nowXR) {
          // ヒットしない
        } else if (this.ball.nowYD < this.addObstacle[obstacleCounter].nowYU) {
          // ヒットしない
        } else {
          // ヒット
          this.pause();
          this.isPause = true;
          jumpGamePauseButton.classList.remove("primary");
          jumpGamePauseButton.classList.add("disabled");
          jumpGamePauseButton.classList.add("none");
          jumpGameEndButton.classList.remove("primary");
          jumpGameEndButton.classList.add("disabled");
          jumpGameEndButton.classList.add("none");
          jumpGameJampButton.classList.remove("primary");
          jumpGameJampButton.classList.add("disabled");
          jumpGameJampButton.classList.add("none");
        }
      }
    }
    if (this.isPause == false) {
      this.obstacleTimeId.push(
        setTimeout(
          function() {
            this.obstacleMove();
          }.bind(this),
          1000 / this.fps
        )
      );
    }
  }
  ballJump() {
    console.log("Jump!!");
    if (this.isBallMove == false) {
      if (this.ball.centerY >= this.ball.initY - 10) {
        // 地上にいる時
        this.ball.jumpStatus = 1;
      }
    }
  }
  pause() {
    clearTimeout(this.ballTimeId);
    for (var i = 0; i < this.obstacleTimeId.length; i++) {
      clearTimeout(this.obstacleTimeId[i]);
    }
  }
  remove() {
    this.jgConvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  changeJumpGameButtonStatus(button, visible) {
    if (visible) {
      button.classList.remove("none");
      button.classList.remove("disabled");
      button.classList.add("primary");
    } else {
      button.classList.remove("primary");
      button.classList.add("disabled");
      button.classList.add("none");
    }
  }
}

class Obstacle {
  constructor(jgConvas, baseX, baseY, width, height, color = "rgb(0, 255, 0)") {
    this.jgConvas = jgConvas;
    // 座標を設定
    this.baseX = baseX;
    this.baseY = baseY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.nowXR = baseX + width;
    this.nowXL = baseX;
    this.nowYU = baseY;
    this.nowYD = baseY + height;
    // 初期値を登録
    this.initBaseX = baseX;
    this.initBaseY = baseY;
    this.initWidth = width;
    this.initHeight = height;
    this.initColor = color;
    this.initNowXR = baseX + width;
    this.initNowXL = baseX;
    this.initNowYU = baseY;
    this.initNowYD = baseY + height;
  }
  init() {
    this.baseX = this.initBaseX;
    this.baseY = this.initBaseY;
    this.width = this.initWidth;
    this.height = this.initHeight;
    this.color = this.initColor;
    this.nowXR = this.initNowXR;
    this.nowXL = this.initNowXL;
    this.nowYU = this.initNowYU;
    this.nowYD = this.initNowYD;
    this.draw();
  }
  draw() {
    this.jgConvas.beginPath();
    this.jgConvas.fillStyle = this.color;
    this.jgConvas.fillRect(this.baseX, this.baseY, this.width, this.height);
    this.jgConvas.fill();
  }
  move(x, y) {
    this.baseX -= x;
    this.baseY -= y;
    this.draw();
    this.updateNowPosition(this.baseX, this.baseY);
  }
  updateNowPosition(x, y) {
    this.nowXR = x + this.width;
    this.nowXL = x;
    this.nowYU = y;
    this.nowYD = y + this.height;
  }
}

class Ball {
  constructor(
    jgConvas,
    centerX,
    centerY,
    r,
    startAngle,
    endAngle,
    anticlockwise,
    color = "rgb(0, 0, 255)",
    jumpPower = 80
  ) {
    this.jgConvas = jgConvas;
    // 座標を設定
    this.centerX = centerX;
    this.centerY = centerY;
    this.r = r;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.anticlockwise = anticlockwise;
    this.color = color;
    this.jumpPower = jumpPower;
    this.nowXR = centerX + r;
    this.nowXL = centerX - r;
    this.nowYU = centerY - r;
    this.nowYD = centerY + r;
    // 初期値を設定
    this.initX = centerX;
    this.initY = centerY;
    this.initR = r;
    this.initSAngle = startAngle;
    this.initEAngle = endAngle;
    this.initAnticlockwise = anticlockwise;
    this.initColor = color;
    this.initJumpPower = jumpPower;
    this.initNowXR = centerX + r;
    this.initNowXL = centerX - r;
    this.initNowYU = centerY - r;
    this.initNowYD = centerY + r;
    // ボール状態を定義
    this.jumpStatus = 0; // 0:地上 1:上昇中 2:下降中
  }
  init() {
    this.centerX = this.initX;
    this.centerY = this.initY;
    this.r = this.initR;
    this.startAngle = this.initSAngle;
    this.endAngle = this.initEAngle;
    this.anticlockwise = this.initAnticlockwise;
    this.color = this.initColor;
    this.jumpPower = this.initJumpPower;
    this.nowXR = this.initNowXR;
    this.nowXL = this.initNowXL;
    this.nowYU = this.initNowYU;
    this.nowYD = this.initNowYD;
    this.draw();
  }
  draw() {
    this.jgConvas.beginPath();
    this.jgConvas.fillStyle = this.color;
    this.jgConvas.arc(
      this.centerX,
      this.centerY,
      this.r,
      this.startAngle,
      this.endAngle,
      this.anticlockwise
    );
    this.jgConvas.fill();
  }
  move(x, y) {
    this.centerX += x;
    this.centerY -= y;
    this.draw();
    this.updateNowPosition(this.centerX, this.centerY);
  }
  updateNowPosition(x, y) {
    this.nowXR = x + this.r;
    this.nowXL = x - this.r;
    this.nowYU = y - this.r;
    this.nowYD = y + this.r;
  }
}
