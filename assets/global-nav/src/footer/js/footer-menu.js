/* Global Footer
/* ========================================================================== */

import {$assign as $, $dispatch} from '../../shared/js/shared';

// Create navigation
export default (data, prefix) => {
	// ...
	const media = matchMedia('(max-width: 719px)');

	let mediaMatches = false;

	media.addListener(onchange);

	// Menu Items
	const links = data.menu.map(
		(item, index) => $('li', {class: `${prefix}-menu-item`, id: `${prefix}-menu-link--${index}`},
			$('span',
				{
					class: `${prefix}-menu-link`,
					role: 'heading'
				},
				item.label
			),
			// Submenu
			$('div',
				{
					class: `${prefix}-menu--sub`, id: `${prefix}-menu--sub--${index}`,
					aria: {labelledby: `${prefix}-menu-link--${index}`}
				},
				$('ul',
					{
						class: `${prefix}-menu-list--sub`,
						role: 'presentation'
					},
					// Submenu Items
					...item.menu.map(
						(subitem) => $('li', {class: `${prefix}-menu-item--sub`},
							$('a', {class: `${prefix}-menu-link--sub`, href: subitem.href},
								subitem.label
							)
						)
					)
				)
			)
		)
	);

	// Menu
	const $target = $('div',
		{
			class: `${prefix}-menu`,
			aria: {label: data.label}
		},
		$('ul',
			{
				class: `${prefix}-menu-list`,
				role: 'presentation'
			},
			...links
		)
	);

	onchange();

	return $target;

	// ...
	function onchange() {
		if (mediaMatches !== media.matches) {
			mediaMatches = media.matches;

			links.forEach((link) => {
				if (mediaMatches) {
					transformAsTouch(link.firstChild);
				} else {
					detransformAsTouch(link.firstChild);
				}
			});
		}
	}

	// ...
	function transformAsTouch(link) {
		const isVisible = 'true' !== link.nextElementSibling.getAttribute('aria-hidden');

		$(link, {
			tabindex: 0,
			role: 'button', aria: {expanded: !isVisible, haspopup: !isVisible}
		});

		link.addEventListener('click', onclick);
		link.addEventListener('keypress', onkeypress);

		$(link.nextElementSibling, {aria: {hidden: true}});
	}

	// ...
	function detransformAsTouch(link) {
		link.removeAttribute('aria-controls');
		link.removeAttribute('aria-expanded');
		link.removeAttribute('aria-haspopup');
		link.removeAttribute('role');
		link.removeAttribute('tabindex');

		link.addEventListener('click', onclick);
		link.addEventListener('keypress', onkeypress);

		link.nextElementSibling.removeAttribute('aria-hidden');
	}

	// ...
	function onclick(event) {
		const currentTarget = event.currentTarget;
		const nextTarget = currentTarget.nextElementSibling;
		const isVisible = 'true' !== nextTarget.getAttribute('aria-hidden');

		$(currentTarget, {aria: {expanded: !isVisible, haspopup: !isVisible}});

		$(nextTarget, {aria: {hidden: isVisible}});

		if (isVisible) {
			$(currentTarget, {aria: {controls: 0}});
		} else {
			$(currentTarget, {aria: {controls: nextTarget.id}});
		}
	}

	// ...
	function onkeypress(event) {
		if (event.keyCode === 13 || event.keyCode === 32) {
			event.preventDefault();

			$dispatch(event.currentTarget, 'click');
		}
	}
};
