'use strict';

const marked = require('marked');
const jade = require('jade');
const jadePostRender = jade.compileFile('./src/_layouts/posts/post.jade',{pretty:'\t'});
const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const plugins = require('gulp-load-plugins')();
const grayMatter = require('gray-matter');
const _ = require('lodash');
const $ = require('gulp-load-plugins')({ pattern: ['gulp-*'] });
const getBundleName = function () {
  const version = require('./package.json').version;
  const name = require('./package.json').name;
  return version + '.' + name + '.' + 'min';
};
let pagesAttributes = {
  posts: []
}

gulp.task('browser-sync',  ['build'],  function() {
  browserSync({
    server: {
      baseDir: './',
      directory: false
    },
    open: false,
    notify: false,
    port:9778
  });
});

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

gulp.task('clean', function(cb) {
  del(['css','build'], cb);
});
 
gulp.task('css',['clean'], function () {
    return gulp.src('src/styles/*.less')
        .pipe($.less())
        .on('error', handleError)
        .pipe($.autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe($.csso())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});

gulp.task('posts',['clean'] ,function(done){
  const stream =  gulp.src(['src/posts/*.md'])
    .pipe($.data(function(file){
      const post = grayMatter(String(file.contents));
      post.content = marked(post.content);
      file.contents = new Buffer(jadePostRender({
        title:post.data.title,
        lead:post.data.lead,
        date:post.data.date,
        content:post.content
      }));
      return;
    }))
  .pipe($.rename(function(path){
      path.extname = '.html';
    }))
  .pipe(gulp.dest('build/posts'));

    stream.on('end', function(){
      done();
    });

    stream.on('error', function(err){
      console.error(err);
      done(err);
    });
})


gulp.task('build', ['css','posts']);

gulp.task('default', ['clean'], function () {
    gulp.start(['build', 'browser-sync']);
    gulp.watch('**/*.less', ['css']);
    gulp.watch('**/*.jade', ['jade']);
});