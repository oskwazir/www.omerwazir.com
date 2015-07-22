'use strict';

const marked = require('marked');
const jade = require('jade');
const jadePostRender = jade.compileFile('./src/_layouts/posts/post.jade',{pretty:'\t'});
const jadePageRender = jade.compileFile('./src/_layouts/pages/page.jade',{pretty:'\t'});
const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const plugins = require('gulp-load-plugins')();
const grayMatter = require('gray-matter');
const _ = require('lodash');
const $ = require('gulp-load-plugins')({ pattern: ['gulp-*'] });
const sortBy = require('lodash.sortby');

const getBundleName = function getBundleName() {
  const version = require('./package.json').version;
  const name = require('./package.json').name;
  return version + '.' + name + '.' + 'min';
};

const paths = {
  markdown:['src/posts/*.md'],
  styles:['src/styles/main.less'],
  jade:['src/**/*.jade','!src/_layouts/**/*.jade'],
  pages:['src/pages/*.md'],
  layouts:['src/layouts/*.jade']
}

const months = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];

const prettyDate = (date) => {
  const prettyDate = new Date(date);
  return `${months[prettyDate.getMonth()]} ${prettyDate.getDate()} ${prettyDate.getFullYear()}`;
}

let postAttributes = [];
let betterPostAttributes = new Map();
let postPath = "posts/";

gulp.task('browser-sync',  ['build'], () => {
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

gulp.task('clean', (cb) => {
  del(['css','posts','404.html','500.html','index.html','about','build','dist'], cb);
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
        .pipe(gulp.dest('css'));
});

gulp.task('jade',['posts'], () => {
  return gulp.src(paths.jade)
  .pipe($.jade({
    pretty:true,
    locals: { posts: postAttributes} }
  ))
  .pipe(gulp.dest('./'));
})

gulp.task('pages',(done) => {
  const stream =  gulp.src(paths.pages)
    .pipe($.data((file) => {
      const post = grayMatter(String(file.contents));
      post.data.path = `posts/${file.relative.split('.md').join('/')}`;
      
      post.content = marked(post.content);

      file.contents = new Buffer(jadePageRender({
        title:post.data.title,
        content:post.content
      }));
      return;
    }))
  .pipe($.rename((path) => {
      path.dirname = path.basename;
      path.basename = 'index';
      path.extname = '.html';
    }))
  .pipe(gulp.dest('./'));
  stream.on('end', () => {
    done();
  });
  stream.on('error', (err) => {
    console.error(err);
    done(err);
  });
})

gulp.task('posts',(done) => {
  const stream =  gulp.src(paths.markdown)
    .pipe($.changed('./posts'))
    .pipe($.data((file) => {
      const post = grayMatter(String(file.contents));
      post.data.path = `posts/${file.relative.split('.md').join('/')}`;

      if(!betterPostAttributes.has(post.data.title)){
        betterPostAttributes.set(post.data.title,post.data);
      }

      post.content = marked(post.content);

      file.contents = new Buffer(jadePostRender({
        title:post.data.title,
        lead:post.data.lead,
        prettyDate: prettyDate(post.data.date),
        content:post.content
      }));
      return;
    }))
  .pipe($.rename((path) => {
      path.dirname = path.basename;
      path.basename = 'index';
      path.extname = '.html';
    }))
  .pipe(gulp.dest(postPath));

    stream.on('end', () => {
      postAttributes = sortBy([...betterPostAttributes.values()],(post) => {
        let epoch = new Date(post.date).getTime();
        return -epoch;
    });
      done();
    });

    stream.on('error', (err) => {
      console.error(err);
      done(err);
    });
})



gulp.task('build', ['styles','jade','pages']);

gulp.task('watch', function(){
  gulp.watch(paths.markdown,['posts']);
  gulp.watch(paths.styles,['styles']);
  gulp.watch(paths.jade,['jade']);
  gulp.watch(paths.layouts,['jade']);
});

gulp.task('default', ['watch','browser-sync']);