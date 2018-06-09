
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    pngquant = require('imagemin-pngquant'),
    browserSync = require('browser-sync'),
    stylelint = require("stylelint"),
    scssParser = require('postcss-scss'),
    cleanCSS = require('gulp-clean-css'),
    beeper = require('beeper'),
    color = require('ansi-colors'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    path = require('path');

var PATHS = {
    localhost: 'wp-skeleton.local/',
    images: {
        dest: 'images/',
        dir: 'src/images/'
    },
    sass: {
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
}

var onError = function (error) {
    beeper();
    console.log(color.red(error));
    this.emit('end');
};

gulp.task('default', ['sass', 'sasslint', 'browser-sync', 'minify-css'], function () {
    gulp.watch(PATHS.sass.src + '**/*.scss', ['sass', 'sasslint']);
    gulp.watch(PATHS.images.dir + '**/*', ['imagemin']);
    gulp.watch(PATHS.css.src + '*.css', ['minify-css']);
    gulp.watch(PATHS.localhost + '*.html').on('change', browserSync.reload);
    // gulp.watch(PATHS.js.src + '**/*', ['js']);
});

gulp.task('sasslint', function() {
    var processors = [
        stylelint({
        "rules": {
            "indentation": 4
        }})
    ];

    gulp.src([PATHS.sass.src + '**/*.scss'])
        .pipe(plugins.postcss(processors, {syntax: scssParser}));
});

gulp.task('sass', function () {
    return gulp.src(PATHS.sass.src + '**/*.scss')
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.changed('css'))
        .pipe(plugins.sass({
            outputStyle: 'expanded'
        }))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(PATHS.sass.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('imagemin', function () {
    return gulp.src(PATHS.images.dir + '**/*.{jpg,png}')
        .pipe(plugins.changed(PATHS.images.dest))
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(PATHS.images.dest))
});

// gulp.task('js', function () {
//     return gulp.src(PATHS.js.src + '**/*.js')
//         .pipe(plugins.sourcemaps.init())
//         .pipe(plugins.eslint({
//             configFile: '.eslintrc'
//         }))
//         .pipe(plugins.eslint.format())
//         .pipe(plugins.jscs())
//         .pipe(plugins.babel())
//         .pipe(plugins.sourcemaps.write('.'))
//         .pipe(gulp.dest(PATHS.js.dest));
// });

gulp.task('browser-sync', function() {
    browserSync({
        proxy: PATHS.localhost
    });
});

gulp.task('minify-css', () => {
    return gulp.src(PATHS.css.src + '*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(PATHS.css.dest));
});

gulp.task('svg-sprite', function() {
    return gulp.src(PATHS.svgSprite.src + '**/*.svg')
    .pipe(plugins.svgmin(function (file) {
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
    .pipe(plugins.svgstore())
    .pipe(gulp.dest(PATHS.svgSprite.dest))
});
