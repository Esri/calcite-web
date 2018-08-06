//  Taken from: https://raw.githubusercontent.com/jonathantneal/domose/master/domose.js

/* Speculative DOM Functionality
/* ========================================================================== */

function assignSource(element, source, prefix) {
    for (const key in source) {
        if ('function' === typeof source[key]) {
            // add functions as event listeners
            element.addEventListener(prefix + key, source[key]);
        } else if (Object(source[key]) === source[key]) {
            // assign objects as source
            assignSource(element, source[key], `${prefix + key}-`);
        } else {
            // otherwise, set attributes
            element.setAttribute(prefix + key, source[key]);
        }
    }
}

/* Assign an element with attributes, events, and children
/* ========================================================================== */

function $assign(id) {
    // $assign(element, { class: 'btn', click: () => { /* listener */ } });
    // $assign('button', { aria: { label: 'title' } }, child);
    // $assign('div', child1, child2, 'a new text node');
    // $assign(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));

    const element = id instanceof Node ? id : document.createElement(id);

    [].slice.call(arguments, 1).forEach((source) => {
        if (source instanceof Node) {
            // append sources that are nodes
            element.appendChild(source);
        } else if ('string' === typeof source) {
            // append strings as text nodes
            element.innerHTML = source;
        } else {
            assignSource(element, source, '');
        }
    });

    return element;
}

/* Dispatch an event from an Element
/* ========================================================================== */

function $dispatchEvent(element, event) {
    // $dispatchEvent(element, new CustomEvent('foo', { bubbles: true }));
    // $dispatchEvent(element, 'foo', { bubbles: true });

    return element.dispatchEvent(
        event instanceof Event ? event : $CustomEvent(event, arguments[1])
    );
}

/* Replace all the children of a parent node with new children
/* ========================================================================== */

function $replaceAll(parentNode) {
    // $replaceAll(element);
    // $replaceAll(element, child1, child2);

    while (parentNode.lastChild) {
        parentNode.removeChild(parentNode.lastChild);
    }

    parentNode.appendChild(
        asFragment(arguments)
    );

    return parentNode;
}

/* Wrap a child node within an element
/* ========================================================================== */

function $wrapWith(childNode, element) {
    // $wrapWith(element, wrappingElement);

    if (childNode.parentNode) {
        childNode.parentNode.insertBefore(element, childNode).appendChild(childNode);
    }

    return childNode;
}

/* Emerging DOM Functionality
/* ========================================================================== */

function asFragment(nodes) {
    const fragment = document.createDocumentFragment();

    [].slice.call(nodes, 1).forEach((node) => {
        if (node instanceof Node) {
            fragment.appendChild(node);
        } else {
            fragment.appendChild(
                document.createTextNode(node)
            );
        }
    });

    return fragment;
}

/* Insert nodes after a child node
/* ========================================================================== */

function $after(childNode) {
    // $after(element, sibling1, sibling2, 'a new text node');

    if (childNode.parentNode) {
        childNode.parentNode.insertBefore(
            asFragment(arguments),
            childNode.nextSibling
        );
    }

    return childNode;
}

/* Appends nodes to a parent node
/* ========================================================================== */

function $append(parentNode) {
    // $append(parentNode, child1, child2, 'a new text node');

    parentNode.append(
        asFragment(arguments)
    );

    return parentNode;
}

/* Insert nodes before an element
/* ========================================================================== */

function $before(element) {
    // $before(element, sibling1, sibling2, 'a new text node');

    if (element.parentNode) {
        element.parentNode.insertBefore(
            asFragment(arguments),
            element
        );
    }

    return element;
}

/* Return the closest ancestor element matching a given selector
/* ========================================================================== */

function $closest(element, selectors) {
    // $closest(element, selectors);

    let target = element;

    while (target && 1 === target.nodeType) {
        if ($matches(target, selectors)) {
            return target;
        }

        target = target.parentNode;
    }

    return null;
}

/* Return whether or not a DOM element matches a given selector
/* ========================================================================== */

function $matches(element, selectors) {
    // $matches(element, selectors);

    const elements = element.parentNode.querySelectorAll(selectors);

    let index = 0;

    while (elements[index] && elements[index] !== element) {
        ++index;
    }

    return Boolean(elements[index]);
}

/* Prepends a child to a parent node
/* ========================================================================== */

function $prepend(parentNode) {
    // $prepend(element, child1, child2, 'a new text node');

    parentNode.insertBefore(
        asFragment(arguments),
        parentNode.firstChild
    );

    return parentNode;
}

/* Remove a child node from its parent
/* ========================================================================== */

function $remove(childNode) {
    // $remove(element);

    if (childNode.parentNode) {
        childNode.parentNode.removeChild(childNode);
    }

    return childNode;
}

/* Replace a child node with nodes
/* ========================================================================== */

function $replaceWith(childNode) {
    // $replaceWith(element, sibling1, sibling2, 'a new text node');

    if (childNode.parentNode) {
        childNode.parentNode.replaceChild(
            asFragment(arguments),
            childNode
        );
    }

    return childNode;
}

/* Emerging Event Functionality
/* ========================================================================== */

/* Create a new CustomEvent
/* ========================================================================== */

function $CustomEvent(type) {
    // element.dispatchEvent(new $CustomEvent('click', { bubbles: true }));

    const event = document.createEvent('CustomEvent');
    const param = Object(arguments[1]) || {bubbles: false, cancelable: false, detail: undefined};

    event.initCustomEvent(type, param.bubbles, param.cancelable, param.detail);

    return event;
}

/* Fetch response text from a URL and pass it to a callback
/* ========================================================================== */

function $fetch(url, callback) {
    // $fetch('api?foo=bar', (responseText) => {});

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (4 === xhr.readyState && 200 === xhr.status) {
            callback(xhr.responseText); // eslint-disable-line callback-return
        }
    });

    xhr.open('GET', url);
    xhr.send();

    return xhr;
}

/* Export
/* ========================================================================== */

export {
    $assign,
    $after,
    $append,
    $before,
    $closest,
    $CustomEvent,
    $dispatchEvent,
    $fetch,
    $matches,
    $prepend,
    $remove,
    $replaceAll,
    $replaceWith,
    $wrapWith
};
