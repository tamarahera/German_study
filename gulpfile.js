"use strict";
const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default; //rename
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const htmlmin = require('gulp-htmlmin');
const webpack = require("webpack-stream");

function images() {
    return src(['src/images/*.*', '!src/images/*.svg', '!src/images/meta.*'])
        .pipe(newer('dist/images'))
        .pipe(avif({ quality : 30}))

        .pipe(newer('dist/images'))
        .pipe(src(['src/images/*.*', '!src/images/meta.*']))
        .pipe(webp())

        .pipe(newer('dist/images'))
        .pipe(src(['src/images/*.*', '!src/images/meta.*']))
        .pipe(imagemin())

        .pipe(src('src/images/meta.*'))
        .pipe(imagemin())

        .pipe(dest('dist/images'))
}

function icons() {
    return src('src/icons/**/*')
        .pipe(dest('dist/icons'))
};

function html() {
    return src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'))
        .pipe(browserSync.stream())
};

function styles() {
    return src('src/scss/*.scss')
        .pipe(autoprefixer())
        .pipe(concat('style.min.scss'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['src/scss/**/*.+(scss|sass)'], styles)
    watch(['src/images/*.*'], images)
    watch(['src/*.html']).on('change', html)
    watch(["./src/js/**/*.js"], buildJs);
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function building() {
    return src([
        'src/*.html'
    ], { base: 'src' })
        .pipe(dest('dist'))
}

function buildJs() {
    return src("./src/js/main.js")
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'script.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(dest('dist/js'))
        .on("end", browserSync.reload);
};

function php() {
    return src('src/*.php')
    .pipe(dest('dist/'))
    .pipe(browserSync.stream())
}


exports.styles = styles;
exports.images = images;
exports.watching = watching;
exports.icons = icons;

exports.build = series(cleanDist, html, php, styles, buildJs, images, icons, building);

exports.default = parallel(html, php, styles, buildJs, browsersync, watching);