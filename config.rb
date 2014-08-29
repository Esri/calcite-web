# Documentation Site Config

# required gems from Gemfile
require "rubygems"
require "kss"
require "redcarpet"
require "calcite-web"

# markdown configuration
set :markdown_engine, :redcarpet
set :markdown,
    :autolink => true,
    :fenced_code_blocks => true,
    :tables => true,
    :with_toc_data => true

# redcarpet-specific configuration
Markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, {
  :fenced_code_blocks => true,
  :tables => true,
  autolink: true,
  with_toc_data: true
})

# initialize kss to parse doc
before do
  Styleguide ||= Kss::Parser.new("lib/sass/calcite-web/")
end



# helpers
helpers do

  # turn markdown into html
  def render_markdown(md)
    force_encode Markdown.render(md)
  end

  # link to specific section of doc
  def section_link(section)
    title = Styleguide.section(section).comment_sections.first.gsub("#", "").strip
    "<li><a href='#section-#{section}'>#{title}</a></li>"
  end

  # create an li with class of current if on that page
  # <%= menu_item "Page", "/page", "page.html" %>
  def menu_item(title, path, test=nil, options={})

    is_current_page = false
    full_path = "/" + current_page.path

    if test
      is_current_page = full_path.match(test)
    else
      is_current_page = current_page.url.match(path[1..-1])
    end

    classes = is_current_page ? "class='current'" : ""

    "<li #{classes}>#{link_to title, path, options}</li>"
  end

  # render the content of a section with 'styleguide_block' partial
  def styleguide(section, &block)
    @section = Styleguide.section(section)
    @description = Markdown.render(@section.description)
    @example_html = nil
    @escaped_html = nil
    unless block.nil?
      @example_html = kss_capture{ block.call }
      @escaped_html = ERB::Util.html_escape(@example_html.sub(" class=\"$modifier_class\"", ""))
    end
    @_out_buf << partial('styleguide_block')
  end

  # captures the result of a kss block within an erb template
  def kss_capture(&block)
    out, @_out_buf = @_out_buf, ""
    yield
    @_out_buf
  ensure
    @_out_buf = out
  end

  # strip whitespace from in front of a code block
  def strip_whitespace_for_pre string
    # gets an array of the leading whitespace values for each line
    ws = string.lines.collect { |l|
      l[/\A */].size
    }
    # if indented
    if ws.length > 1
      ws.delete(0) # remove zero whitespace lines
      ws.delete_at(-1) # remove the last line since its going to be <% end %> which we dont want
    end
    # get the section of each line starting at the lowest whitespace to the end of the line
    lines = string.lines.collect { |l|
      l[ws.min, l.size]
    }.join()
    # return unindented html
    ERB::Util.html_escape lines.strip
  end

  # change base url on build for gh-pages
  def base_url
    if environment === :build
      return "/calcite-web/"
    else
      return "/"
    end
  end

  # shortcut for latest version
  def latest_version
    spec = Gem::Specification::load("calcite-web.gemspec")
    spec.version
  end
end

# middleman settings
activate :directory_indexes
set :source, "docs/source"
set :build_dir, "docs/build"
set :partials_dir, "partials"
set :css_dir, "assets/css"
set :images_dir, "assets/img"
set :fonts_dir, "assets/fonts"
set :js_dir, "assets/js"

# build settings for middleman
configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :relative_assets
end
