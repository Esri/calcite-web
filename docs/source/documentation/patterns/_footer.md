Standard footer for ArcGIS and Esri properties. The footer in Calcite Web is 'sticky' by default. This means that if the page doesn't have sufficient height, the footer will still hug the bottom of the screen. For this to work properly, you must use a `div` with a class of `wrapper`. See the [basic HTML page](#basic-html-page) for an example.

```
<footer class="footer avenir-regular leader-3">
  <div class="container">
    <nav class="column-6">
      <h6>Arc<span>GIS</span></h6>
      <ul class="list-plain">
        <li><a href="http://www.arcgis.com/about/">Home</a></li>
        <li><a href="http://www.arcgis.com/about/features.html">Features</a></li>
        <li><a href="http://www.arcgis.com/about/pricing.html">Pricing</a></li>
      </ul>
    </nav>

    <nav class="column-6">
      <h6>Arc<span>GIS</span> for Developers</h6>
      <ul class="list-plain">
        <li><a href="/en/">Home</a></li>
        <li><a href="/en/features/">Features</a></li>
        <li><a href="http://blogs.esri.com/esri/arcgis/category/developer/">Blog</a></li>
      </ul>
    </nav>

    <nav class="column-6">
      <h6>About Esri</h6>
      <ul class="list-plain">
        <li><a href="http://www.esri.com/about-esri/">About Us</a></li>
        <li><a href="http://www.esri.com/careers/">Careers</a></li>
        <li><a href="http://blogs.esri.com/esri/esri-insider/">Insiders Blog</a></li>
        <li><a href="http://www.esri.com/events/user-conference/index.html">User Conference</a></li>
        <li><a href="http://www.esri.com/events/devsummit/index.html">Developer Summit</a></li>
      </ul>
    </nav>

    <nav class="column-6 padding-leader-half">
      <a class="esri-logo" href="http://esri.com"></a>
      <section class="footer-social-nav">
        <a class="icon-twitter" href="https://twitter.com/Esri/"></a>
        <a class="icon-facebook" href="https://www.facebook.com/esrigis/"></a>
        <a class="icon-github" href="http://esri.github.com/"></a>
        <a class="icon-email" href="http://www.esri.com/about-esri/contact/"></a>
      </section>
    </nav>
    <div class="column-24">
       <p><small>Copyright © 2015 Esri. All rights reserved. | <a href="http://www.esri.com/legal/privacy">Privacy</a> | <a href="http://www.esri.com/legal">Legal</a></small></p>
    </div>
  </div>
</footer>
```
