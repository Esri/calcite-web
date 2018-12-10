import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';
import {$close, $search} from '../../shared/js/iconPaths.js';

const prefix = 'esri-header-inlineSearch';
const searchState = {};

export default () => {
	/* Search: Control
	/* ====================================================================== */

	const $control = $('button',
		{
			class: `${prefix}-control`, id: `${prefix}-control`,
			aria: {expanded: false, controls: `${prefix}-content`}
		}
	);

	$control.addEventListener('header:menu:open', (event) => {
		$dispatch($control, 'header:inlineSearch:activated', {event});
	});

	$control.addEventListener('click', (event) => {
		$dispatch($control, 'header:click:inlineSearch', {event});
		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'inlineSearch',
			control: $control,
			content: $content,
			event
		});
	});

	/* Search: Close Button
	/* ====================================================================== */

	const $closeBtn = $('button', {
		class: `${prefix}-close-button`, id: `${prefix}-close-button`,
		aria: {labelledby: `${prefix}-close-button`}
	}, $renderSvgOrImg({imgDef: $close.md, imgClass: `${prefix}-dismiss-icon`}));

	$closeBtn.addEventListener('click', (event) => {
		$dispatch($control, 'header:inlineSearch:deactivated', {event});

		setTimeout(() => {
			$control.focus();
		}, 0);

		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'inlineSearch',
			control: $control,
			content: $content,
			event
		});
	});

	/* Search: Input
	/* ====================================================================== */

	const $input = $('input', {
		class: `${prefix}-input`, id: `${prefix}-input`,
		aria: {labelledby: `${prefix}-input`}
	});

	$input.addEventListener("keyup", (e) => {
		searchState.value = e.target.value;
		if (!searchState.value || searchState.value === " ") {
			searchState.isDisabled = false;
			return $suggestions.innerHTML = "";
		} else if (e.keyCode === 13 && searchState.value && !searchState.isDisabled) {
			return window.location.href = `${searchState.action}?q=${encodeURIComponent(searchState.value)}`;
		}

		$dispatch($control, 'header:search:typing', {
			search: searchState.value
		});
	});

	/* Search: Suggestions
	/* ====================================================================== */

	const $suggestions = $('div', {
		class: `${prefix}-suggestions`, id: `${prefix}-suggestions`,
		aria: {expanded: false, labelledby: `${prefix}-suggestions`}
	});

	const boldKeywords = (input, keywords) => {
		try {
			return input.replace(new RegExp(`(\\b)(${keywords.join('|').replace(/\+|\*|\(|\)\[/g,'')})(\\b)`,'ig'), '$1<strong>$2</strong>$3');
		} catch (e) {
			return input;
		}
	}; 

	/* Search: Content
	/* ====================================================================== */

	const $lineBreak = $('div', {class: `esri-header-lineBreak ${prefix}-lineBreak`});
	const $lineBreakRight = $('div', {class: `esri-header-lineBreak ${prefix}-lineBreak lineBreak-right`});

	const $content = $('div', {
		class: `${prefix}-content`, id: `${prefix}-content`,
		aria: {expanded: false, labelledby: `${prefix}-control`}
	}, $lineBreak, $input, $closeBtn, $suggestions, $lineBreakRight);

	/* Search: Target
	/* ====================================================================== */

	const $target = $('div', {
		class: prefix,
		aria: {expanded: false}
	}, $control, $content);

	/* Search: On Activation
	/* ====================================================================== */

	$target.addEventListener('header:inlineSearch:activated', ({detail}) => {
		$target.setAttribute('aria-expanded', "true");
		setTimeout(() => {
			$input.focus();
		}, 0);
	});

	/* Search: On Deactivation
	/* ====================================================================== */

	$target.addEventListener('header:inlineSearch:deactivated', ({detail}) => {
		$target.setAttribute('aria-expanded', "false");
		$suggestions.innerHTML = '';
		$input.value = '';
	});

	/* Search: On Populate Suggestions
	/* ====================================================================== */

	$target.addEventListener('header:search:populateSuggestions', ({detail}) => {
		$suggestions.innerHTML = '';
		searchState.isDisabled = detail.disabled;

		if (Array.isArray(detail)) {
			createSuggestionsList(detail, searchState.value.split(" "));
		} else if (!detail.suggestions || !detail.suggestions.length) {
			// No Results State
			return;
		} else {
			createSuggestionsSections(detail, searchState.value.split(" "));
		}
	});

	const createSuggestionsList = (detail, searchValueArray) => {
		const $ul = $('ul', {class: `${prefix}-simple-suggestion-list`});
		detail.forEach((l) => {
			const $icon = l.icon ? $('img', {src: l.icon, class: `${prefix}-suggestion-icon`, alt: ""}) : "";
			const $span = $('span');
			$span.innerHTML = boldKeywords(l.text, searchValueArray);

			const $li = $('li', {
				class: `${prefix}-suggestion`
			}, (l.href ? $('a', {href: l.href}, $icon, $span) : $('span', {class: "inactive"}, $icon, $span)));

			$ul.appendChild($li);

			const $section = $('div', {
				class: `${prefix}-simple-suggestion-section`
			}, $ul);

			$suggestions.appendChild($section);
		});
	};

	const createSuggestionsSections = (detail, searchValueArray) => {
		const minIconWidth = `${detail.minIconWidth || "0"}px`;
		detail.suggestions.forEach((s, ind) => {
			const $header = s.header ? $('p', {class: `${prefix}-suggestion-header`}, s.header) : $('p');
			const $hr = (s.header || ind > 0) && !s.hideHR ? $('hr') : $('span');
			const $ul = $('ul', {class: `${prefix}-suggestion-list`});
			const $footer = !s.footer ? $('span') : $('a', {
				href: s.footer.href,
				class: `${prefix}-suggestion-footer`
			}, s.footer.text);

			s.links.forEach((l) => {
				const $span = $('span', {class: `${prefix}-suggestion-text`});
				$span.innerHTML = boldKeywords(l.text, searchValueArray);
				$span.appendChild(l.secondary ? $('div', {class: `${prefix}-suggestion-secondary-text`}, l.secondary) : $('span'));
				const $icon = !l.icon ? $('span', {class: `${prefix}-suggestion-icon-wrapper`, style: `min-width: ${minIconWidth};`}) :
					$renderSvgOrImg({
							inlineImg: true,
							alt: "",
							imgDef: l.icon === 'searchIcon' ? $search.sm : l.icon,
							imgWidth: l.iconSize || "22",
							imgHeight: l.icon === 'searchIcon' ? "15px" : l.iconSize,
							imgClass: `${prefix}-suggestion-icon`,
							wrapperClass: `${prefix}-suggestion-icon-wrapper`
						});
				$icon.style.minWidth = minIconWidth;

				if (l.htmlIcon) $icon.innerHTML = l.htmlIcon;

				const $li = $('li', {
					class: `${prefix}-suggestion`
				}, (l.href ? $('a', {href: l.href}, $icon, $span) : $('span', {class: "inactive"}, $icon, $span)));

				$ul.appendChild($li);
			});

			const $section = $('div', {
				class: `${prefix}-suggestion-section`
			}, $header, $hr, $ul, $footer);

			$suggestions.appendChild($section);
		});

		$suggestions.appendChild($('div', {class: `${prefix}-suggestions-bottom-padding`}));
	};

	/* Search: On Update
	/* ====================================================================== */

	$target.addEventListener('header:update:inlineSearch', ({detail}) => {
		if (!detail.hide) {
			$($control, {aria: {label: detail.label}});
			$renderSvgOrImg({imgDef: $search.md, imgClass: `${prefix}-image`, id: `${prefix}-image`, alt: "", $targetElm: $control});

			searchState.image = $search.md;
			searchState.action = detail.dialog && detail.dialog.action;

			$input.setAttribute('placeholder', (detail.dialog && detail.dialog.queryLabel) || "");
			$closeBtn.setAttribute('aria-label', (detail.dialog && detail.dialog.cancelLabel) || "");

			if (detail.dialog) {
				detail.dialog.prefix = 'esri-header-search-dialog';
			}
		} else {
			$control.setAttribute("tabindex", "-1"); 
		}
	});

	return $target;
};
