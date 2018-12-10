import {$assign, $replaceAll} from './domose';

/* Dispatch an Custom Event with a detail
/* ========================================================================== */

function $dispatch(target, type, detail) {
	// an event
	const event = document.createEvent('CustomEvent');

	event.initCustomEvent(type, true, true, detail);

	target.dispatchEvent(event);
}

function $enableFocusRing(target) {
	// retooled from https://github.com/jonathantneal/js-focus-ring

	let keyboardThrottleTimeoutID;

	const activeElements = [];

	target.addEventListener('blur', () => {
		activeElements.forEach((activeElement) => {
			activeElement.removeAttribute('js-focus');
			activeElement.removeAttribute('js-focus-ring');
		});
	}, true);

	target.addEventListener('focus', () => {
		const activeElement = document.activeElement;

		if (activeElement instanceof Element) {
			activeElement.setAttribute('js-focus', '');

			if (keyboardThrottleTimeoutID) {
				activeElement.setAttribute('js-focus-ring', '');
			}

			activeElements.push(activeElement);
		}
	}, true);

	target.addEventListener('keydown', () => {
		keyboardThrottleTimeoutID = clearTimeout(keyboardThrottleTimeoutID) || setTimeout(() => {
			keyboardThrottleTimeoutID = 0;
		}, 100);
	}, true);
}

function $fetch(url, callback, onError = () => {
}) {
	const xhr = new XMLHttpRequest();

	xhr.addEventListener('readystatechange', () => {
		if (4 === xhr.readyState) {
			if (200 === xhr.status) {
				callback(xhr.responseText); // eslint-disable-line callback-return
			} else {
				onError();
			}
		}
	});

	xhr.open('GET', url);
	xhr.send();

	return xhr;
}

function $renderSvgOrImg({imgDef = "", imgClass = "", wrapperClass = "", inlineImg = false, id, alt, imgWidth, imgHeight, viewBox, $targetElm}) {
	const $imgWrapper = $assign('span', {class: wrapperClass});

	if (typeof imgDef === 'string') {
		if (imgDef.indexOf('.svg') === imgDef.length - 4 && !inlineImg) {
			$fetch(imgDef, (svgContents) => {
				$imgWrapper.innerHTML = svgContents;
				const $img = $imgWrapper.firstElementChild;
				$assign($img, svgProps());
			}, () => {
				renderImgTag();
			});
		} else {
			renderImgTag();
		}
	} else {
		const $img = $assign(document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
			svgProps(),
			$assign(document.createDocumentFragment(),
				...imgDef.map(
					(d) => $assign(
						document.createElementNS('http://www.w3.org/2000/svg', 'path'),
						{d}
					)
				)
			));
		$imgWrapper.appendChild($img);
	}

	if ($targetElm) {
		$targetElm.innerHTML = '';
		$targetElm.appendChild($imgWrapper);
	}

	return $imgWrapper;

	function imgProps(props, mixins) {
		for (const mixin in mixins) {
			if (mixins[mixin] !== undefined && mixins[mixin] !== null) props[mixin] = mixins[mixin];
		}
		return props;
	}

	function svgProps() {
		return imgProps(
			{class: `${imgClass}`, role: 'presentation', style: 'transform: rotate(360deg);'},
			{id, alt, viewBox, width: imgWidth, height: imgHeight}
		);
	}

	function renderImgTag() {
		$imgWrapper.appendChild($assign('img', imgProps(
			{style: `${imgWidth ? `width:${imgWidth}px` : ''}; ${imgHeight ? `height:${imgHeight}px` : ''}`},
			{id, alt, src: imgDef, class: imgClass}
		)));
	}
}


export {
	$assign,
	$dispatch,
	$enableFocusRing,
	$fetch,
	$replaceAll,
	$renderSvgOrImg
};
