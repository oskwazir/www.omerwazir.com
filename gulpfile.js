'use strict';

const gulp = require('gulp');
const del = require('del');
const $ = require('gulp-load-plugins')({ pattern: ['gulp-*'] });

const paths = {
  styles:['web/static/css/main.less'],
}

gulp.task('clean', (cb) => {
  del(['priv/static/css'], cb);
});
 
gulp.task('styles', () => {
    return gulp.src(paths.styles)
        .pipe($.less())
        .on('error', (err) => {
            console.error(err.toString());
            this.emit('end');
          })
        .pipe($.autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('css'))
        .pipe($.csso())
        .pipe($.rename((path) => {
            path.extname = '.min.css';
        }))
        .pipe(gulp.dest('priv/static/css'));
});

gulp.task('watch',() => {
  gulp.watch(paths.styles,['styles']);
});

gulp.task('default', ['watch','styles']);

