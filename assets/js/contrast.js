(function () {
  var swatches = Array.prototype.slice.call(document.querySelectorAll('.js-swatch'));
  var textSamples = Array.prototype.slice.call(document.querySelectorAll('.js-swatch-text'));

  swatches[0].tabIndex = 0;

  swatches.forEach(function (swatch) {
    swatch.addEventListener('click', showCompatibleColors);
    swatch.addEventListener('keyup', handleKeyup);
  });

  function handleKeyup (e) {
    console.log(e);
    var index = swatches.indexOf(e.target);
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      var next = swatches[index + 1] || swatches[0];
      next.click();
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      var prev = swatches[index - 1] || swatches[swatches.length - 1];
      prev.click();
    }
    if (e.key === ' ') {
      e.target.click();
    }
  }

  function showCompatibleColors (e) {
    e.target.classList.toggle('color-swatch-active');
    e.target.classList.remove('color-swatch-inactive');
    e.target.tabIndex = 0;
    e.target.focus();
    e.target.querySelector('.js-swatch-text').classList.add('hide');
    e.target.querySelector('.js-swatch-rating').classList.add('hide');

    var hex = e.target.getAttribute('data-hex');
    var color = e.target.getAttribute('data-color');
    var isReset = !e.target.classList.contains('color-swatch-active');
    var validSwatches = []

    swatches
      .filter(function (swatch) {
        swatch.querySelector('.js-swatch-text').style.opacity = 0;
        return swatch !== e.target;
      })
      .forEach(function (swatch) {
        var rating = swatch.querySelector('.js-swatch-rating');
        var contrast = checkContrast(hex, swatch.getAttribute('data-hex'));
        var text = swatch.querySelector('.js-swatch-text');

        swatch.classList.add('color-swatch-inactive');
        swatch.classList.remove('color-swatch-active');
        swatch.setAttribute('aria-checked', 'false');
        swatch.tabIndex = -1;
        rating.classList.add('hide');
        text.classList.add('hide');

        if (contrast || isReset) {
          swatch.classList.remove('color-swatch-inactive');
        }

        if (contrast && !isReset) {
          swatch.querySelector('.js-swatch-text').style.opacity = 1;
          validSwatches.push(swatch.getAttribute('data-color'));
          rating.innerHTML = contrast;
          rating.classList.remove('hide');
          text.classList.remove('hide');
          text.style.color = hex;
        }
      });

    var notification = document.querySelector('.js-contrast-notification');
    notification.innerHTML = isReset ? '' : color + ' is compatible with: ' + validSwatches.join(', ');
  }

  function checkContrast (a, b) {
    var lum = [a, b]
      .map(hexRgb)
      .map(relativeLuminance);
    var contrast = luminance(lum[0], lum[1]);
    if (contrast >= 7) {
      return 'AAA'
    }
    if (contrast >= 4.5) {
      return 'AA'
    }
    return false;
  }

  /*
   * Color utility functions taken from wcag contrast module:
   * https://github.com/tmcw/wcag-contrast
   * License: BSD 2-Clause
   */
  function hexRgb (hex) {
    hex = hex.replace(/^#/, '');
    var alpha = 255;
    var num = parseInt(hex, 16);
    var red = num >> 16;
    var green = (num >> 8) & 255;
    var blue = num & 255;
    return [red, green, blue, alpha];
  }

  function adjustGamma (_) {
    return Math.pow((_ + 0.055) / 1.055, 2.4);
  }

  function relativeLuminance (rgb) {
    var rc = 0.2126;
    var gc = 0.7152;
    var bc = 0.0722;
    var lowc = 1 / 12.92;
    var rsrgb = rgb[0] / 255;
    var gsrgb = rgb[1] / 255;
    var bsrgb = rgb[2] / 255;

    var r = rsrgb <= 0.03928 ? rsrgb * lowc : adjustGamma(rsrgb),
      g = gsrgb <= 0.03928 ? gsrgb * lowc : adjustGamma(gsrgb),
      b = bsrgb <= 0.03928 ? bsrgb * lowc : adjustGamma(bsrgb);

    return r * rc + g * gc + b * bc;
  }

  function luminance(a, b) {
    var l1 = Math.max(a, b);
    var l2 = Math.min(a, b);
    return (l1 + 0.05) / (l2 + 0.05);
  }
})();
