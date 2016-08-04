/**
 * Created by user on 28.06.2016.
 */

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

var dist = {
    css : "dist/css",
    main : "dist",
    js : "dist/js",
    fonts : "dist/fonts",
    img : "dist/img",
    templates : "dist"
    
};



gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest(dist.main));
});

gulp.task('css', function() {
    return gulp.src(['src/css/vendor_css/*.css','src/css/user_css/*.css'])
        .pipe(concat('main.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(dist.css));
});
 

gulp.task('templates', function() {

    gulp.src(['src/**/*.html','!src/index.html'])
        .pipe(gulp.dest(dist.templates))
});

gulp.task('fonts', function() {
    gulp.src('src/fonts/*.*')
        .pipe(gulp.dest(dist.fonts));

});

gulp.task('img', function() {
    gulp.src('src/img/*.*')
        .pipe(gulp.dest(dist.img));

});

gulp.task('vendorjs', function() {

  
    gulp.src('src/js/*.js')
     //   .pipe(uglify({mangle: false}))
     //   .pipe(concat('vendors.js'))
        .pipe(gulp.dest(dist.js));

});

gulp.task('app', function() {
    gulp.src(['src/app.js','src/app_config/*.js','src/services/*.js','src/directives/*.js','src/app_parts/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dist.main));

});



gulp.task('watch', function() {

    gulp.run('vendorjs');
    gulp.run('templates');
    gulp.run('img');
    gulp.run('html');
    gulp.run('css');
    gulp.run('fonts');
    gulp.run('app');

    gulp.watch('src/*.js', function() {
        gulp.run('vendorjs');
    });

    gulp.watch(['src/app.js','src/app_config/*.js','src/services/*.js','src/directives/*.js','src/app_parts/**/*.js'], function() {
        gulp.run('app');
    });

    gulp.watch('src/img/*.*', function() {
        gulp.run('img');
    });
    
    gulp.watch('src/css/**/*.css', function() {
        gulp.run('css');
    });

    gulp.watch('src/fonts/*.*', function() {
        gulp.run('fonts');
    });
    
    gulp.watch('src/index.html', function() {
        gulp.run('html');
    });

    gulp.watch(['src/**/*.html','!src/index.html'], function() {
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


