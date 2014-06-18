var gulp = require("gulp"),
    sass = require("gulp-ruby-sass"), // Run `gem install sass`
    prefix = require("gulp-autoprefixer"),
    slim = require("gulp-slim"), // Run `gem install slim`
    changed = require("gulp-changed"),
    rename = require("gulp-rename");

gulp.task("default", function() {
  gulp.watch("../ui-src/stylesheets/**/*.sass", ["styles"]);
});

gulp.task("markup", function() {
  gulp.src("../ui-src/markup/**.slim")
    .pipe(changed("./"))
    .pipe(slim({pretty:true, sort_attrs:false}))
    .pipe(gulp.dest("./"));
});

gulp.task("styles", function() {
  gulp.src("../ui-src/stylesheets/viditor.main.sass")
    .pipe(changed("../"))
    .pipe(sass({sourcemap: true, style: "compact"}))
    .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest("../"));
});
