var gulp = require('gulp');

var gulpTs= require('gulp-typescript');
var tsProject_server = gulpTs.createProject('./server/ts/tsconfig.json');
var tsProject_client = gulpTs.createProject('./client/app/ts/tsconfig.json');

var gulpSm = require('gulp-sourcemaps');

var gulpClean = require('gulp-clean');

var browserSync = require('browser-sync');
  console.log("Initiating browser sync configuration...");
    browserSync.init(
        {
        proxy: "http://localhost:3036/angular"                       
        }
    );

var nodemon = require('gulp-nodemon');

// server (watch_server)
//*************************************************************************
// 1. When started - initial compile, clean everything in ./server/js, then compile everything from ./server/ts
// 2. Start nodemon on server/js/index.js
// watch for changes in server/ts/* - recompile if neccessary

gulp.task('clean_server_app_dir', function(){
    console.log("Cleaning server/js/*");
    return gulp.src(['./server/js/**/*'], {read:false})
        .pipe(gulpClean());
});

gulp.task('compile_server_app', ['clean_server_app_dir'], function () {
    console.log("Compiling server/ts/*.ts");
    
    return gulp.src(['./server/ts/*.ts'])
        .pipe(gulpSm.init())
        .pipe(gulpTs(tsProject_server))
        .pipe(gulpSm.write('./'))
        .pipe(gulp.dest('./server/js/'));
});

gulp.task('watch_server_changes', ['compile_server_app'], function(){
    return gulp.watch(['./server/ts/*.ts'], ['compile_server_app']);
});

gulp.task('watch_server', ['watch_server_changes'], function(){
    console.log("Watch server");
    return nodemon({
    script: './server/js/index.js'
        })
        .on('start', function(){
            console.log("Nodemon started on index.js....");    
        })
        .on('crash', function(){
            console.log("Nodemon crashed on any reason...");
        });
});

// client (watch_client)
//**********************************************************************
// 1. When started - initial compile, clean everything in ./client/app/js, then compile everything from client/app/ts
// 2. Start watching file changes in client/app/ts
// 3. When changes happen, recompile, sync browser

gulp.task('clean_client_app_dir', function(){
    console.log("Cleaning client/app/js/*");
    return gulp.src(['./client/app/js/**/*'], {read:false})
        .pipe(gulpClean());
});

gulp.task('compile_client_app', ['clean_client_app_dir'], function(){
  

    console.log('Compiling client application...');
    return gulp.src(['./client/app/ts/**/*.ts'])
        .pipe(gulpSm.init())
        .pipe(gulpTs(tsProject_client))
        .pipe(gulpSm.write('./'))
        .pipe(gulp.dest('./client/app/js/'));    
})

gulp.task('browser_sync', ['compile_client_app'], function(){
    browserSync.reload();
});

gulp.task('watch_client', ['compile_client_app'], function(){
    return gulp.watch(['./client/app/ts/**/*.ts'], ['browser_sync']);
});

gulp.task('watch_client_html', function(){
    console.log("Watching /client/app/ts/**/*.html");
    return gulp.watch(['./client/app/ts/**/*.html'], ['browser_sync']);
})

//******************************************************************************

gulp.task('default', ['watch_server', 'watch_client', 'watch_client_html'], function() {
    console.log("Watching all...");
});


 gulp.task('copy', function () {
        return gulp.src(['server/**/*'], {
            base: 'server'
        }).pipe(gulp.dest('server_deploy'));
    });
gulp.task('compile_everything', ['compile_server_app', 'compile_client_app'], function(){
    console.log("Compiling everything !!!");
})
