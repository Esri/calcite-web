import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';
import {$close, $bell} from '../../shared/js/iconPaths';

const prefix = 'esri-header-notifications';
let messages = [];

export default () => {
	const $target = $('div', {class: prefix});

	// /* Notifications: Control
	// /* ====================================================================== */
	const $control = $('button',
		{
			class: `${prefix}-control`, id: `${prefix}-control`,
			aria: {controls: `${prefix}-menu`, expanded: false, haspopup: true}
		}
	);

	$control.addEventListener('click', (event) => {
		$dispatch($control, 'header:click:notifications', {event});
		$dispatch($control, 'header:menu:toggle', {
			notifications: true,
			control: $control,
			content: $content,
			state: 'menu',
			target: $target,
			type: 'notifications-toggle'
		});
	});

	// /* Notifications: Control
	// /* ====================================================================== */
	const $dismiss = $('button', {class: `${prefix}-dismiss-all`});
	$dismiss.addEventListener('click', (event) => {
		$dispatch($control, 'header:click:notifications:dismiss', messages);
	});

	/* Notifications: Content
	/* ====================================================================== */
	const $contentMessages = $('ul', {
		class: `${prefix}-messages`
	});
	const $content = $('div',
		{
			class: `${prefix}-menu`, id: `${prefix}-menu`,
			role: 'group', aria: {expanded: false, hidden: true}
		},
		$contentMessages
	);

	/* Notifications: On Update
	/* ====================================================================== */
	$target.addEventListener('header:update:notifications', ({detail}) => {
		messages = (detail.messages || []).map((item) => item.id);

		const $icon = $renderSvgOrImg({imgDef: $bell.md, imgClass: `${prefix}-image`, id: `${prefix}-image`});

		if (detail.messages && detail.messages.length > 0) {
			$replaceAll($dismiss, detail.dismissAllLabel);
			const $badge = $('span', {class: `${prefix}-badge`}, `${detail.messages.length}`);
			$replaceAll($control, $icon, $badge);
			// Update the notifications
			$replaceAll($contentMessages,
				...detail.messages.map((item) => {
					const $dismissBtn = $('button', {
						class: `${prefix}-message-dismiss`,
						aria: {label: detail.dismissLabel}
					}, $renderSvgOrImg({imgDef: $close.sm, imgClass: `${prefix}-dismiss-icon`}));
					$dismissBtn.addEventListener('click', (event) => {
						$dispatch($control, 'header:click:notifications:dismiss', [item.id]);
					});
					return $('li', {class: `${prefix}-message`},
						$('span', {class: `${prefix}-message-text`}, item.text,
							$('span', {class: `${prefix}-message-date`}, item.date)),
						$dismissBtn
					);
				})
			);
			$replaceAll($content, $contentMessages, $dismiss);
		} else {
			$replaceAll($control, $icon);
			const $emptyImage = $renderSvgOrImg({imgDef: detail.emptyMessage.image.path, imgClass: `${prefix}-empty-image`, viewBox : detail.emptyMessage.image.viewBox});
			const $emptyText = $('p', {class: `${prefix}-empty-text`}, detail.emptyMessage.text);
			const $empty = $('div', {class: `${prefix}-empty`}, $emptyImage, $emptyText);
			$replaceAll($content, $empty);
		}

		$replaceAll($target, $control, $content);
	});

	return $target;
};
