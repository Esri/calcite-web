require 'compass'
dir  = File.join(File.dirname(__FILE__), '..', 'dist', 'sass')
Compass::Frameworks.register('calcite-web', :stylesheets_directory => dir)
