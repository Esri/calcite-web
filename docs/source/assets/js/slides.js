(function () {
  var slides = document.querySelectorAll('.js-slide')
  var totalSlides = slides.length

  for (var i = 0; i < slides.length; i++) {
    slides[i].setAttribute('id', i + 1)
  }

  function getSlide () {
    var locationHash = location.hash || "#1";
    return parseInt(locationHash.substring(1))
  }

  function prev () {
    var prevSlide = getSlide() - 1
    if (prevSlide < 1) {
      prevSlide = totalSlides
    }
    location.hash = '#' + prevSlide
  }

  function next () {
    var nextSlide = getSlide() + 1
    if (nextSlide > totalSlides) {
      nextSlide = 1
    }
    location.hash = '#' + nextSlide
  }

  window.addEventListener('keydown', function (e) {
    if (e.keyCode === 37) { prev() }
    if (e.keyCode === 39) { next() }
  })

  // force a rerender by calling next, followed by previous
  next()
  prev()
})()
