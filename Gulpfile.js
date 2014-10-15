var _ = require('underscore');
var gulp = require('gulp');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');

var buildMode = false;

// Main Tasks

gulp.task('build', function() {
  buildMode = true;
  runSequence('compile');
});

gulp.task('compile', function() {
  runSequence('clean', ['vendors', 'index', 'boot', 'js', 'views', 'css'],
    'inject-js', 'inject-vendors', 'inject-css',
    function() {
      if (buildMode === false) {
        runSequence('concat-templates', 'uglify-all');
      }
    });
});

gulp.task('run-build-server', function() {
  return runSequence('build', 'local-server', 'watch');
});

gulp.task('run-compile-server', function() {
  return runSequence('compile', 'local-server', 'watch');
});

// End Main Tasks

gulp.task('index', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('boot', function() {
  return gulp.src('src/boot.js')
    .pipe(gulp.dest('build/'));
});

gulp.task('vendors', function() {
  return gulp.src('src/vendor/**/*')
    .pipe(gulp.dest('build/vendor'));
});

gulp.task('views', function() {
  var task = gulp.src('src/**/*.tpl.html', '!src/vendor/**/*')
    .pipe(templateCache("templates.js", {
      module: 'templatescache',
      standalone: true,
    }));

  return task.pipe(gulp.dest('build/'));
});

gulp.task('css', function() {
  var cssTask = gulp.src(['src/styles/style.scss'])
    .pipe(sass());

  if (buildMode !== true) {
    cssTask.pipe(minifyCSS());
  }

  cssTask.pipe(gulp.dest('build/css/'));
});

gulp.task('inject-css', function() {
  var target = gulp.src('./build/index.html');
  var sources = gulp.src(['build/css/**/*.css'], {
    read: false
  });

  return target.pipe(inject(sources, {
      relative: true
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('js', function() {
  if (buildMode === true) {

    return gulp.src(['src/**/*.js', '!src/vendor/**/*', '!src/boot.js', '!src/config.js', '!src/templates.js'])
      .pipe(gulp.dest('./build/'));

  } else {

    var configRequire = require('./src/config.js').requirejs;
    var configBuild = {
      baseUrl: 'src',
      name: 'app',
      optimize: 'none',
      out: 'app.js',
      wrap: true
    };
    var config = _(configRequire).extend(configBuild);

    return gulp.src(['no need to supply files because everything is in config'])
      .pipe(rjs(config))
      .pipe(uglify())
      .pipe(gulp.dest('build/'));

  }
});

gulp.task('inject-vendors', function() {
  var configRequire = require('./src/config.js').vendors;

  return gulp.src('build/boot.js')
    .pipe(inject(gulp.src([''], {
      read: false
    }), {
      starttag: '//inject:vendors-main-files',
      endtag: '//end-inject:vendros-main-files',
      transform: function(filepath, file, i, length) {
        var vendors = '';

        _.each(configRequire.main, function(vendor) {
          vendors += '\'' + vendor + '\',';
        });

        return vendors;
      }
    }))
    .pipe(inject(gulp.src([''], {
      read: false
    }), {
      starttag: '//inject:vendors-files',
      endtag: '//end-inject:vendros-files',
      transform: function(filepath, file, i, length) {
        var vendors = '';

        _.each(configRequire.library, function(vendor) {
          vendors += '\'' + vendor + '\',';
        });

        return vendors;
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('inject-js', function() {
  var task = gulp.src('build/boot.js');

  var src = gulp.src([buildMode !== true ? './build/app.js' : 'build/templates.js'], {
    read: false
  });

  task.pipe(inject(src, {
    relative: true,
    starttag: '//inject:app-files',
    endtag: '//end-inject:app-files',
    transform: function(filepath, file, i, length) {
      return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
    }
  }));

  if (buildMode === true) {
    task.pipe(inject(gulp.src([''], {
      read: false
    }), {
      starttag: '//inject:require-build-config',
      endtag: '//end-inject:require-build-config',
      transform: function(filepath, file, i, length) {
        var configRequire = require('./src/config.js').requirejs;

        var requireConfig = 'require.config(';
        requireConfig += JSON.stringify(configRequire);
        requireConfig += ');';

        return requireConfig;
      }
    }));
  }

  return task.pipe(gulp.dest('build/'));
});

gulp.task('build-inject-require-config', function() {
  return gulp.src('build/boot.js')

  .pipe(gulp.dest('build/'));
});

gulp.task('concat-templates', function() {
  return gulp.src(['build/templates.js', 'build/app.js'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/'));
});

gulp.task('uglify-all', function() {
  return gulp.src(['build/**/*.js', '!build/vendor/**/*'])
    .pipe(uglify())
    .pipe(gulp.dest('build/'));
});

gulp.task('clean', function() {
  return gulp.src('build/')
    .pipe(clean({
      force: true
    }));
});

// Local Server - Gulp connect

gulp.task('local-server', function() {
  connect.server({
    root: 'build/',
    port: 8080,
    livereload: true
  });
});

gulp.task('watch', function() {

  gulp.watch(['src/index.html'], ['index']);

  gulp.watch(['src/**/*.js', '!src/vendor/**/*', '!src/boot.js', '!src/config.js', '!src/templates.js'],
  function(){
    runSequence('js', function(){
      if(buildMode !== true){
        runSequence('concat-templates');
      }
    })
  });

  gulp.watch(['src/**/*.scss', '!src/vendor/**/*.scss'], ['css']);

  gulp.watch(['src/**/*.tpl.html', '!src/vendor/**/*'], function() {
    runSequence('views', function() {
      if (buildMode !== true) {
        runSequence('concat-templates', 'uglify-all');
      }
    });
  });

});

// End Local Server
