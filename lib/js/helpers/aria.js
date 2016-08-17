// ┌────────────────┐
// │ Aria Adjusters │
// └────────────────┘
// utilities to help manage aria properties

// toggles `aria-hidden` on a domNode
export function toggleHidden (array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    var hidden = node.getAttribute('aria-hidden');
    if (hidden !== 'true') {
      node.setAttribute('aria-hidden', true);
    } else {
      node.removeAttribute('aria-hidden');
    }
  });
}

// adds `aria-hidden` on a domNode
export function hide (array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    node.setAttribute('aria-hidden', true);
  });
}

// removes `aria-hidden` on a domNode
export function show (array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    node.removeAttribute('aria-hidden');
  });
}

export function toggleExpanded (domNode) {
  if (!domNode) {
    return;
  }
  var isExpanded = domNode.getAttribute('aria-expanded');
  if (isExpanded) {
    domNode.removeAttribute('aria-expanded');
  } else {
    domNode.setAttribute('aria-expanded', 'true');
  }
}
