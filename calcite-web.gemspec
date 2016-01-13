#encoding: utf-8

require "json"
package = JSON.parse(File.read("package.json"))

Gem::Specification.new do |s|
  s.name        = package["name"]
  s.version     = package["version"].gsub('-', '.')
  s.summary     = package["description"]
  s.authors     = ["Paul C. Pederson", "Nikolas Wise"]
  s.email       = package["author"]["email"]
  s.files       = ["lib/calcite-web.rb"]
  s.homepage    = package["homepage"]

  s.add_dependency "compass", "~> 1.0.3"
end
