'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssSimplevars = require('postcss-simple-vars');
const cssnano = require('cssnano');
const cssnext = require('postcss-cssnext');
const mixins = require('postcss-mixins');
const partialImport = require('postcss-partial-import');
const comments = require('postcss-discard-comments');
const nested = require('postcss-nested');
const { globSync } = require('glob');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const typescript = require('gulp-typescript');

gulp.task('css', () => {
    return gulp.src(['*.css'], { cwd: 'src/css' })
        .pipe(postcss([
            partialImport(),
            mixins(),
            nested(),
            postcssSimplevars(),
            comments(),
            cssnext({ autoprefixer: { browsers: ['IE >= 10'] } }),
            cssnano({
                autoprefixer: false,
                zindex: false
            }),
        ]))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('svg', () => {
    return gulp.src('src/svg/*.svg')
        .pipe(svgmin({
            multipass: true,
            full: true,
            plugins: [
                'removeDoctype',
                'removeComments',
                'removeXMLProcInst',
                'removeEditorsNSData',
                'cleanupEnableBackground',
                'convertStyleToAttrs',
                'removeUnusedNS',
                'cleanupIDs',
                'sortAttrs',
                'moveGroupAttrsToElems',
                'removeXMLNS',
                'removeDimensions',
                'convertTransform',
                'cleanupNumericValues',
                'inlineStyles',
                'collapseGroups',
                {
                    name: 'removeAttributesBySelector',
                    params: {
                        selector: 'svg',
                        attributes: ['x', 'y', 'xml:space']
                    }
                },
                {
                    name: 'addAttributesToSVGElement',
                    params: {
                        attributes: [
                            { focusable: 'false' },
                            { 'aria-hidden': 'true' },
                        ]
                    }
                }
            ]
        }))
        .pipe(gulp.dest('public/svg'));
});

/**
 * Compile JavaScript
 *
 * @param {Function} cb Callback
 */
gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(typescript({
            target: 'ES5',
            allowJs: true
        }))
        .pipe(concat('bono23.js'))
        .pipe(uglify())
        .pipe(rename(path => path.basename += '.min'))
        .pipe(gulp.dest('public/assets/js'));
});

if (process.env.NODE_ENV !== 'production') {
    const imageminPromise = import('gulp-imagemin');
    (async () => {
        const imageminModule = await imageminPromise;
        const imagemin = imageminModule.default;
        gulp.task('images', () => {
            return gulp.src('src/img/*')
                .pipe(imagemin([imagemin.mozjpeg(), imagemin.svgo()]))
                .pipe(gulp.dest('public/img'));
        });
    })()
}

/**
 * Create WebP versions
 */
function imagesWebp() {
    return src('src/img/**/*.jpg')
        .pipe(webp())
        .pipe(dest('public/img'));
}

// Register Gulp watch task
gulp.task('watch', function () {
    gulp.watch('src/css/**/*.css', gulp.series(['css']));
    gulp.watch('src/js/**/*.js', gulp.series(['js']));
    gulp.watch('src/svg/**/*.svg', gulp.series(['svg']));
    if (process.env.NODE_ENV !== 'production') {
        gulp.watch('src/img/*', gulp.series(['images']));
    }
});

// Register Gulp default task
gulp.task('default', gulp.series(['svg', 'css', 'js']));
