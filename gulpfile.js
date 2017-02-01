var gulp = require('gulp');
var gulpTs= require('gulp-typescript');
var tsProject_server = gulpTs.createProject('./server/tsconfig.json');
var tsProject_client = gulpTs.createProject('./client/app/tsconfig.json');
var gulpSm = require('gulp-sourcemaps');
var gulpClean = require('gulp-clean');

/*var browserSync = require('browser-sync');
  console.log("Initiating browser sync configuration...");
    browserSync.init(
        {
        proxy: "http://localhost:3036"                       
        }
    );*/

var nodemon = require('gulp-nodemon');

// server (watch_server)
//*************************************************************************
// 1. When started - initial compile, then compile everything from ./server/ts
// 2. Start nodemon on server/index.js
// watch for changes in server/*.ts - recompile if neccessary

gulp.task('compile_server_app', function () {
    console.log("Compiling server/*.ts");
    
    return gulp.src(['./server/**/*.ts'])
        .pipe(gulpSm.init())
        .pipe(tsProject_server())
        .pipe(gulpSm.write('./'))
        .pipe(gulp.dest('./server/**/'));
});

gulp.task('watch_server_changes', ['compile_server_app'], function(){
    console.log("Watch for changes in ./server/**");
    return gulp.watch(['./server/**/*.ts'], ['compile_server_app']);
});

gulp.task('watch_server', function(){
    console.log("Watching server");
    return nodemon({
    script: './server/index.js'
        })
        .on('start', function(){
            console.log("Nodemon started on index.js....");    
        })
        .on('crash', function(){
            console.log("Nodemon crashed on any reason...");
        });
});

/*gulp.task('default', ['watch_server'], function() {
    console.log("Watching all...");
});*/


 //gulp.task('copy', function () {
   //     return gulp.src(['server/**/*'], {
     //       base: 'server'
       // }).pipe(gulp.dest('server_deploy'));
    //});
//gulp.task('compile_everything', ['compile_server_app', 'compile_client_app'], function(){
  //  console.log("Compiling everything !!!");
//})
