import gulp from "gulp";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import cssmin from "gulp-cssmin";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import svgmin from "gulp-svgmin";

// Define file paths
const paths = {
  js: "src/js/**/*.js",
  css: "src/css/**/*.css",
  images: "src/images/**/*.{jpg,jpeg,png,gif,svg}",
  svg: "src/svg/**/*.svg",
  dist: "dist",
};

// Combine and minify JavaScript files
gulp.task("js", function () {
  return gulp
    .src(paths.js)
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

// Combine and minify CSS files
gulp.task("css", function () {
  return gulp
    .src(paths.css)
    .pipe(concat("styles.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest(paths.dist));
});

// Optimize images
gulp.task("images", function () {
  return gulp
    .src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist + "/images"));
});

// Optimize SVG files
gulp.task("svg", function () {
  return gulp
    .src(paths.svg)
    .pipe(svgmin())
    .pipe(gulp.dest(paths.dist + "/svg"));
});

// Watch for changes
gulp.task("watch", function () {
  gulp.watch(paths.js, gulp.series("js"));
  gulp.watch(paths.css, gulp.series("css"));
  gulp.watch(paths.images, gulp.series("images"));
  gulp.watch(paths.svg, gulp.series("svg"));
});

// Default task
gulp.task("default", gulp.parallel("js", "css", "images", "svg", "watch"));
