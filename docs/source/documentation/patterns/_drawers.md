The off-canvas "drawer" pattern is used primarily for top-level mobile navigation.

<button class="btn js-drawer-toggle" data-drawer="top-nav">Open Left Drawer</button>

<button class="btn js-drawer-toggle" data-drawer="right">Open Right Drawer</button>

```
 <body>
  <!-- Drawer -->
  <div class="drawer drawer-left js-drawer is-active" data-drawer="top-nav" tabindex="0">
    <nav class="drawer-nav" role="navigation">
      <aside class="side-nav">
        <h2 class="side-nav-title">Calcite Web</h2>
        <a href="/" class="side-nav-link">Get Started</a>
        <a href="/" class="side-nav-link">Type</a>
        <a href="/" class="side-nav-link">Grid</a>
        <a href="/" class="side-nav-link">Icons</a>
        <a href="/" class="side-nav-link">Color</a>
        <a href="/" class="side-nav-link">Components</a>
        <a href="/" class="side-nav-link">Patterns</a>
        <a href="/" class="side-nav-link">Sass</a>
        <a href="/" class="side-nav-link">JavaScript</a>
        <a href="/" class="side-nav-link">Layouts</a>
      </aside>
    </nav>
  </div>

  <!-- Main Content Wrapper -->
  <div class="wrapper">
    <!-- ...all site content goes here... -->
  </div>
 </body>
```
