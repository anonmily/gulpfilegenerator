// Declare Dependencies
var gulp = require("gulp");
var notifier = require("node-notifier");
var beep = require("beeper");
var domain = require("domain");
var _ = require("lodash");
var util = require("gulp-util");
var less = require("gulp-less");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var browsersync = require("browser-sync");
var reload = browsersync.reload;
var plumber = require("gulp-plumber");
var nodemon = require("gulp-nodemon");
var mocha = require("gulp-mocha");
var browserify = require("browserify");
var babelify = require("babelify");
var tap = require("gulp-tap");
var rename = require("gulp-rename");
var reactify = require("reactify");
var mocha = require("mocha");


//--------------------

function handleError(name) {
    return function(err) {
        console.log(err.toString())
        notifier.notify({
            'title': ": " + name,
            'message': err
        });
        beep();
        this.emit("end");
    }
}

//--------------------

gulp.task('less', function() {

    gulp.src([
        "frontend/#less/style.less"
    ])
    .pipe(plumber())
    .pipe(less())
    .on('error', handleError('LESS Error'))
    .pipe(autoprefixer({
        browsers: ["last 2 versions"],
        cascade: true
    }))
    .pipe(plumber.stop())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(reload({
        stream: true
    }))
}); 

//--------------------

gulp.task('browsersync', function() {
    return browsersync.init(null, {
        proxy: "http://localhost:9000",
        files: ["public*/**.*"],
        browser: "google chrome",
        port: 8000,
    });
});

//--------------------

gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: 'backend/server.js',
        ext: 'js',
        ignore: ["gulp*",
        "node_modules/*/**",
        "node_modules/*/*/**",
        "*/node_modules/*/**",
        "*/node_modules/*/*/**",
        "*/bower_components/*/**",
        "*/bower_components/*/*/**",
        "*/public/*/**"]
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true; 
        } 
    });
});

//--------------------

gulp.task('js', function() {
    return gulp.src([
            "bower_components/jquery/dist/jquery.min.js"
        ])
        .pipe(concat('frontend.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest( dest.dir.js ));
});

gulp.task('reloadjs', function() {
    return gulp.src(['public/js/**.js'])
        .pipe(reload({
            stream: true
        }));
});

//--------------------

gulp.task('reactify', function(cb) {
    return gulp.src([
            "frontend/app/Main.js"
        ])
        .pipe(plumber())
        .pipe(tap(function(file) {
            var d = domain.create();
            d.on('error', handleError('Reactify Error'));
            d.run(function() {
                file.contents = browserify({
                        entries: [file.path]
                    })
                    .transform(babelify, { 
                        presets: ["es2015", "react"],
                        plugins: ["transform-class-properties"]
                    })
                    .bundle()
            });
        }))
        .on('error', handleError('Reactify Error'))
        .pipe(rename("bundle.js"))
        .pipe(plumber.stop())
        .pipe(gulp.dest( "public/js" ))
});

gulp.task('react', ['reactify'], function(){
    return gulp.src([ "public/js/**.js"])
        .pipe(reload({
            stream: true
        }));
})

//--------------------


gulp.task('scripts', ['js'], function() {
    return gulp.src("frontend/app/Main.js","bower_components/jquery/dist/jquery.min.js")
        .pipe(concat( evoke.js ))
        .on('error', util.log)
        .pipe(gulp.dest( destination.directory ))
        .pipe(reload({
            stream: true
        }));
});


//--------------------

gulp.task('css', function() {
    return gulp.src([
        	"public/css/bootstrap.css",
        	"public/css/style.css"
        ])
        .pipe(concat('frontend.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(reload({
            stream: true
        }));
});

//--------------------

gulp.task('watch', function() {
	
    gulp.watch( [
    	"frontend/#less/style.less"
    ],["less"]);
    
    gulp.watch( [
    	"bower_components/jquery/dist/jquery.min.js"
    ],["js"]);
    
    gulp.watch( [
    	"frontend/app/Main.js"
    ],["react","mocha"]);
    
    gulp.watch( [
    	"public/css/bootstrap.css",
    	"public/css/style.css"
    ],["css"]);
    
});

//--------------------

gulp.task("default",["less","browsersync","nodemon","js","react","scripts","css","watch"]);