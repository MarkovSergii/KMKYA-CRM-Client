/**
 * Created by user on 28.06.2016.
 */

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

var dist = {
    css : "dist/css",
    main : "dist",
    js : "dist/js",
    templates : "dist"
    
};



gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest(dist.main));
});

gulp.task('css', function() {
    return gulp.src(['src/css/*.css'])
        .pipe(concat('main.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(dist.css));
});
 

gulp.task('templates', function() {

    gulp.src('src/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(dist.templates))
});

gulp.task('vendorjs', function() {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest(dist.js));

});

gulp.task('app', function() {
    gulp.src(['src/app.js','src/app_parts/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dist.main));

});



gulp.task('watch', function() {

    gulp.run('vendorjs');
    gulp.run('templates');
    gulp.run('html');
    gulp.run('css');
    gulp.run('app');

    gulp.watch('src/*.js', function() {
        gulp.run('vendorjs');
    });

    gulp.watch('src/app.js', function() {
        gulp.run('app');
    });

    gulp.watch('src/app_parts/**/*.js', function() {
        gulp.run('app');
    });    
    
    gulp.watch('src/css/*.css', function() {
        gulp.run('css');
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


