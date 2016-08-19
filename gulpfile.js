var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var cleanMiniCss = require('gulp-clean-css');
var prefix = require('gulp-autoprefixer');
var concatCSS = require('gulp-concat-css');
var concatJS = require('gulp-concat');
var changedOnly = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var jshint = require('gulp-jshint');
var jshSty = require('jshint-stylish');

// path options
var opts = {
  tq: String.fromCharCode(9775),
  htmlSrc: 'public/index.html',
  jscAisle: 'public/javascripts/**/*.js',
  jsApp: 'app/**/*.js',
  jsLib: 'lib/',
  imgOg: 'public/images/**/*',
  cssOg: 'public/stylesheets/',
  jsMetaMid: 'public/metamorphosis/build/js/',
  cssMetaMid: 'public/metamorphosis/build/css/',
  imgMin: 'public/metamorphosis/_img/',
  jsMin: 'public/metamorphosis/_minjs/',
  cssMin: 'public/metamorphosis/_mincss/'
};

// Copy all static images
gulp.task('images', function() {
  var imgCollection = opts.imgOg;
  console.log('line 33 minify images... original path is '+opts.imgOg);

  // return
  gulp.src(imgCollection)
    .pipe(changedOnly(opts.imgOg))
    .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest(opts.imgMin));
});

// Error Handling
function errorEmit (error) {
  console.error(error);
  this.emit('end');
};

// minify-lib-css
var bsCss = 'lib/bootstrap/dist/css/bootstrap.min.css';
var lightboxCss = 'lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.css';
var ngtableCss = 'lib/ng-table/dist/ng-table.min.css';
var ngNotifyCss = 'lib/ng-notify/dist/ng-notify.min.css';
var animateCss = 'lib/animate.css/animate.min.css';

var libCssArr = [bsCss, lightboxCss, ngtableCss, ngNotifyCss, animateCss];

gulp.task('concatMinifyLibCss', function() {
    console.log(opts.tq+" <> minify -> concat library css files...");
    gulp.src(libCssArr)
      .pipe(cleanMiniCss())
      .pipe(concatCSS('lib-css-min.css'))
      .pipe(gulp.dest(opts.cssMin));
});

// modifies styles
gulp.task('styles', function () {
  var logPrefix = 'sass->prefix->css->concatCss(may not need)->cleanMiniCss: ';
  // var tq = String.fromCharCode(9775);
  var pfxVer = 'last 2 versions';
  var traitSrc = opts.cssOg+'main.scss';
  console.log(logPrefix+opts.tq+' original path is: '+opts.cssOg);

  gulp.src(traitSrc)
    .pipe(sass())
    .on('error', errorEmit)
    .pipe(prefix(pfxVer))
    .pipe(rename('app.min.css'))
    .pipe(cleanMiniCss())
    .pipe(gulp.dest(opts.cssMin));
});

// reloads styles
gulp.task('styles:reload', function () {
  var minCssSrc = opts.cssMin+'app.min.css';
  gulp.src(minCssSrc)
    .pipe(livereload({auto:false}));
});

var jq = opts.jsLib+'jquery/dist/jquery.min.js';
var angula = opts.jsLib+'angular/angular.min.js';
var uirouter = opts.jsLib+'angular-ui-router/release/angular-ui-router.min.js';
var ngAria = opts.jsLib+'angular-aria/angular-aria.min.js';
var ngSanitize = opts.jsLib+'angular-sanitize/angular-sanitize.min.js';
var ngMsg = opts.jsLib+'angular-messages/angular-messages.min.js';
var ngNotify = opts.jsLib+'ng-notify/dist/ng-notify.min.js';
var ngMask = opts.jsLib+'ngMask/dist/ngMask.min.js';
var ngAnimate = opts.jsLib+'angular-animate/angular-animate.min.js';
var ngStrap = opts.jsLib+'angular-strap/dist/angular-strap.min.js';
var ngStrapTpls = opts.jsLib+'angular-strap/dist/angular-strap.tpl.min.js';
var uiBootstrap = opts.jsLib+'angular-bootstrap/ui-bootstrap-tpls.min.js';
var moment = opts.jsLib+'moment/min/moment.min.js';
var momentLocal = opts.jsLib+'moment/min/moment-with-locales.min.js';
var ngMoment = opts.jsLib+'angular-moment/angular-moment.min.js';
var bsjs = opts.jsLib+'bootstrap/dist/js/bootstrap.min.js';
var bslightbox = opts.jsLib+'angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.js';
var wowjs = opts.jsLib+'wow/dist/wow.min.js';
// var modernizr = opts.jsLib+'modernizr/src/Modernizr.js';

