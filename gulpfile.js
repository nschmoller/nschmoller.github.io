var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

// Copy third party libraries from /node_modules into /vendor
function vendorBootstrap() {
  return gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'));
}

var vendor = gulp.parallel(vendorBootstrap);

// Compile SCSS
function cssCompile() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
}

// Minify CSS
function cssMinify() {
  return gulp.src([
      './css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}

// CSS
var css = gulp.series(cssCompile, cssMinify);

// Minify JavaScript
function jsMinify() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
}

// JS
var js = gulp.series(jsMinify);

// Configure the browserSync task
function browserSyncServe(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  done();
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Dev task
function dev() {
  gulp.watch('./scss/*.scss', css);
  gulp.watch(['./js/*.js', '!./js/*.min.js'], js);
  gulp.watch('./*.html', browserSyncReload);
}

var build = gulp.parallel(css, js, vendor);

exports.vendor = vendor;
exports.css = css;
exports.js = js;
exports.build = build;
exports.default = build;
exports.dev = gulp.series(build, browserSyncServe, dev);
