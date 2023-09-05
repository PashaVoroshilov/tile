const gulp = require('gulp')

//for styles
const sass = require('gulp-sass')(require('sass'))
const groupMediaQuaeries = require('gulp-group-css-media-queries')
const cleanCSS = require('gulp-cleancss')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const svgStore = require('gulp-svgstore')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')

//for scripts
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')

const rename = require('gulp-rename')
const del = require('del')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync').create()
// const gulpIf = require('gulp-if')

// const isDevelopment = false

const paths = {
	src: './src/',
	build: './build/',
}

function html() {
	return gulp
		.src(paths.src + '*.html')
		.pipe(plumber())
		.pipe(gulp.dest(paths.build))
}

function fonts() {
	return gulp
		.src(paths.src + 'fonts/**/*.{woff,woff2,eot,ttf,svg,otf}')
		.pipe(gulp.dest(paths.build + 'fonts/'))
}

function fontsFormat() {
	gulp
		.src(paths.src + 'fonts/*.ttf')
		.pipe(ttf2woff())
		.pipe(gulp.dest(paths.src + 'fonts/'))
	return gulp
		.src(paths.src + 'fonts/*.ttf')
		.pipe(ttf2woff2())
		.pipe(gulp.dest(paths.src + 'fonts/'))
}

function images() {
	return gulp
		.src(paths.src + 'img/**/*.{jpg,jpeg,png,gif,svg}')
		.pipe(gulp.dest(paths.build + 'img/'))
}

function styles() {
	return (
		gulp
			.src(paths.src + 'scss/main.scss')
			.pipe(plumber())
			// .pipe(gulpIf(isDevelopment, sourcemaps.init()))
			.pipe(sass())
			.pipe(groupMediaQuaeries())
			.pipe(
				postcss([autoprefixer({ overrideBrowserslist: ['last 2 version'] })])
			)
			// .pipe(gulpIf(!isDevelopment, cleanCSS()))
			// .pipe(cleanCSS())
			// .pipe(rename({ suffix: ".min" }))
			// .pipe(gulpIf(isDevelopment, sourcemaps.write('maps')))
			.pipe(gulp.dest(paths.build + 'css/'))
	)
}

function stylesLibs() {
	return gulp
		.src(paths.src + 'scss/layout/libs/*.css')
		.pipe(concat('vendor.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.build + 'css/libs'))
}

function scripts() {
	return (
		gulp
			.src(paths.src + 'js/*.js')
			.pipe(plumber())
			.pipe(
				babel({
					presets: ['@babel/env'],
				})
			)
			.pipe(uglify())
			// .pipe(concat('script.min.js'))
			.pipe(gulp.dest(paths.build + 'js/'))
	)
}

function scriptsLibs() {
	return gulp
		.src(paths.src + 'js/libs/*.js')
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(paths.build + 'js/libs/'))
}

function spriteSvg() {
	return gulp
		.src(paths.src + './img/icons/sprite/*.svg')
		.pipe(svgStore())
		.pipe(rename({ basename: 'sprite' }))
		.pipe(gulp.dest(paths.src + './img/icons/'))
}

function clean() {
	return del('build/')
}

function watcher() {
	gulp.watch(paths.src + '*.html', html)
	gulp.watch(paths.src + 'scss/**/*.scss', styles)
	gulp.watch(paths.src + 'img/**/*.{jpg,jpeg,png,svg}', images)
	gulp.watch(paths.src + 'js/*.js', scripts)
}

function serve() {
	browserSync.init({
		server: {
			baseDir: paths.build,
		},
	})
	browserSync.watch(paths.build + '**/*.*', browserSync.reload)
}

exports.html = html
exports.fonts = fonts
exports.images = images
exports.styles = styles
exports.stylesLibs = stylesLibs
exports.scripts = scripts
exports.scriptsLibs = scriptsLibs
exports.watcher = watcher
exports.clean = clean
exports.serve = serve
exports.spriteSvg = spriteSvg
exports.fontsFormat = fontsFormat

exports.build = gulp.series(
	clean,
	gulp.parallel(html, fonts, images, styles, stylesLibs, scripts, scriptsLibs)
)

exports.default = gulp.series(
	clean,
	gulp.parallel(html, fonts, images, styles, stylesLibs, scripts, scriptsLibs),
	gulp.parallel(watcher, serve)
)
