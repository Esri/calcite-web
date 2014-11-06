require 'sass'

module Folder
  def listFiles(path)
    array = Array.new
    files = Dir.glob(path.value).select { |item| File.file?(item) }
    files.each do |item|
      array.push File.basename(item).split(".").first
    end
    Sass::Script::List.new(array.map{|s| Sass::Script::String.new(s)}, :space)
  end
end

module Sass::Script::Functions
  include Folder
end