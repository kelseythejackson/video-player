(function () {
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    ts = require('gulp-typescript');

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});

gulp.task('ts', function () {
  return gulp.src('./ts/**/*.ts')
    .pipe(ts())
    .pipe(gulp.dest('./js'));
});


gulp.task("watchFiles", function(){
  gulp.watch("./scss/**/*.scss", ["sass"]);
  gulp.watch("./ts/**/*.ts", ["ts"]);
});

gulp.task('serve', ['watchFiles']);

}());
