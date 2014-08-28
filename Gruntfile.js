// ┌─────────────┐
// │ Gruntfile   │
// └─────────────┘
// Grunt wraps several tasks to ease development
// runs middleman, deploys the site, and builds new versions of the framework

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Middleman configuration so grunt can run middleman
    'middleman': {
      options: {
        useBundle: true
      },
      server: {
        options: {
          command: 'server'
        }
      },
      build: {
        options: {
          command: 'build',
          clean: true
        }
      }
    },

    // Deploy doc site to gh-pages
    'gh-pages': {
      options: {
        base: 'docs/build',
        repo: 'https://github.com/ArcGIS/calcite-web.git'
      },
      src: ['**']
    },

    // Watch files
    'watch': {
      scripts: {
        files: ['lib/**/*.js'],
        tasks: [
          'copy:docs-js',
          'copy:docs-images',
          'copy:docs-fonts'
        ]
      }
    }
  });

  // load all grunt modules
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // ┌─────────────┐
  // │ Grunt tasks │
  // └─────────────┘

  // Run a development environment
  grunt.registerTask('dev', [
    'middleman:server',
    'watch'
  ]);

  // Build the doc site and generate dist folder
  grunt.registerTask('build', [

  ]);

  // Deploy doc site to github pages
  grunt.registerTask('deploy', 'Deploy documentation to github pages', function(n) {
    if (grunt.option('message')) {
      grunt.config.set('gh-pages.options.message', grunt.option('message'));
    }
    grunt.task.run(['gh-pages']);
  });

  // Default task starts up a dev environment
  grunt.registerTask('default', ['dev']);

};
