const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const changed = require('gulp-changed');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const browserSync = require('browser-sync').create();
const stylelint = require("stylelint");
const scssParser = require('postcss-scss');
const cleanCSS = require('gulp-clean-css');
const beeper = require('beeper');
const color = require('ansi-colors');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');
const plumber = require('gulp-plumber');
	
var paths = {
    localhost: 'wpskeleton.test',
    images: {
        src: 'src/images/',
        dest: 'images/'
    },
    scss: {
        src: 'src/scss/',
        dest: 'css/'
    },
    js: {
        src: 'src/js/',
        dest: 'js/'
    },
    css: {
        src: 'css/',
        dest: '.'
    },
    svgSprite: {
        src: 'src/images/icons/svgsprite/',
        dest: 'images/icons/'
    }
};

const onError = function (error) {
    beeper();
    console.log(color.red(error));
    this.emit('end');
};

function scss() {
    return src(paths.scss.src + '**/*.scss')
        .pipe(plumber({
            errorHandler: onError
        }))

        .pipe(changed('css'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest(paths.scss.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
}

function sasslint() {
    var processors = [
        stylelint({
        "rules": {
            "indentation": 4
        }})
    ];

    return src([paths.scss.src + '**/*.scss'])
    .pipe(postcss(processors, {syntax: scssParser}));
}

function minifyimg() {
    src(paths.images.src + '**/*.{jpg,png}')
    .pipe(changed(paths.images.dest))
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(dest(paths.images.dest));
}

function minifycss() {
    return src(paths.css.src + '*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest(paths.css.dest));
}

function svgsprite() {
    return src(paths.svgSprite.src + '**/*.svg')
    .pipe(svgmin(function (file) {
        var prefix = path.basename(file.relative, path.extname(file.relative));
        return {
            plugins: [{
                cleanupIDs: {
                    prefix: prefix + '-',
                    minify: true
                }
            }]
        }
    }))
    .pipe(svgstore())
    .pipe(dest(paths.svgSprite.dest))
}

exports.svgsprite = svgsprite;

exports.default = function() {
    browserSync.init({
        open: false,
        proxy: paths.localhost,
        host: paths.localhost
    });
    watch(paths.scss.src + '**/*.scss', series(scss, sasslint));
    watch(paths.images.src + '**/*', minifyimg);
    watch(paths.css.src + '*.css', minifycss);
    watch(paths.localhost + '*.scss').on('change', browserSync.reload);
};
