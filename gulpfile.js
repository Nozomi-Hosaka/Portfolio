const gulp = require('gulp');
const sass = require('gulp-sass');

//Sassのコンパイル
gulp.task('sass',function(){
  gulp.src('./sass/*.scss')
  .pipe(sass({
      outputStyle: 'compressed'
  })
  //エラーの登録
  .on('error',sass.logError))
  .pipe(gulp.dest('./css'));
});

//./sass/ にあるscssファイルが更新されるとsassタスクを実行
gulp.task('watch', function(){
  gulp.watch('./sass/*.scss' ,['sass']);
});