// collections
var jqRelated = [jq, wowjs];
var anguRelated = [angula, uirouter, ngAria, ngSanitize, ngMsg, ngNotify, ngMask, ngAnimate, ngStrap, ngStrapTpls];
var bsRelated = [bsjs, uiBootstrap, bslightbox];
var dateTime = [moment, momentLocal, ngMoment];

var libjsArr = jqRelated.concat(anguRelated, bsRelated, dateTime);
var metaMid = opts.jsMetaMid;

gulp.task('concatLibMetamo', function() {
  // lib compile
  var pfxLibMetamo = 'lib js files concat -> Metamophosis/build/js/ - original path: ';
  console.log(pfxLibMetamo+opts.jsLib);

  gulp.src(libjsArr)
    .pipe(concatJS('lib-compiled.js'))
    .pipe(uglify())
    .pipe(gulp.dest(metaMid));
});

var appjs = opts.jsApp;
var custjs = opts.jscAisle;
var appjsArr = [appjs, custjs];

gulp.task('concatAppMetamo', function() {
  // app compile
  var pfxAppMetamo = 'app js files concat -> Metamophosis/build/js/ - original path: ';
  console.log(pfxAppMetamo+'app/ folder and public/javascripts/');

  gulp.src(appjsArr)
    .pipe(jshint())
    .pipe(jshint.reporter(jshSty))
    // .pipe(jshint.reporter('fail'))
    .on('error', errorEmit)
    .pipe(concatJS('app-compiled.js'))
    .pipe(gulp.dest(metaMid));
});

gulp.task('concatAppMetamo:reload', function() {
    var bappJs = metaMid+'app-compiled.js';
    gulp.src(bappJs)
      .pipe(livereload({auto:false}));
});

var libJs = metaMid+'lib-compiled.js';
var appJs = metaMid+'app-compiled.js';
var concatJsArr = [libJs, appJs];

gulp.task('concatUglifyJs', function() {
    var miniJs = opts.jsMin;
    console.log('concat compiled files and uglify them.');

    gulp.src(concatJsArr)
      .pipe(concatJS('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(miniJs));
});

// reloads concatUglifyJs
gulp.task('concatUglifyJs:reload', function () {
  var miniJsSrc = opts.jsMin+'**/*.min.js';
  gulp.src(miniJsSrc)
    .pipe(livereload({auto:false}));
});

gulp.task('html', function () {
  var htmlFile = opts.htmlSrc;
  gulp.src(htmlFile)
   .pipe(livereload({auto:false}));
});

// watches files
gulp.task('watch', function () {
    var imgFiles = opts.imgOg;
    var ogCss = opts.cssOg+'**/*.scss';

    livereload.listen();

    gulp.watch(opts.htmlSrc).on('change', livereload.changed);

    gulp.watch(imgFiles, ['images']);

    gulp.watch(ogCss, ['styles', 'styles:reload']);

    gulp.watch(libjsArr, ['concatLibMetamo']);

    gulp.watch(appjsArr, ['concatAppMetamo', 'concatAppMetamo:reload']);

    gulp.watch(concatJsArr, ['concatUglifyJs', 'concatUglifyJs:reload']);
});

gulp.task('default', ['html',/* 'images',*/ 'concatMinifyLibCss', 'styles', 'concatLibMetamo', 'concatAppMetamo', 'concatUglifyJs', 'watch']);