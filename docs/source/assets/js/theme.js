// Calcite Web Docs Theme Toggle
(function () {
  var localStorageItem = 'calciteWebTheme';
  var themeDarkStylesheet = document.getElementById('calcite-theme-dark');
  var themeLightStylesheet = document.getElementById('calcite-theme-light');
  var themeDarkAnimationClass = 'theme-dark-fade-in';
  var themeLightAnimationClass = 'theme-light-fade-in';
  var themeToggleEls = document.getElementsByClassName('docs-theme-toggle');
  var themeToggles = Array.from(themeToggleEls);

  document.addEventListener('DOMContentLoaded', setThemeOnLoad);
  themeToggles.forEach(el => el.addEventListener('click', changeTheme));

  function setThemeOnLoad() {
    // we need to set disabled attribute here as well as in markup for ff
    if (localStorage.getItem(localStorageItem) == 'dark') {
      console.log("page load im dark");
      themeDarkStylesheet.disabled = false;
      themeLightStylesheet.disabled = true;
      themeToggles.forEach(el => el.setAttribute('checked', true));
    }
    else {
      console.log("page load im light");
      themeLightStylesheet.disabled = false;
      themeDarkStylesheet.disabled = true;
    }
  }

  function changeTheme(el) {
    if (localStorage.getItem(localStorageItem) == 'dark') {
      localStorage.setItem(localStorageItem, 'light');
      var currentTheme = localStorage.getItem(localStorageItem);
      themeLightStylesheet.disabled = false;
      themeDarkStylesheet.disabled = true;
      document.body.classList.remove(themeDarkAnimationClass);
      document.body.classList.add(themeLightAnimationClass);
      themeToggles.forEach(el => el.setAttribute('checked', false));
      setTimeout(function () {
        document.body.classList.remove(themeLightAnimationClass);
      }, 2000);
      console.log(currentTheme);
    }
    else {
      localStorage.setItem(localStorageItem, 'dark');
      var currentTheme = localStorage.getItem(localStorageItem);
      themeDarkStylesheet.disabled = false;
      themeLightStylesheet.disabled = true;
      document.body.classList.remove(themeLightAnimationClass);
      document.body.classList.add(themeDarkAnimationClass);
      themeToggles.forEach(el => el.setAttribute('checked', true));
      setTimeout(function () {
        themeLightStylesheet.disabled = true;
      }, 10);
      setTimeout(function () {
        document.body.classList.remove(themeDarkAnimationClass);
      }, 2000);
      console.log(currentTheme);
    }
  }
})();
