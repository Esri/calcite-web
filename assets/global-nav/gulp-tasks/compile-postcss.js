const gulp = require('gulp');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');
const ext = require('gulp-ext');

const pkg = require('../package.json');

function compilePostCss() {
	gulp.src(`${pkg.gulp_config.src_path}/esri-global-nav.pcss`)
		.pipe(sourcemaps.init())
		.pipe(postcss([
			require('postcss-partial-import')(),
			require('postcss-custom-properties')({
				warnings: false
			}),
			require('postcss-apply')(),
			require('postcss-image-set-polyfill')(),
			require('postcss-logical')(),
			require('postcss-nesting')(),
			require('postcss-media-fn')(),
			require('postcss-custom-media')(),
			require('postcss-media-minmax')(),
			require('postcss-custom-selectors')(),
			require('postcss-attribute-case-insensitive')(),
			require('postcss-color-rebeccapurple')(),
			require('postcss-color-hwb')(),
			require('postcss-color-hsl')(),
			require('postcss-color-rgb')(),
			require('postcss-color-gray')(),
			require('postcss-color-hex-alpha')(),
			require('postcss-color-function')(),
			require('postcss-font-family-system-ui')(),
			require('postcss-font-variant')(),
			require('postcss-initial')(),
			require('postcss-selector-matches')(),
			require('postcss-selector-not')(),
			require('postcss-pseudo-class-any-link')(),
			require('postcss-dir-pseudo-class')(),
			require('postcss-replace-overflow-wrap')(),
			require('postcss-easings')(),
			require('postcss-short')(),
			require('postcss-svg')(),
			require('autoprefixer')()
		]))
		.pipe(cssnano())
		.pipe(ext.replace('css','pcss'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(pkg.gulp_config.build_path))
}

gulp.task('compile-postcss', () => {
	compilePostCss();
});

gulp.task('watch-postcss', () => {
	console.log('watching postcss...');
	compilePostCss();
	const pcssGlob = `${pkg.gulp_config.src_path}/**/*.pcss`;
	watch(pcssGlob, () => {
		compilePostCss()
	});
});
