var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    symlink = require('gulp-symlink'),
    less = require('gulp-less');

var server = {
  host: 'localhost',
  port: '3001'
}

var path = { src: "less/", dst: "." };

gulp.task('less', function () {
  gulp.src([path.src + 'sega2.less'])
    .pipe(less())
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
