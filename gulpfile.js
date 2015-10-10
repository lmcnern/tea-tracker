'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var stylish = require('jshint-stylish');
var minifyHTML = require('gulp-minify-html');
var KarmaServer = require('karma').Server;

gulp.task('jshint', function() {
  return gulp.src(['*.js'])
   .pipe(jshint())
   .pipe(jshint.reporter(stylish));
});

gulp.task('test', function() {
  return gulp.src('./test/tests.js')
      .pipe(mocha( { reporter: 'nyan' } ));
});

gulp.task('karmatest', ['webpack:test'], function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('webpackdev', function() {
  return gulp.src('./app/js/**/*.js')
             .pipe(webpack({
               output: {
                 filename: 'bundle.js'
               }
             }))
             // .pipe(uglify())
             .pipe(gulp.dest('./public/js/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/karma-tests/entry.js')
    .pipe(webpack({
      output:{
        filename: 'test-bundle.js'
      }
    }))
    .pipe(gulp.dest('test/karma-tests'));
});

gulp.task('copy', function() {
  var opts = {
    conditionals: true,
    spare: true
  };
  return gulp.src(['./app/**/*.html', './app/**/*.css'])
             .pipe(gulp.dest('./public/'))
             // .pipe(minifyHTML(opts))
             .pipe(gulp.dest('./public/'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['app/**/*.js', '*.js', '*.css'], ['build', 'jshint']);
  gulp.watch(['app/**/*.html', 'app/**/*.css'], ['copy']);
});

gulp.task('default', ['jshint', 'test']);
gulp.task('build', ['copy', 'webpackdev']);
