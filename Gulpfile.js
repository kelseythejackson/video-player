(function () {
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});




gulp.task("watchFiles", function(){
  gulp.watch("./scss/**/*.scss", ["sass"]);
  // gulp.watch("./ts/**/*.ts", ["ts"]);
});

gulp.task('serve', ['watchFiles']);

}());
