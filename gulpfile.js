const gulp = require('gulp');
const concat = require('gulp-concat');

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

gulp.task('styles', () => {
  return gulp.src(cssFiles)
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('scripts', () => {
  return gulp.src(jsFiles)
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./js'));
});