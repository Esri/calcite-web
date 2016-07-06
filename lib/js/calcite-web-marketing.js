(function CalciteMarketing () {
  // ┌────────────┐
  // │ Public API │
  // └────────────┘
  // define all public api methods (excluding patterns)
  var marketing = {
    imageSwitcher: imageSwitcher,
    carousel: carousel
  };

  function imageSwitcher () {
    console.log('please do image switcher');
  }

  function carousel () {
    console.log('please do carousel');
  }

  // ┌────────────────┐
  // │ Expose Calcite │
  // └────────────────┘
  // make calcite available to amd, common-js, or globally
  if (typeof exports === 'object') {
    module.exports = marketing;
  } else {
    // if something called marketing already exists,
    // save it for recovery via marketing.noConflict()
    var oldmarketing = window.marketing;
    marketing.noConflict = function () {
      window.marketing = oldmarketing;
      return this;
    };
    window.marketing = marketing;
  }
})();
