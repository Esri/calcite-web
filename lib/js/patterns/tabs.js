import aria from '../helpers/aria'
import classy from '../helpers/classy'
import dom from '../helpers/dom'
import event from '../helpers/event'

// ┌──────┐
// │ Tabs │
// └──────┘
// tabbed content pane
function tabs () {
  var tabs = dom.findElements('.js-tab');
  var tabGroups = dom.findElements('.js-tab-group');
  var tabSections = dom.findElements('.js-tab-section');

  // set max width for each tab
  tabGroups.forEach(function (tab) {
    tab.setAttribute('aria-live', 'polite');
    tab.children[0].setAttribute('role', 'tablist');
    var tabsInGroup = tab.querySelectorAll('.js-tab');
    var percent = 100 / tabsInGroup.length;
    for (var i = 0; i < tabsInGroup.length; i++) {
      tabsInGroup[i].style.maxWidth = percent + '%';
    }
  });

  function switchTab (e) {
    preventDefault(e);

    var tab = dom.closest('js-tab', event.target(e));
    var tabGroup = dom.closest('js-tab-group', tab);
    var tabs = tabGroup.querySelectorAll('.js-tab');
    var contents = tabGroup.querySelectorAll('.js-tab-section');
    var index = dom.nodeListToArray(tabs).indexOf(tab);

    classy.removeActive(tabs);
    classy.removeActive(contents);

    dom.nodeListToArray(tabs).forEach(function (t){
      t.setAttribute('aria-expanded', false);
    });

    dom.nodeListToArray(contents).forEach(function (c){
      c.setAttribute('aria-expanded', false);
    });

    classy.add(tab, 'is-active');
    classy.add(contents[index], 'is-active');

    tab.setAttribute('aria-expanded', 'true');
    contents[index].setAttribute('aria-expanded', 'true');
  }

  tabs.forEach(function (tab) {
    tab.setAttribute('aria-expanded', 'false');
    tab.setAttribute('role', 'tab');
    event.add(tab, event.click(), switchTab);
    event.add(tab, 'keyup', function(e) {
      if (e.keyCode === 13) {
        switchTab(e);
      }
    });
    tab.setAttribute('tabindex', '0');
  });

  tabSections.forEach(function (section) {
    section.setAttribute('role', 'tabpanel');
    var isOpen = classy.has(section, 'is-active');
    if (isOpen) {
      section.setAttribute('aria-expanded', 'true');
    } else {
      section.setAttribute('aria-expanded', 'false');
    }
  });
};

export default tabs