require 'compass'
dir  = File.join(File.dirname(__FILE__), '..', 'lib', 'sass')
Compass::Frameworks.register('calcite-web', :stylesheets_directory => dir)
