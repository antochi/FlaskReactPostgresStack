// requirements

var gulp = require('gulp');
var gulpBrowser = require("gulp-browser");
var babelify = require('babelify');
var del = require('del');
var size = require('gulp-size');


// tasks

let transforms = [
  {
    transform: "babelify",
    options: {
      presets: [
        ["env", { experimental: true }],
        "react"
      ]
    },
  }
];

gulp.task('transform', function () {
  var stream = gulp.src('./project/server/static/scripts/jsx/*.js')
    .pipe(gulpBrowser.browserify(transforms))
    .pipe(gulp.dest('./project/server/static/scripts/js/'))
    .pipe(size());
  return stream;
});

gulp.task('del', function () {
  return del(['./project/server/static/scripts/js']);
});

gulp.task('default', ['del'], function () {
  gulp.start('transform');
  gulp.watch('./project/server/static/scripts/jsx/*.js', ['transform']);
});