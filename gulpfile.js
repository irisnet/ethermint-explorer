var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    nodemon = require('gulp-nodemon');
gulp.task('default', function () {
    var files = [
        'views/**/*.pug',
        'routes/**/*.js',
        'models/**/*.js',
        'public/**/*.*'
    ]
    browserSync.init(files, {
        proxy: 'http://localhost:3000',
        browser: 'chrome',
        notify: false,
        port: 4001
    });
    var stream = nodemon({
        script: './bin/www',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        }
    })
    stream.on('restart', function () {
        browserSync.reload();
    })
    // gulp.watch('views/**/*.pug').on("change", function () {
    //     browserSync.reload();
    // });
})