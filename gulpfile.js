//Requires

let gulp = require('gulp');
    uglify = require('gulp-uglify');
    browserSync = require('browser-sync');
    reload = browserSync.reload;
    sass = require('gulp-sass');
    rename = require('gulp-rename');
    plumber = require('gulp-plumber');
    clean = require('gulp-clean');
    del = require('del');
    babel = require('gulp-babel');
    // build = require('gulp-build');

//Scripts
gulp.task('scripts', function(){
    gulp.src([
        'app/scripts/**/*.js',
        '!app/scripts/**/*.min.js'
    ])
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(plumber())
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('app/scripts'))
    .pipe(reload({stream: true}));
});

//Watch Tasks
gulp.task('watch' ,['browser-sync'], function(){
    gulp.watch(
        'app/scripts/*.js',
        ['scripts']
    );
    gulp.watch(
        'app/scss/*.scss',
        ['sass']
    );
    gulp.watch(
        'app/**/*.html',
        ['html']
    );
    
});

//Sass Tasks
gulp.task('sass', function () {
    gulp.src('app/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream: true}));
});

//HTML Tasks
gulp.task('html', function(){
    gulp.src('app/**/*.html')
    .pipe(reload({stream: true}));
});
   

//ES6 task
// gulp.task('es6', function(){
//     return gulp.src('app/')
// });


// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('build:cleanfolder', function () {
    return gulp.src('*.*', {read: false})
        .pipe(gulp.dest('build/'));
});

gulp.task('build:clean', function(){
    return gulp.src('build/', {read: false})
        .pipe(clean());
});

// task to create build directory of all files
gulp.task('build:copy',['build:clean'], function(){
    return gulp.src('app/**/*/')
    .pipe(gulp.dest('build/'));
});

// task to removed unwanted build files
// list all files and directories here that you don't want included
gulp.task('build:remove', function () {
    
});

gulp.task('build', ['build:cleanfolder', 'build:copy'], function(){
    return del(
        ['build/scss', 'build/scripts/!(*.min.js)'],{force: true}
    );
});


//BrowserSync Tasks
gulp.task('browser-sync', function(){
    browserSync({
        server:{
            baseDir: './app'
        }
    });
});

//Default Tasks
gulp.task('default', 
        [
            'scripts',
            'sass',
            'html',
            'browser-sync',
            'watch',
            'build'
        ]);