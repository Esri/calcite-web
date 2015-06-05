A basic starting point for an html page using Calcite Web might be something like this:

```html
<!doctype html>
<!--[if lt IE 9]>  <html class="ie lt-ie9 ie8"> <![endif]-->
<!--[if IE 9]>     <html class="ie ie9"> <![endif]-->
<!--[if !IE]><!--> <html> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <title>Calcite Web</title>
    <link rel="shortcut icon" href="/img/favicon.ico">
    <link type="text/css" rel="stylesheet" href="/assets/stylesheets/calcite.css">
    <!--[if lt IE 9]>
      <script src="/assets/javascripts/libs/selectivizr.js" type="text/javascript"></script>
      <script src="/assets/javascripts/libs/html5shiv.js" type="text/javascript"></script>
    <![endif]-->
  </head>
  <body>
    <div class="wrapper">
        <!-- header -->
        <!-- content of page -->
    </div>
    <div class="footer">
      <!-- content of footer -->
    </div>
    <script src="/assets/javascripts/calcite-web.js"></script>
  </body>
</html>
```
