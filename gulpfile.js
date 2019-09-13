const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;

const cssFiles = [
  './src/css/index.scss',
  './src/css/media.scss'
];
const jsFiles = [
  './src/js/themes.js',
  './src/js/product-list.js',
  './src/js/admin-panel.js',
  './src/js/index.js',
  './src/js/forms.js'
];

gulp.task('default', () => {
  gulp.watch('./src/css/**/*.scss', () => {
    return gulp.src(cssFiles)
      .pipe(concat('index.css'))
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(cleanCSS({
        level: 2
      }))
      .pipe(gulp.dest('./css'));
  });

  gulp.watch('./src/js/**/*.js', () => {
    return gulp.src(jsFiles)
      .pipe(concat('index.js'))
      .pipe(uglify({
        toplevel: true
      }))
      .pipe(gulp.dest('./js'));
  });
});