The search pattern is a a UI for site-wide searches. The most regular use of the pattern is in the Top Navigation pattern.

<button class="icon-ui-search search-top-nav link-dark-gray js-search-toggle" href="#" aria-label="Search">Search</button>

```
<div class="js-search search-overlay">
  <div class="search-content column-24" role="dialog" aria-labelledby="search" role="dialog">
    <form method="GET" action="{{relativePath}}/search/">
      <label>
        <span class="font-size-1">Search ArcGIS for Developers</span>
        <input class="search-input js-search-input" type='search' placeholder='Search' name="q">
      </label>
      <label class="inline-block margin-right-2">
        Language
        <select name="language">
          <option value="">All Languages</option>
          <option value="">Android</option>
          <option value="">iOS (Swift)</option>
          <option value="">iOS (Objective C)</option>
          <option value="">Java</option>
          <option value="">JavaScript</option>
          <option value="">Mac OS X (Swift)</option>
          <option value="">Mac OS X (Objective C)</option>
          <option value="">Qt (QML)</option>
          <option value="">Qt (C++)</option>
          <option value="">REST APIs</option>
          <option value="">Web AppBuilder</option>
          <option value="">.Net (Desktop)</option>
          <option value="">.Net (Store)</option>
          <option value="">.Net (Phone)</option>
          <option value="">.Net (WPF)</option>
          <option value="">.Net (UWP)</option>
        </select>
      </label>
      <label class="inline-block margin-right-2">
        Version
        <select name="version">
          <option value="">All Versions</option>
          <option value="1.0.0">10.3</option>
          <option value="2.0.0">10.4</option>
          <option value="3.0.0">Quartz</option>
        </select>
      </label>
        <button type="submit" class="btn btn-large right leader-1">Search</button>
      </div>
    </form>
  </div>
</div>

<button class="icon-ui-search search-top-nav link-dark-gray js-search-toggle" href="#" aria-label="Search">Search</button>
```