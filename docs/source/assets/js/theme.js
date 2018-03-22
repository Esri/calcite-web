// Calcite docs theme switcher
(function () {
  var localStorageItem = 'calciteWebTheme';
  var themeDarkStylesheet = document.getElementById('calcite-theme-dark');
  var themeLightStylesheet = document.getElementById('calcite-theme-light');
  var themeDarkAnimationClass = 'theme-dark-fade-in';
  var themeLightAnimationClass = 'theme-light-fade-in';
  var themeToggleEls = document.getElementsByClassName('docs-theme-toggle');
  var themeToggles = [];

  // ie array wrangling
  for (var i = 0; i < themeToggleEls.length; i++) { themeToggles.push(themeToggleEls[i]); }

  document.addEventListener('DOMContentLoaded', setThemeOnLoad);
  themeToggles.forEach(function (el) { return el.addEventListener('click', changeTheme); });

  // set disabled attribute on load here as well as in markup for ff
  function setThemeOnLoad() {
    if (localStorage.getItem(localStorageItem) === 'dark') {
      themeDarkStylesheet.disabled = false;
      themeLightStylesheet.disabled = true;
      themeToggles.forEach(function (el) { return el.checked = true });
    } else {
      themeLightStylesheet.disabled = false;
      themeDarkStylesheet.disabled = true;
      themeToggles.forEach(function (el) { return el.checked = false });
    }
  }

  function changeTheme() {
    if (localStorage.getItem(localStorageItem) === 'dark' || localStorage.getItem(localStorageItem) === null) {
      localStorage.setItem(localStorageItem, 'light');
      themeLightStylesheet.disabled = false;
      themeDarkStylesheet.disabled = true;
      document.body.classList.remove(themeDarkAnimationClass);
      document.body.classList.add(themeLightAnimationClass);
      themeToggles.forEach(function (el) { return el.checked = false });
      setTimeout(function () { document.body.classList.remove(themeLightAnimationClass); }, 2000);
    } else {
      localStorage.setItem(localStorageItem, 'dark');
      themeDarkStylesheet.disabled = false;
      themeLightStylesheet.disabled = true;
      document.body.classList.remove(themeLightAnimationClass);
      document.body.classList.add(themeDarkAnimationClass);
      themeToggles.forEach(function (el) { return el.checked = true });
      setTimeout(function () { document.body.classList.remove(themeDarkAnimationClass); }, 2000);
    }
  }
})();
