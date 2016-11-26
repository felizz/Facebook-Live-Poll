var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util')
    ;

var gulp_src = gulp.src;
gulp.src = function () {
    return gulp_src.apply(gulp, arguments)
        .pipe(plumber(function (error) {
            // Output an error message
            gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
            // emit the end event, to properly end the task
            this.emit('end');
        })
    );
};

var gulp_watch = gulp.watch;
gulp.watch = function () {
    return gulp_watch.apply(gulp, arguments)
        .on('add', function (file) {
            gutil.log('File', file.path, 'has been added');
        })
        .on('change', function (file) {
            gutil.log('File', file.path, 'has been changed');
        })
        .on('unlink', function (file) {
            gutil.log('File', file.path, 'has been removed');
        })
        // More events.
        .on('addDir', function (file) {
            gutil.log('Directory', file.path, 'has been added');
        })
        .on('unlinkDir', function (file) {
            gutil.log('Directory', file.path, 'has been removed');
        })
        .on('error', function (error) {
            gutil.log('Error happened', error);
        })
        .on('ready', function () {
            gutil.log('Initial scan complete. Ready for changes.');
        })
}

module.exports = gulp;