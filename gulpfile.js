var gulp = require('gulp')
var cleanCss = require('gulp-clean')
var sass = require('gulp-sass')
var browserSync = require('browser-sync')

gulp.task('clean-css', function () {
  return gulp.src('css/main.css', { read: false })
    .pipe(cleanCss());
});

gulp.task('scss', ['clean-css'], function () {
  return gulp.src('scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: "./"
    }
  })
})

gulp.task('default', ['browser-sync', 'scss'], function () {
  gulp.watch('./scss/**/*.scss', ['scss']);
  gulp.watch(['./**/*.html'], browserSync.reload)
  gulp.watch(['./css/*.css'], browserSync.reload)
  gulp.watch(['./js/**/*.js'], browserSync.reload)
})
