// ┌─────────────┐
// │ Gruntfile   │
// └─────────────┘
// Grunt wraps several tasks to ease development
// runs middleman, deploys the site, and tags new releases
var babel = require('rollup-plugin-babel');

// Javascript banner
var banner = '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '*  <%= pkg.homepage %>\n' +
                '*  Copyright (c) <%= grunt.template.today("yyyy") %> Environmental Systems Research Institute, Inc.\n' +
                '*  Apache 2.0 License */\n';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Running a development server
    'http-server': {
      'dev': {
        root: 'docs/build',
        port: 8888,
        host: '0.0.0.0',
        cache: 0,
        showDir : true,
        autoIndex: true,
        ext: 'html',
        runInBackground: true
      }
    },

    // Watch files
    'watch': {
      js: {
        files: ['lib/js/**/*.js', 'docs/source/assets/js/**/*'],
        tasks: [
          'rollup:doc',
          'copy:doc'
        ]
      },
      img: {
        files: ['lib/img/**/*'],
        tasks: [
          'newer:imagemin:doc',
          'copy:doc'
        ]
      },
      sass: {
        files: ['lib/sass/**/*', 'docs/source/assets/css/**/*'],
        tasks: [
          'sass:doc',
          'copy:doc'
        ]
      },
      html: {
        files: ['docs/source/**'],
        tasks: [
          'shell:acetate'
        ]
      }
    },

    'rollup': {
      options: {
        format: 'umd',
        moduleId: 'calcite-web',
        moduleName: 'calcite',
        banner: banner,
        sourceMap: true,
        sourceMapRelativePaths: true,
        plugins: [
          babel({
            "presets": ["es2015-rollup"],
            exclude: './node_modules/**'
          })
        ]
      },
      dist: {
        'dest':'dist/js/calcite-web.js',
        'src' : 'lib/js/calcite-web.js'
      },
      doc: {
        'dest':'docs/build/assets/js/libs/calcite-web.js',
        'src' : 'lib/js/calcite-web.js'
      },

    },

    // Build CSS files from SASS
    'sass': {

      options: {
        includePaths: ['lib/sass/']
      },

      expanded: {
        expand: true,
        cwd: 'lib/sass/',
        src: ['*.scss'],
        dest: 'dist/css/',
        ext: '.css'
      },

      doc: {
        expand: true,
        cwd: 'docs/source/assets/css',
        src: ['**/*.scss'],
        dest: 'docs/build/assets/css',
        ext: '.css'
      },

      homepage: {
        files: {
          'docs/build/assets/css/homepage.css': 'docs/source/assets/css/homepage.scss'
        }
      }
    },

    // Create a webfont full of icons from a folder of svgs
    'webfont': {
      icons: {
        src: 'lib/img/icons/ui/*.svg',
        dest: 'lib/fonts',
        destCss: 'lib/sass/calcite-web/icons',
        options: {
          font: 'calcite-ui',
          template: 'bin/webfont-template.scss',
          relativeFontPath: '#{$font-path}',
          stylesheet: 'scss',
          htmlDemo: false,
          engine: 'fontforge'
        }
      }
    },

    // Create minified version of build css
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    // Build minified Javascript file to dist
    'uglify': {
      options: {
        mangle: false,
        banner: banner
      },
      dist: {
        files: {
          'dist/js/calcite-web.min.js': ['dist/js/calcite-web.js']
        }
      }
    },

    // Copy libsass files to dist, doc assets to build
    'copy': {
      libsass: {
        expand: true,
        cwd: 'lib/',
        src: ['sass/**/*'],
        dest: 'dist/'
      },
      doc: {
        expand: true,
        cwd: 'docs/source/',
        src: ['assets/img/**/*', 'assets/js/**/*'],
        dest: 'docs/build/'
      },
      fonts: {
        expand: true,
        cwd: 'lib/',
        src: ['fonts/**/*'],
        dest: 'docs/build/assets/'
      },
      fontsDist: {
        expand: true,
        cwd: 'lib/',
        src: ['fonts/**/*'],
        dest: 'dist/'
      },
      changelog: {
        src: ['CHANGELOG.md'],
        dest: 'dist/'
      }
    },

    // Optimize images and icons for dist and doc
    'imagemin': {
      dist: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['img/**/*.{png,jpg,svg,ico,gif}'],
          dest: 'dist/'
        }]
      },
      doc: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['img/**/*.{png,jpg,svg,ico,gif}'],
          dest: 'docs/source/assets/'
        }]
      }
    },

    // Make a zip file of the dist folder
    'compress': {
      main: {
        options: {
          archive: 'calcite-web.zip'
        },
        files: [
          {
            src: ['dist/**', '!dist/__MACOSX'],
            dest: './'
          },
        ]
      }
    },

    // Upload dist folder to s3
    'aws_s3': {
      options: {
        region: 'us-west-1',
        bucket: 'patterns.esri.com',
        endpoint: 'https://s3-us-west-1.amazonaws.com',
        access: 'public-read',
        gzip: true
      },
      production: {
        files: [
          // Manually set content type (plugin was setting incorrectly).
          {expand: true, cwd: 'dist/', src: ['**/*.js'],   dest: 'files/calcite-web/<%= pkg.version %>/', params: {ContentType: 'application/javascript'}},
          {expand: true, cwd: 'dist/', src: ['**/*.css'],  dest: 'files/calcite-web/<%= pkg.version %>/', params: {ContentType: 'text/css'}},
          {expand: true, cwd: 'dist/', src: ['**/*.svg'],  dest: 'files/calcite-web/<%= pkg.version %>/', params: {ContentType: 'image/svg+xml'}},
          {expand: true, cwd: 'dist/', src: ['**/*.ico'],  dest: 'files/calcite-web/<%= pkg.version %>/', params: {ContentType: 'image/x-icon'}},
          {expand: true, cwd: 'dist/', src: ['**/*.jpg'],  dest: 'files/calcite-web/<%= pkg.version %>/', params: {ContentType: 'image/jpg'}},
          {expand: true, cwd: 'dist/', src: ['**/*.map'],  dest: 'files/calcite-web/<%= pkg.version %>/', params: {ContentType: 'application/javascript'}},
          {expand: true, cwd: 'dist/', src: ['**/*.eot'],  dest: 'files/calcite-web/<%= pkg.version %>/', params: {ContentType: 'application/vnd.ms-fontobject'}},
          {expand: true, cwd: 'dist/', src: ['**/*.woff'], dest: 'files/calcite-web/<%= pkg.version %>/', params: {ContentType: 'application/font-woff'}},
          {expand: true, cwd: 'dist/', src: ['**/*.otf'],  dest: 'files/calcite-web/<%= pkg.version %>/', params: {ContentType: 'application/font-sfnt'}},
          {expand: true, cwd: 'dist/', src: ['**/*.ttf'],  dest: 'files/calcite-web/<%= pkg.version %>/', params: {ContentType: 'application/font-sfnt'}},
          // Also upload to the 'latest' directory
          {expand: true, cwd: 'dist/', src: ['**/*.js'],   dest: 'files/calcite-web/latest/', params: {ContentType: 'application/javascript'}},
          {expand: true, cwd: 'dist/', src: ['**/*.css'],  dest: 'files/calcite-web/latest/', params: {ContentType: 'text/css'}},
          {expand: true, cwd: 'dist/', src: ['**/*.svg'],  dest: 'files/calcite-web/latest/', params: {ContentType: 'image/svg+xml'}},
          {expand: true, cwd: 'dist/', src: ['**/*.ico'],  dest: 'files/calcite-web/latest/', params: {ContentType: 'image/x-icon'}},
          {expand: true, cwd: 'dist/', src: ['**/*.jpg'],  dest: 'files/calcite-web/latest/', params: {ContentType: 'image/jpg'}},
          {expand: true, cwd: 'dist/', src: ['**/*.map'],  dest: 'files/calcite-web/latest/', params: {ContentType: 'application/javascript'}},
          {expand: true, cwd: 'dist/', src: ['**/*.eot'],  dest: 'files/calcite-web/latest/', params: {ContentType: 'application/vnd.ms-fontobject'}},
          {expand: true, cwd: 'dist/', src: ['**/*.woff'], dest: 'files/calcite-web/latest/', params: {ContentType: 'application/font-woff'}},
          {expand: true, cwd: 'dist/', src: ['**/*.otf'],  dest: 'files/calcite-web/latest/', params: {ContentType: 'application/font-sfnt'}},
          {expand: true, cwd: 'dist/', src: ['**/*.ttf'],  dest: 'files/calcite-web/latest/', params: {ContentType: 'application/font-sfnt'}},
          {expand: true, cwd: 'dist/', src: ['CHANGELOG.md'], dest: 'files/calcite-web/latest/', params: {ContentType: 'text/x-markdown'}}
        ]
      }
    },

    // Ask for AWS ID and Key
    'prompt': {
      aws: {
        options: {
          questions: [
            {
              config: 'aws_s3.options.accessKeyId',
              type: 'input',
              message: 'AWS Access ID:'
            },
            {
              config: 'aws_s3.options.secretAccessKey',
              type: 'input',
              message: 'AWS Secret Access Key:'
            }
          ]
        }
      }
    },

    // bin scripts
    'shell': {
      release: {
        command: 'bin/release.sh'
      },
      acetate: {
        command: 'npm run acetate'
      },
      a11y: {
        command: 'npm run a11y'
      }
    },

    // Deploy doc site to gh-pages
    'gh-pages': {
      options: {
        base: 'docs/build',
        repo: 'https://github.com/Esri/calcite-web.git'
      },
      src: ['**']
    }

  });

  // load all grunt modules
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // ┌─────────────┐
  // │ Grunt tasks │
  // └─────────────┘
  grunt.registerTask('buildFont', ['webfont', 'copy:fonts', 'copy:fontsDist']);
  grunt.registerTask('doc', ['shell:acetate', 'newer:imagemin:doc', 'sass:doc', 'copy:doc', 'copy:fonts', 'rollup:doc']);
  grunt.registerTask('deploy', ['doc', 'gh-pages']);
  grunt.registerTask('release', ['sass', 'cssmin', 'rollup:dist', 'uglify', 'copy', 'newer:imagemin:dist', 'compress', 'shell:release', 'prompt:aws', 'aws_s3']);
  grunt.registerTask('default', ['doc', 'http-server', 'watch']);
};
