var gulp = require('gulp');
var gulpTs= require('gulp-typescript');
var tsProject_server = gulpTs.createProject('./server/tsconfig.json');
var tsProject_client = gulpTs.createProject('./client/app/tsconfig.json');
var gulpSm = require('gulp-sourcemaps');
var gulpClean = require('gulp-clean');

gulp.task('default', function () {
    console.log("Compiling server/*.ts");
    
    return gulp.src(['./server/**/*.ts'])
        .pipe(gulpSm.init())
        .pipe(gulpTs(tsProject_server))
        .pipe(gulpSm.write('./'))
        .pipe(gulp.dest('./server'));
});