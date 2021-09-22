const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require('gulp-imagemin');
const del = require('del');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/",
        },
    });
}

function images() {
    return src(["app/images/**/*"])
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ])
        )
        .pipe(dest("build/images"));
}

function scripts() {
    return src(["app/libs/**/*.js", "app/js/main.js"])
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(dest("app/js"))
        .pipe(browserSync.stream());
}

function styles() {
    return src(["app/libs/**/*.css", "app/scss/style.scss"])
        .pipe(scss({ outputStyle: "compressed" }))
        .pipe(concat("style.min.css"))
        .pipe(
            autoprefixer({
                overrideBrowserlist: ["last 10 version"],
                grid: true,
            })
        )
        .pipe(dest("app/css"))
        .pipe(browserSync.stream());
}

function cleanBuild() {
    return del("build");
}

function build() {
    return src(["app/css/style.min.css", "app/fonts/**/*", "app/js/main.min.js", "app/*.html"], {
        base: "app",
    }).pipe(dest("build"));
}

function watching() {
    watch(["app/scss/**/*.scss"], styles);
    watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
    watch(["app/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.watch = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanBuild = cleanBuild;

exports.prebuild = series(styles, scripts);
exports.build = series(cleanBuild, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);