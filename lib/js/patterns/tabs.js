// Cool Helpers
import * as dom from '../helpers/dom';
import * as classy from '../helpers/classy';
import * as event from '../helpers/event';
import Guid from '../helpers/guid';
import bus from '../helpers/bus';

// ┌──────┐
// │ Tabs │
// └──────┘
// tabbed content pane
function tabs () {
  bus.on('tabs:bind', bindTabs);
  bus.on('tabs:active', setTab);

  function bindTabs () {
    var tabs = dom.findElements('.js-tab');
    var tabGroups = dom.findElements('.js-tab-group');
    var tabSections = dom.findElements('.js-tab-section');

    // set max width for each tab
    tabGroups.forEach(function (tab) {
      tab.setAttribute('aria-live', 'polite');
      groupId(tab);
      tab.children[0].setAttribute('role', 'tablist');
      var tabsInGroup = tab.querySelectorAll('.js-tab');
      var percent = 100 / tabsInGroup.length;
      for (var i = 0; i < tabsInGroup.length; i++) {
        tabsInGroup[i].style.maxWidth = percent + '%';
      }
    });

    tabs.forEach(function (tab) {
      tab.setAttribute('aria-expanded', 'false');
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', '0');
      event.add(tab, event.click(), clickTab);
      event.add(tab, 'keyup', enterTab);
    });

    tabSections.forEach(function (section) {
      section.setAttribute('role', 'tabpanel');
      var isOpen = classy.has(section, 'is-active');
      if (isOpen) {
        section.setAttribute('aria-expanded', true);
      } else {
        section.setAttribute('aria-expanded', false);
      }
    });
  }

  function groupId (tab) {
    var hasId = tab.getAttribute('data-tab');
    if (hasId) {
      return hasId;
    } else {
      var id = Guid.raw();
      tab.setAttribute('data-tab', id);
      return id;
    }
  }

  function setTab (options) {
    var group = options.parent;
    var tabs = dom.nodeListToArray(group.querySelectorAll('.js-tab'));
    var activeTab = options.active;

    var sections = dom.nodeListToArray(group.querySelectorAll('.js-tab-section'));
    var index = tabs.indexOf(activeTab);
    var activeSection = sections[index];

    tabs.forEach(function (t) {
      t.setAttribute('aria-expanded', false);
    });
    activeTab.setAttribute('aria-expanded', true);
    classy.toggleActive(tabs, activeTab);

    sections.forEach(function (s) {
      s.setAttribute('aria-expanded', false);
    });
    activeSection.setAttribute('aria-expanded', true);
    classy.toggleActive(sections, activeSection);
  }

  function getOptions (e) {
    var tab = e.target;
    if (!classy.has(tab, 'tab-title')) {
      tab = e.currentTarget;
    }
    var group = dom.closest('js-tab-group', tab);
    var id = groupId(group);
    return {
      parent: group,
      id: id,
      active: tab
    };
  }

  function clickTab (e) {
    e.preventDefault();
    var options = getOptions(e);
    bus.emit('tabs:active', options);
  }

  function enterTab (e) {
    var options = getOptions(e);
    if (e.keycode === 13) {
      bus.emit('tabs:active', options);
    }
  }

  bus.emit('tabs:bind');
}

export default tabs;
