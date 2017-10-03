var gulp = require('gulp');
var gutil = require('gulp-util');
var webserver = require('gulp-webserver');
var less = require('gulp-less');

var Comb = require('csscomb');
var combConf = require('./sega2-csscomb.json');
var comb = new Comb(combConf);


var server = {
  host: 'localhost',
  port: '3001'
};

var path = { src: "less/", dst: "." };

gulp.task('csscomb', function () {
  comb.processPath('less');
});

gulp.task('less', function () {
  gulp.src(['sega2.less'])
    .pipe(less())
    .on('error', gutil.log)
    .pipe(gulp.dest(path.dst));
});

gulp.task('watch', function() {
  gulp.watch([path.src + '*.less'], ['less']);
});

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: true
    }));
});

// MAIN --------------
gulp.task('development', ['less', 'webserver', 'watch']);
gulp.task('build', ['less']);
gulp.task('default', ['development']);
