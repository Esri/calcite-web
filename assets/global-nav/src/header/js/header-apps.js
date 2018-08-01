import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';

/* Apps
/* ========================================================================== */

const prefix = 'esri-header-apps';

export default () => {
	/* Apps: Content
	/* ====================================================================== */

	const $content = $('div', {
		class: `${prefix}-content`,
		id: `${prefix}-content`,
		aria: {expanded: false, labelledby: `${prefix}-control`}
	});

	const $appSwitcherIcon = $('span', {
		title: "App Launcher",
		"aria-label": "App Launcher Icon"
	});

	/* Apps: Control
	/* ====================================================================== */

	const $controlContainer = $('button', {
		class: `${prefix}-control empty-padding`, id: `${prefix}-control`
	});

	const $dropdown = $('div', {
		class: 'dropdown'
	});

	$controlContainer.appendChild($dropdown);

	const $control = $controlContainer;

	$controlContainer.addEventListener('click', (event) => {
		$dispatch($control, 'header:click:apps', {event});

		// Elements with following class won't trigger/dispatch the dropdown
		if (event.target.classList.contains(`${prefix}-prevent-dropdown`)) return;

		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'root-toggle',
			control: $control,
			content: $content,
			event
		});
	});

	/* Apps: Target
	/* ====================================================================== */

	const $target = $('div', {class: prefix},
		$control
	);

	/* Apps: Helper Functions for Update
	/* ====================================================================== */

	const createDefaultAppLayout = ($topAppContainer, currentApp) => {
		const abbreviationSizes = ["0px", "32px", "24px", "20px", "18px", "16px", "14px"];

		const listItem = $("li", {
			alt: "",
			class: `${prefix}-prevent-dropdown link-off-black appLinkContainer`,
			role: "menuitem"
		});

		const appLink = $("a", {
			href: currentApp.url, // + "#username=" + this._currentUser.username,
			target: "_blank",
			class: "appLink"
		});
		// Check if App has Icon
		if (currentApp.image) {
			const appImageContainer = $("div", {"class": "appIconImage"});
			$renderSvgOrImg({imgDef: currentApp.image, imgWidth: 48, imgHeight: 48, $targetElm: appImageContainer});
			appLink.appendChild(appImageContainer);
		} else {
			const stringWidth = Math.round(getTextWidth(currentApp.abbr || "", "avenir") / 5);
			let abbreviationSize = abbreviationSizes[stringWidth];
			if (stringWidth > 6) { // Prevent user from exceeding icon width
				currentApp.abbr = currentApp.abbr.substr(0, 4);
				abbreviationSize = abbreviationSizes[4];
			}
			const surfaceDiv = $("div", {"class": "appIconImage"});
			const surfaceSpan = $("span", {
				style: `font-size: ${abbreviationSize}`,
				class: "avenir appIconSvgText"
			}, currentApp.abbr);
			surfaceDiv.appendChild(surfaceSpan);
			surfaceDiv.appendChild($renderSvgOrImg({imgDef: currentApp.placeHolderIcon, imgWidth: 48, imgHeight: 48}));
			appLink.appendChild(surfaceDiv);
		}
		const p = $("p", {style: "margin:0 auto; text-align:center"}, currentApp.label);
		appLink.appendChild(p);
		listItem.appendChild(appLink);
		$topAppContainer.appendChild(listItem);
	};

	const getTextWidth = (text, font) => { // Adds support for app abbreviations in all languages
		const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
		const context = canvas.getContext("2d");
		context.font = font;
		const metrics = context.measureText(text);
		return metrics.width;
	};

	/* Apps: On Update
	/* ====================================================================== */

	$target.addEventListener('header:update:apps', ({detail}) => {
		$renderSvgOrImg({imgDef: detail.image.path, imgWidth: detail.image.width, imgHeight: detail.image.height, imgClass: `${prefix}-image`, $targetElm: $appSwitcherIcon});

		if (detail.icons) {
			$target.appendChild($content);
			$control.className = `${prefix}-control`;

			$($control, {aria: {label: detail.label}});

			const numberOfApps = detail.icons.length;
			const dropdownWidth = ` dropdown-width-${(numberOfApps < 4 ? numberOfApps : 4)}`;

			// App Icons

			const $topAppContainer = $("ul", {
				class: `${prefix}-prevent-dropdown appContainer`,
				role: "menu"
			});

			const maxAppsPerDialog = numberOfApps >= 100 ? 100 : numberOfApps;
			for (let i = 0; i < maxAppsPerDialog; i += 1) {
				createDefaultAppLayout($topAppContainer, detail.icons[i]);
			}

			// Container
			const $dropdownWrapper = $('div', {class: `${prefix}-prevent-dropdown`}, $topAppContainer);

			const $dropdownNav = $('nav', {
				class: `${prefix}-prevent-dropdown dropdown-menu dropdown-right app-switcher-dropdown-menu ${dropdownWidth}`,
				role: "menu"
			}, $dropdownWrapper);

			$replaceAll($dropdown, $appSwitcherIcon, $dropdownNav);
		}
	});

	return $target;
};
