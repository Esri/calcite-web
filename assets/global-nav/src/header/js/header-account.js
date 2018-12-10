import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';

const prefix = 'esri-header-account';

export default () => {
	const $target = $('div', {class: prefix});

	/* Account: Control: Signin
	/* ====================================================================== */

	const $controlSigninText = document.createTextNode('');
	const $controlSignin = $('button', {class: `${prefix}-control ${prefix}-control--signin`},
		$controlSigninText
	);

	// On Click
	$controlSignin.addEventListener('click', (event) => {
		$dispatch($controlSignin, 'header:click:signin', {event});
	});

	/* Account: Control
	/* ====================================================================== */

	const $controlImage = $('span');

	const $controlNameText = document.createTextNode('');
	const $controlName = $('span', {class: `${prefix}-name`},
		$controlNameText
	);

	const $controlIdText = document.createTextNode('');
	const $controlId = $('span', {class: `${prefix}-id`},
		$controlIdText
	);

	const $control = $('button',
		{
			class: `${prefix}-control ${prefix}-control--signedin`, id: `${prefix}-control`,
			aria: {controls: `${prefix}-menu`, expanded: false, haspopup: true}
		},
		$controlImage,
		$controlName,
		$controlId
	);

	// On Click
	$control.addEventListener('click', (event) => {
		$dispatch($control, 'header:click:account', {event});

		$dispatch($control, 'header:menu:toggle', {
			account: true,
			control: $control,
			content: $content,
			state: 'menu',
			target: $target,
			type: 'account-toggle'
		});
	});

	/* Account: Content
	/* ====================================================================== */

	// Toggle
	const $contentToggleText = document.createTextNode('');
	const $contentToggle = $('button', {class: `${prefix}-content-toggle`},
		$contentToggleText
	);

	$contentToggle.addEventListener('click', () => {
		$dispatch($contentToggle, 'header:menu:close', {
			control: $control,
			content: $content,
			type: 'account-close'
		});
	});

	// Image
	const $contentImage = $('span');

	// Info
	const $contentInfoNameText = document.createTextNode('');
	const $contentInfoIdText = document.createTextNode('');
	const $contentInfoGroupText = document.createTextNode('');
	const $contentInfo = $('div', {class: `${prefix}-content-info`},
		$contentImage,
		$('span', {class: `${prefix}-content-name`},
			$contentInfoNameText
		),
		$('span', {class: `${prefix}-content-id`},
			$contentInfoIdText
		),
		$('span', {class: `${prefix}-content-group`},
			$contentInfoGroupText
		)
	);

	// Menu
	const $contentMenu = $('ul', {
		class: `${prefix}-content-menu`,
		role: 'navigation', aria: {labelledby: `${prefix}-control`}
	});

	// Switch Control
	const $contentSigninSwitchText = document.createTextNode('');
	const $contentSigninSwitch = $('button', {class: `${prefix}-signin-control -switch`},
		$contentSigninSwitchText
	);

	// Switch Control: On Click
	$contentSigninSwitch.addEventListener('click', (event) => {
		$dispatch($contentSigninSwitch, 'header:click:switch', {event});
	});

	// Signout Control
	const $contentSigninSignoutText = document.createTextNode('');
	const $contentSigninSignout = $('button', {class: `${prefix}-signin-control -logout`},
		$contentSigninSignoutText
	);

	// Signout Control: On Click
	$contentSigninSignout.addEventListener('click', (event) => {
		$dispatch($contentSigninSignout, 'header:click:signout', {event});
	});

	// Signin Menu
	const $contentSigninMenu = $('ul',
		{
			class: `${prefix}-signin-menu`,
			role: 'group'
		},
		$('li', {class: `${prefix}-signin-item`},
			$contentSigninSwitch
		),
		$('li', {class: `${prefix}-signin-item`},
			$contentSigninSignout
		)
	);

	// Content
	const $content = $('div',
		{
			class: `${prefix}-menu`, id: `${prefix}-menu`,
			role: 'group', aria: {expanded: false, hidden: true}
		},
		$contentToggle,
		$contentInfo,
		$contentMenu,
		$contentSigninMenu
	);

	/* Account: On Update
	/* ====================================================================== */

	$target.addEventListener('header:update:account', ({detail}) => {
		$($control, {aria: {label: detail.label}});

		// Update the control text
		$contentToggleText.nodeValue = detail.label;
		$controlSigninText.nodeValue = detail.controls.signin;
		$contentSigninSwitchText.nodeValue = detail.controls.switch;
		$contentSigninSignoutText.nodeValue = detail.controls.signout;

		// If there is a user object
		if (detail.user) {
			// Update the account text + image
			$controlNameText.nodeValue = $contentInfoNameText.nodeValue = detail.user.name;
			$controlIdText.nodeValue = $contentInfoIdText.nodeValue = detail.user.id;
			$contentInfoGroupText.nodeValue = detail.user.group;

			$renderSvgOrImg({imgDef: detail.user.image, alt: detail.user.name, imgClass: `${prefix}-image`, $targetElm: $controlImage});
			$renderSvgOrImg({imgDef: detail.user.image, alt: detail.user.name, imgClass: `${prefix}-content-image`, $targetElm: $contentImage});

			// Update the content menu
			$replaceAll($contentMenu,
				...detail.menus.map(
					(item) => $('li', {class: `${prefix}-content-item`},
						item.newContext ?
							$('a', {class: `${prefix}-content-link`, href: item.href, target: "_blank", rel: 'noopener'}, item.label) :
							$('a', {class: `${prefix}-content-link`, href: item.href}, item.label)
					)
				)
			);

			// Use the control and content
			$replaceAll($target, $control, $content);
		} else {
			// Otherwise, use the signin control
			$replaceAll($target, $controlSignin);
		}
	});

	return $target;
};
