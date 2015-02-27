var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    less = require('gulp-less');

var server = {
  host: 'localhost',
  port: '8001'
}

var path = { src: "src/", dst: "dist/" };

gulp.task('copy', function () {
  gulp.src([path.src +'*.html']).pipe(gulp.dest(path.dst));
  gulp.src(['bower_components/**']).pipe(gulp.dest(path.dst + 'bower_components'));


});

gulp.task('less', function () {
  gulp.src([path.src + 'sega2.less'])
    .pipe(less())
    .pipe(gulp.dest(path.dst))
});

gulp.task('watch', function() {

  gulp.watch([path.src + '*.less'], ['less']);
  gulp.watch([path.src + '*.html'], ['copy']);
  
});

gulp.task('webserver', function() {
  gulp.src(path.dst)
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});




// MAIN --------------
gulp.task('development', ['copy', 'less', 'webserver', 'watch']);
gulp.task('build', ['copy', 'less']);
gulp.task('default', ['development']);
