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
  styles:['src/styles/main.less'],
  jade:['src/**/*.jade','!src/_layouts/*.jade'],
  layouts:['src/layouts/*.jade']
} 

let postAttributes = [];
let betterPostAttributes = new Map();

gulp.task('browser-sync',  ['build'],  function() {
  browserSync({
    server: {
      baseDir: './',
      directory: true
    },
    open: false,
    notify: false,
    port:9778
  });
});

gulp.task('clean', function(cb) {
  del(['css','posts','404.html','500.html','index.html'], cb);
});
 
gulp.task('styles', function () {
    return gulp.src(paths.styles)
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

gulp.task('jade',['posts'], function() {
  return gulp.src(paths.jade)
  .pipe($.jade({
    pretty:true,
    locals: { posts: postAttributes} }
  ))
  .pipe(gulp.dest('./'));
})

gulp.task('posts',function(done){
  const stream =  gulp.src(paths.markdown)
    .pipe($.changed('./posts'))
    .pipe($.data(function(file){
      const post = grayMatter(String(file.contents));
      post.data.path = `posts/${file.relative.split('.md').join('.html')}`;

      if(!betterPostAttributes.has(post.data.title)){
        betterPostAttributes.set(post.data.title,post.data);
      }
      
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
  .pipe(gulp.dest('./posts'));

    stream.on('end', function(){
      postAttributes = sortBy([...betterPostAttributes.values()],function(post){
        let epoch = new Date(post.date).getTime();
        return -epoch;
    });
      done();
    });

    stream.on('error', function(err){
      console.error(err);
      done(err);
    });
})



gulp.task('build', ['styles','jade']);

gulp.task('watch', function(){
  gulp.watch(paths.markdown,['posts']);
  gulp.watch(paths.styles,['styles']);
  gulp.watch(paths.jade,['jade']);
  gulp.watch(paths.layouts,['jade']);
});

gulp.task('default', ['watch','build']);