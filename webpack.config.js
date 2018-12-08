module.exports = {
  mode: "development",
  entry: [
    // 入力ファイルリスト
    __dirname + "/assets/js/app.js",
    __dirname + "/assets/js/nodal.js",
    __dirname + "/assets/js/game.js",
  ],
  output: {
    // 出力ファイル
    path: __dirname + "/js",
    filename: "app.js"
  }
};
