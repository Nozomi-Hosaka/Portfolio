module.exports = {
  mode: "development",
  entry: [
    // 入力ファイルリスト
    __dirname + "/assets/js/game.js"
  ],
  output: {
    // 出力ファイル
    path: __dirname + "/js",
    filename: "app.js"
  }
};
