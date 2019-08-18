'use strict'

import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';

const rootDir = `./public`
const path = {
    all: `${rootDir}/*`,
    html: `${rootDir}/**/*.html`,
    styles: {
        src: `${rootDir}/assets/scss/**/*.scss`,
        dest: `${rootDir}/assets/css`
    },
    javascripts: {
        src: `${rootDir}/assets/src/**/*.mjs`,
        dest: `${rootDir}/assets/js`,
    }
};

const style = () => {
    return gulp.src(path.styles.src)
        .pipe(sass({
            outputStyle: 'style compressed'
        }))
        .pipe(gulp.dest(path.styles.dest))
}
const javascript = () => {
    return gulp.src(path.javascripts.src)
        .pipe(babel())
        .pipe(gulp.dest(path.javascripts.dest))
}

const server = browserSync.create();
const reload = (done) => {
    server.reload();
    done();
};
const serve = (done) => {
    server.init({
        server: {
            baseDir: rootDir
        }
    });
    done();
};

const watch = () => {
    gulp.watch(path.styles.src, style)
    gulp.watch(path.javascripts.src, javascript)
    gulp.watch([
        path.html,
        path.styles.dest + '/*.css',
        path.javascripts.dest + '/*.js'
    ], reload)
};

export default gulp.series(serve, watch);