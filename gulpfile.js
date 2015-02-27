var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    symlink = require('gulp-symlink'),
    less = require('gulp-less');

var server = {
  host: 'localhost',
  port: '3000'
}

var path = { src: "src/", dst: "dist/sega2" };

gulp.task('copy', function () {
  gulp.src([path.src +'*.html']).pipe(gulp.dest(path.dst)).pipe(gulp.dest('./'));

  // Symlinks for development (flat structure)
  //gulp.src('bower_components/**')
  //.pipe(symlink.relative('../$'));
});

gulp.task('less', function () {
  gulp.src([path.src + 'sega2.less'])
    .pipe(less())
    .pipe(gulp.dest(path.dst))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  gulp.watch([path.src + '*.less'], ['less']);
  gulp.watch([path.src + '*.html'], ['copy']);
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
gulp.task('development', ['copy', 'less', 'webserver', 'watch']);
gulp.task('build', ['copy', 'less']);
gulp.task('default', ['development']);
