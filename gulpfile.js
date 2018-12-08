const gulp = require("gulp");
const sass = require("gulp-sass");
const changed = require("gulp-changed");
const imagemin = require("gulp-imagemin");
const imageminJpg = require("imagemin-jpeg-recompress");
const imageminPng = require("imagemin-pngquant");
const imageminGif = require("imagemin-gifsicle");
const svgmin = require("gulp-svgmin");

//Sassのコンパイル
gulp.task("sass", function() {
  gulp
    .src("./sass/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed"
      })
        //エラーの登録
        .on("error", sass.logError)
    )
    .pipe(gulp.dest("./css"));
});

// 画像の圧縮前と圧縮後のディレクトリパス
var paths = {
  srcDir: "images",
  dstDir: "dist"
};
// jpg,png,gif画像の圧縮タスク
gulp.task("imagemin", function() {
  var srcGlob = paths.srcDir + "/**/*.+(jpg|jpeg|png|gif)";
  var dstGlob = paths.dstDir;
  gulp
    .src(srcGlob)
    .pipe(changed(dstGlob))
    .pipe(
      imagemin([
        imageminPng(),
        imageminJpg(),
        imageminGif({
          interlaced: false,
          optimizationLevel: 3,
          colors: 180
        })
      ])
    )
    .pipe(gulp.dest(dstGlob));
});
// svg画像の圧縮タスク
gulp.task("svgmin", function() {
  var srcGlob = paths.srcDir + "/**/*.+(svg)";
  var dstGlob = paths.dstDir;
  gulp
    .src(srcGlob)
    .pipe(changed(dstGlob))
    .pipe(svgmin())
    .pipe(gulp.dest(dstGlob));
});

//./sass/ にあるscssファイルが更新されるとsassタスクを実行
gulp.task("watch", function() {
  gulp.watch("./sass/*.scss", ["sass"]);
  gulp.watch(paths.srcDir + '/**/*', ['imagemin','svgmin']);
});
