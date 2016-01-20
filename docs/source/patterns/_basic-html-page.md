A basic starting point for an html page using Calcite Web might be something like this:

```html
<!doctype html>
<!--[if lt IE 9]>  <html class="ie lt-ie9 ie8"> <![endif]-->
<!--[if IE 9]>     <html class="ie ie9"> <![endif]-->
<!--[if !IE]><!--> <html> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <title>Calcite Web</title>
    <link rel="shortcut icon" href="/img/favicon.ico">
    <!-- get calcite-web css from the cdn (use latest version) -->
    <link rel="stylesheet" href="https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/{{data.pkg.version}}/css/calcite-web.min.css">
    <!--[if lt IE 9]>
      <script src="/assets/javascripts/libs/selectivizr.js"></script>
      <script src="/assets/javascripts/libs/html5shiv.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="wrapper">
      <!-- header -->
      <!-- content of page -->
    </div>
    <div class="footer" role="contentinfo">>
      <!-- content of footer -->
    </div>

    <!-- get calcite-web js from the cdn (use latest version) -->
    <script src="https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/{{data.pkg.version}}/js/calcite-web.min.js"></script>

    <!-- interactive patterns need to be initialized -->
    <script>
       calcite.init()
    </script>
  </body>
</html>
```
