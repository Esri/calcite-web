const gulp = require("gulp");
const fs = require('fs-extra');

const pkg = require('../package.json');

gulp.task('clean-dist', ()=>{
    console.log('cleaning dist folder.');
    fs.removeSync(pkg.gulp_config.build_path);
    console.log('dist folder has been cleaned.')
});
