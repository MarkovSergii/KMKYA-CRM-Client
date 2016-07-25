/**
 * Created by user on 28.06.2016.
 */

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var jade = require('gulp-jade');
var concat = require('gulp-concat');

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('templates', function() {

    gulp.src('src/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'))
});


gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js/'));

});

gulp.task('watch', function() {

    gulp.run('js');
    gulp.run('templates');
    gulp.run('html');

    gulp.watch('src/*.js', function() {
        gulp.run('js');
    });

    gulp.watch('src/index.html', function() {
        gulp.run('html');
    });

    gulp.watch('src/**/*.jade', function() {
        gulp.run('templates');
    });

    browserSync.init({
        server: {
            baseDir: './dist/'
           // index:'dest/index.html'
        },
        host: '127.0.0.1',
        port: 4444,
        open: false,
        notify: false,
        ui: false,
        ghostMode: false
    });

    gulp.watch("./dist/*.*").on('change', browserSync.reload);
});


