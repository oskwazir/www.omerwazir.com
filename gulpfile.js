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
const sortBy = require('lodash.sortby');

const getBundleName = function () {
  const version = require('./package.json').version;
  const name = require('./package.json').name;
  return version + '.' + name + '.' + 'min';
};

const paths = {
  markdown:['src/posts/*.md'],
  less:'src/styles/main.less',
  homepage:'src/index.jade'
} 

let postAttributes = [];

gulp.task('browser-sync',  ['build'],  function() {
  browserSync({
    server: {
      baseDir: './build',
      directory: true
    },
    open: false,
    notify: false,
    port:9778
  });
});

gulp.task('clean', function(cb) {
  del(['css','build'], cb);
});
 
gulp.task('styles', function () {
    return gulp.src(paths.less)
        .pipe($.less())
        .on('error', function handleError(err) {
            console.error(err.toString());
            this.emit('end');
          })
        .pipe($.autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('css'))
        .pipe($.csso())
        .pipe($.rename(function(path){
            path.extname = '.min.css';
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('homepage',['posts'],function(){
  return gulp.src(paths.homepage)
  .pipe($.jade({
    pretty:true,
    locals: { posts: postAttributes} }
  ))
  .pipe(gulp.dest('build/'));
})

gulp.task('posts',function(done){
  const stream =  gulp.src(paths.markdown)
    .pipe($.changed('build/posts'))
    .pipe($.data(function(file){
      const post = grayMatter(String(file.contents));
      post.data.path = `posts/${file.relative.split('.md').join('.html')}`;
      postAttributes.push(post.data);
      post.content = marked(post.content);
      console.log(post.data);
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
      postAttributes = sortBy(postAttributes,function(post){
        let epoch = new Date(post.date).getTime();
        return -epoch;
    })
      done();
    });

    stream.on('error', function(err){
      console.error(err);
      done(err);
    });
})


gulp.task('build', ['styles','posts']);

gulp.task('watch', function(){
  gulp.watch(paths.markdown,['posts']);
  gulp.watch(paths.less,['styles']);
})

gulp.task('default', ['watch','build']);