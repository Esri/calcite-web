// ┌────────────────┐
// │ Aria Adjusters │
// └────────────────┘
// define all public api methods

// toggles `aria-hidde="true"` on a domNode
export function toggleHidden (array) {
  array.forEach(function (node) {
    var hidden = node.getAttribute('aria-hidden');
    if (hidden !== 'true') {
      node.setAttribute('aria-hidden', true);
    } else {
      node.removeAttribute('aria-hidden');
    }
  });
}

export function toggleExpanded(domNode) {
  var isExpanded = domNode.getAttribute('aria-expanded');
  if (domNode.getAttribute('aria-expanded')) {
    domNode.setAttribute('aria-expanded', 'false');
  } else {
    domNode.setAttribute('aria-expanded', 'true');
  }
}