import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';
import esriSearch from '../../search/js/search';

const prefix = 'esri-header-search';

export default () => {
	/* Search: Control
	/* ====================================================================== */

	const $control = $('button',
		{
			class: `${prefix}-control`, id: `${prefix}-control`,
			aria: {expanded: false, controls: `${prefix}-content`}
		}
	);

	$control.addEventListener('click', (event) => {
		$dispatch($control, 'header:click:search', {event});

		$dispatch($control, 'header:menu:toggle', {
			control: $control,
			content: $content,
			state: 'search',
			target: $target,
			type: 'search-toggle',
			event
		});
	});

	/* Search: Content
	/* ====================================================================== */

	const $content = $('div', {
		class: `${prefix}-content`, id: `${prefix}-content`,
		aria: {expanded: false, labelledby: `${prefix}-control`}
	});

	/* Search: Target
	/* ====================================================================== */

	const $target = $('div', {class: prefix},
		$control, $content
	);

	/* Search: On Update
	/* ====================================================================== */

	$target.addEventListener('header:update:search', ({detail}) => {
		if (!detail.hide) {
			$($control, {aria: {label: detail.label}});
			$renderSvgOrImg({imgDef: detail.image, imgClass: `${prefix}-image`, id: `${prefix}-image`, $targetElm: $control});

			if (detail.dialog) {
				detail.dialog.prefix = 'esri-header-search-dialog';

				const $dialog = esriSearch(detail.dialog);

				const $dialogCancelButton = $('button', {
						class: 'esri-header-search-dialog-cancel',
						type: 'reset'
					},
					$('span',
						detail.dialog.cancelLabel
					)
				);

				$dialogCancelButton.addEventListener('click', (event) => {
					$dispatch($control, 'header:menu:close', {
						control: $control,
						content: $content,
						state: 'search',
						type: 'search-close',
						event
					});
				});

				$($dialog,
					$dialogCancelButton
				);

				$replaceAll($content,
					$dialog
				);

				$control.addEventListener('click', (event) => {
					if ('true' === $control.getAttribute('aria-expanded')) {
						$dispatch($dialog, `${detail.dialog.prefix}:focus`, {event});
					}
				});
			}
		}
	});

	return $target;
};
