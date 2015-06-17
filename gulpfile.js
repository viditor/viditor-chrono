var gulp = require("gulp")
var gulp_if = require("gulp-if")
var gulp_util = require("gulp-util")
var gulp_sass = require("gulp-sass")
var gulp_uglify = require("gulp-uglify")
var gulp_connect = require("gulp-connect")
var gulp_minify_css = require("gulp-minify-css")
var gulp_minify_html = require("gulp-minify-html")
var gulp_prefixify_css = require("gulp-autoprefixer")
var gulp_json_transform = require("gulp-json-transform")

var watchify = require("watchify")
var browserify = require("browserify")
var reactify = require("reactify")
var envify = require("envify/custom")
var aliasify = require("aliasify")

var opn = require("opn")
var del = require("del")
var chalk = require("chalk")
var yargs = require("yargs")
var vinyl_buffer = require("vinyl-buffer")
var vinyl_source = require("vinyl-source-stream")

browserify = browserify(watchify.args)
    .add("./source/index.js")
    .transform("reactify")
    .transform(envify({
        devmode: true
    }))
    .transform(aliasify.configure({
        configDir: __dirname,
        aliases: {
            "<source>": "./source",
            "<scripts>": "./source/scripts",
            "<styles>": "./source/styles",
            "<assets>": "./source/assets"
        }
    }))

gulp.task("default", function() {
    gulp.start("build")
})

gulp.task("build", function() {
    gulp.start([
        "build:scripts",
        "build:styles",
        "build:markup",
        "build:assets"
    ])
})

gulp.task("build:scripts", function() {
    browserify.bundle()
        .pipe(vinyl_source("index.js"))
        .pipe(vinyl_buffer())
        .pipe(gulp_if(yargs.argv.minify, gulp_uglify()))
        .pipe(gulp.dest("./build"))
        .pipe(gulp_connect.reload())
})

gulp.task("build:styles", function() {
    gulp.src("./source/index.scss")
        .pipe(gulp_sass())
        .pipe(gulp_prefixify_css())
        .pipe(gulp_if(yargs.argv.minify, gulp_minify_css()))
        .pipe(gulp.dest("./build"))
        .pipe(gulp_connect.reload())
})

gulp.task("build:markup", function() {
    gulp.src("./source/index.html")
        .pipe(gulp_if(yargs.argv.minify, gulp_minify_html()))
        .pipe(gulp.dest("./build"))
        .pipe(gulp_connect.reload())
})

gulp.task("build:assets", function() {
    gulp.src("./source/assets/**/*", {base: "./source"})
        .pipe(gulp.dest("./build"))
        .pipe(gulp_connect.reload())
})

gulp.task("watch", function() {
    gulp.start([
        "watch:scripts",
        "watch:styles",
        "watch:markup",
        "watch:assets"
    ])
})

gulp.task("watch:scripts", function() {
    gulp.start("build:scripts")
    browserify = watchify(browserify).on("update", function() {
        gulp.start("build:scripts")
    })
})

gulp.task("watch:styles", function() {
    gulp.start("build:styles")
    gulp.watch("./source/**/*.scss", function() {
        gulp.start("build:styles")
    })
})

gulp.task("watch:markup", function() {
    gulp.start("build:markup")
    gulp.watch("./source/**/*.html", function() {
        gulp.start("build:markup")
    })
})

gulp.task("watch:assets", function() {
    gulp.start("build:assets")
    gulp.watch("./source/assets/**/*", function() {
        gulp.start("build:assets")
    })
})

gulp.task("server", function() {
    gulp.start("watch")
    gulp_connect.server({
        root: __dirname + "/build",
        livereload: true,
        port: 1234
    })
    opn("http://localhost:" + 1234)
})

process.on("uncaughtException", function (error) {
    console.log(chalk.red(error))
    gulp_util.beep()
})
