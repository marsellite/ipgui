var gulp = require('gulp');
var sh = require('shelljs');
//var browserify = require('browserify');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat')
var transform = require('vinyl-transform');
//var uglify = require('gulp-uglify');

gulp.task('install', ['vendor', 'browserify']);

gulp.task('vendor', function(){
	sh.exec('cp -rf node_modules/bootstrap/dist/css app/');
	sh.exec('cp -rf node_modules/bootstrap/dist/fonts app/');
	gulp.src([
	'node_modules/jquery/dist/jquery.min.js',	
	'node_modules/bootstrap/dist/js/bootstrap.min.js',
	'node_modules/bootstrap-filestyle/src/js/bootstrap-filestyle.min.js'
	
	])
	.pipe(concat('vendor.js'))
	.pipe(gulp.dest('app/js/'))
});

gulp.task('browserify', function () {
  
  return gulp.src('src/app.js')
    .pipe(browserify({
      insertGlobals: true
    }))    
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('app/js/'));
});

gulp.task('debug', function() {
    sh.exec('rm -rf www; ln -s app www');
});