/* Global Footer: Tooling
/* ========================================================================== */

import {$assign as $, $dispatch, $renderSvgOrImg} from '../../shared/js/shared';
import {$close} from '../../shared/js/iconPaths';

import languageDialog from './language';

/* Global Footer
/* ========================================================================== */

export default (data, prefix) => {
	// Language Selection Button
	const $labelText = document.createTextNode(data.buttonLabel);
	const $control = document.createElement('button');
	$control.classList.add(`${prefix}-language-control`);
	$control.setAttribute('ariaDescribedby',`${prefix}-language`);
	$control.innerHTML = data.buttonLabel;

	const $barrier = $('div', {class: `${prefix}-language`}, $control);

	$control.addEventListener('click', openDialog);

	// Language Dialog
	data.prefix = `${prefix}-language-dialog`;

	const $languageDialog = languageDialog(data);

	// Language Dialog Close Button
	const $languageDialogClose = $('button',
		{
			class: `${prefix}-language-dialog-close`, id: 'dialog-description',
			ariaLabel: data.closeLabel
		},
		$renderSvgOrImg({imgDef: $close.md, imgClass: `${prefix}-language-dialog-close-image`})
	);

	$languageDialogClose.addEventListener('click', closeDialog);

	$($languageDialog, $languageDialogClose);

	// Language Dialog Canvas
	const $cancelCanvas = $('button', {
		class: `${prefix}-language-dialog-cancel-canvas`,
		type: 'button',
		tabindex: -1
	});

	$cancelCanvas.addEventListener('click', closeDialog);

	function openDialog(event) {
		event.preventDefault();

		$($canvas, {
			aria: {expanded: true}
		});
	}

	function closeDialog(event) {
		event.preventDefault();

		$($canvas, {
			aria: {expanded: false}
		});
	}

	const $canvas = $('div', {
		class: `${prefix}-language-dialog-barrier`,
		aria: {expanded: false}
	}, $languageDialog, $cancelCanvas);

	$control.addEventListener('click', () => {
		$dispatch($control, 'footer:click:language', data);
	});

	$barrier.addEventListener('footer:update:language', ({detail}) => {
		$control.innerHTML = detail.buttonLabel;

		$barrier.ownerDocument.body.appendChild(
			$canvas
		);

		$barrier.ownerDocument.defaultView.addEventListener('keydown', ({keyCode} = event) => {
			if (27 === keyCode) {
				closeDialog(event);
			}
		});
	});

	return $barrier;
};
