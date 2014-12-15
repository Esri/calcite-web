## Drawers
The off-canvas "drawer" pattern is used primarily for top-level mobile navigation.

```
 <body>
  <!-- Mobile Nav Drawer -->
    <div class="drawer drawer-left js-drawer-toggle" data-drawer="top-nav">
      <nav class="drawer-nav">
        <aside class="side-nav">
          <h2 class="side-nav-title padding-leader-half padding-trailer-half text-large">Esri Patterns</h2>
          <div class="panel padding-trailer-half padding-leader-half">
            <label class="trailer-0">
              <input type='search' placeholder='Search'>
            </label>
          </div>
          <a href="#" class="side-nav-link padding-trailer-half padding-leader-half">Branding</a>
          <a href="{{relativePath}}" class="side-nav-link padding-trailer-half padding-leader-half">Web</a></a>
          <a href="#" class="side-nav-link padding-trailer-half padding-leader-half">Mobile</a>
          <a href="#" class="side-nav-link padding-trailer-half padding-leader-half">Presentations</a>
        </aside>
      </nav>
    </div>

  <!-- Main Content Wrapper -->
  <div class="wrapper">
    <!-- ...all site content goes here... -->
  </div>
 </body>
```