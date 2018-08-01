const gulp = require('gulp');
const watch = require('gulp-watch');
const svgmin = require('gulp-svgmin');

const pkg = require('../package.json');

const svgs = `${pkg.gulp_config.src_path}/img/**/*.svg`;

function optimizeImages() {
	gulp.src(svgs)
		.pipe(svgmin())
		.pipe(gulp.dest(`${pkg.gulp_config.build_path}/img`));
}

gulp.task('optimize-images', () => {
	console.log('optimizing images...');
	optimizeImages();
});

gulp.task('watch-optimize-images', () => {
	console.log('watching optimize images...');
	optimizeImages();
	watch(svgs, (modFile) => {
		optimizeImages();
	});
});
