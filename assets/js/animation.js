(function () {
  document.querySelector(".js-replay-animations").addEventListener("click", replayAnimations);
  var animations = calcite.findElements(".js-animation")
    .map(function (el) {
      var animationClass = [].slice.apply(el.classList).filter(function (c) {
        return c !== "js-animation";
      });
      return {
        el: el,
        animationClass: animationClass[0]
      };
    })
    .filter(function (obj) {
      return obj.animationClass;
    })
  function replayAnimations () {
    animations.forEach(function (animation) {
      animation.el.classList.remove(animation.animationClass);
    });
    setTimeout(function () {
      animations.forEach(function (animation) {
        animation.el.classList.add(animation.animationClass);
      });
    }, 50);
  }
})();
