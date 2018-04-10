// Calcite docs theme switcher
(function () {
  var localStorageItem = 'calciteWebTheme';
  var toggles = Array.prototype.slice.call(document.querySelectorAll('.js-theme-toggle'));

  toggles.forEach(function (el) { return el.addEventListener('change', setTheme); });
  document.addEventListener('DOMContentLoaded', setTheme);

  function setTheme (e) {
    var theme = localStorage.getItem(localStorageItem) || 'light';
    var isChange = e.type === 'change';
    if (isChange) {
      theme = theme === 'light' ? 'dark' : 'light';
    }
    var isDark = theme === 'dark';
    var animationTheme = 'theme-' + theme + '-fade-in';
    localStorage.setItem(localStorageItem, theme);
    toggles.forEach(function (el) { return el.checked = isDark });
    document.getElementById('calcite-theme-dark').disabled = !isDark;
    document.getElementById('calcite-theme-light').disabled = isDark;
    document.body.classList.remove('theme-light-fade-in');
    document.body.classList.remove('theme-dark-fade-in');
    if (isChange) {
      document.body.classList.add(animationTheme);
      setTimeout(function () { document.body.classList.remove(animationTheme); }, 2000);
    }
  }
})();
