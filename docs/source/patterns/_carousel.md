## Carousel

Calcite Web comes with a very lightweight carousel (or slider). We urge you to use carousels very sparingly as [several](http://erikrunyon.com/2013/07/carousel-interaction-stats/) [reports](http://www.nngroup.com/articles/auto-forwarding/) [show](http://www.widerfunnel.com/conversion-rate-optimization/rotating-offers-the-scourge-of-home-page-design) that carousels can be detrimental to user experience.

If you decide a carousel *is* the best experience for your use case, the Calcite Web carousel is very straightforward. Simply create a div with the class of `carousel` with any number of elements that have a class of `carousel-slide`. The carousel uses [calcite-web.js](../javascript) for the interactive elements. For this reason you'll also need to add a class of `js-carousel` and a `data-carousel` attribute with the name you wish your carousel to have.

Navigation for the carousel can be any link on the page. Simply add a `js-carousel-link` class and a `data-carousel` attribute with the name of the carousel the link should target, along with a `js-carousel-slide` element with a number representing the slide number the link should navigate to.