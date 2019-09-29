const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const jsx = require('gulp-jsx');

const cssFiles = [
  './src/css/main.scss',
  './src/css/main-media.scss',
  './src/css/admin.scss',
  './src/css/admin-media.scss'
];
const jsFiles = [
  './src/js/themes.js',
  './src/js/cart.js',
  './src/js/product-list.js',
  './src/js/admin.js',
  './src/js/index.js',
  './src/js/forms.js'
];

gulp.task('default', () => {
  gulp.watch('./src/css/**/*.scss', () => {
    return gulp.src(cssFiles)
      //.pipe(concat('index.css'))
      .pipe(sass.sync().on('error', sass.logError))
      //.pipe(autoprefixer({
      //  cascade: false
      //}))
      //.pipe(cleanCSS({
      //  level: 2
      //}))
      .pipe(gulp.dest('./public/css'));
  });

  gulp.watch('./src/js/**/*.js', () => {
   return gulp.src(jsFiles)
      .pipe(jsx({
        factory: 'React.createClass'
      }))
      //.pipe(uglify({
      //  toplevel: true
      //}))
      .pipe(gulp.dest('./public/js'));
  });
});