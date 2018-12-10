import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';
import {$grid} from '../../shared/js/iconPaths';
import Sortable from 'sortablejs';
import {$remove} from '../../shared/js/domose';

/* Apps
/* ========================================================================== */

const prefix = 'esri-header-apps';
const isRightToLeft = document.dir === "rtl";

export default () => {
	/* Apps: Content
	/* ====================================================================== */

	const $content = $('div', {
		class: `${prefix}-content`,
		id: `${prefix}-content`,
		aria: {expanded: false, labelledby: `${prefix}-control`}
	});

	/* Apps: Control
	/* ====================================================================== */

	const $appSwitcherIcon = $('span', {
		title: "App Launcher",
		"aria-label": "App Launcher Icon"
	});

	const $controlContainer = $('button', {
		class: `${prefix}-control`, id: `${prefix}-control`,
		style: "display: none;",
		tabindex: "-1"
	}, $appSwitcherIcon);

	const resetStateOfBottomContainer = () => {
		if (ddState.showMoreButton) {
			ddState.showMoreButton.classList.remove("hide");
		}
		$secondaryDropdownMenu.setAttribute('aria-expanded', "false");
  };

	const $closeAppLauncher = (event) => {
		if (!ddState || ddState.loading) return;
		removeMouseUpListener();
		removeMouseOverListener();

		resetStateOfBottomContainer();

		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'root-toggle',
			control: $control,
			content: $content,
			event
		});
	};

	const $control = $controlContainer;

	$controlContainer.addEventListener('click', $closeAppLauncher);

	/* Apps: Target
	/* ====================================================================== */

	const $target = $('div', {class: prefix},
		$control
	);

	/* Apps: Secondary Set of Apps
	/* ====================================================================== */

	const $secondaryDropdownMenu = $('div', {
		class: `${prefix} secondary-dropdown-menu`,
		aria: {expanded: false}
	}, $('hr'));

	const $bottomContainer = $('div', {
		class: `${prefix} bottom-container`
	});

	/* Apps: Parameters that Control the State of Drag & Drop
	/* ====================================================================== */

	const ddState = {
		maxDragErrorTollerance: 1
	};

	/* Apps: Key Codes used for Accessibility
	/* ====================================================================== */

	const keys = {
		DOWN_ARROW: 40,
		UP_ARROW: 38,
		RIGHT_ARROW: 39,
		LEFT_ARROW: 37,
		SPACE: 32
	};

	/* Apps: Helper Functions for Update
	/* ====================================================================== */

	const createDefaultAppLayout = ($topAppContainer, currentApp) => {
		const abbreviationSizes = ["0px", "32px", "24px", "20px", "18px", "16px", "14px"];
		const selectNoneClass = ddState.browserIsEdge ? "user-select-none" : "";
		const canAccessClass = !currentApp.canAccess ? "no-hover" : "with-hover";

		const $listItem = $("li", {
			alt: "",
			"class": `block link-off-black appLinkContainer grabbable ${canAccessClass}`,
			mousedown: interactWithAppLi.bind(null, currentApp),
			keyup: activateAccessibilityMode.bind(null, currentApp),
			keydown: preventBrowserKeyboardDefaults,
			"role": "menuitem",
			"data-id": currentApp.itemId || currentApp.uid || currentApp.title
		});

		if (!currentApp.canAccess) {
			createMissingAppIcon(currentApp, $listItem, selectNoneClass);
		} else {
			if (currentApp.isNew) {
				$listItem.appendChild($("div", {"class": "app-indicator app-indicator-new"}));
			}
			const $appLink = $("a", {
				href: currentApp.url,
				target: "_blank",
				blur: deactivateAccessibilityMode.bind(null, currentApp),
				class: "appLink"
			});
			// Check if App has Icon
			if (currentApp.image) {
				const $appImageContainer = $("div", {"class": `appIconImage ${selectNoneClass}`});
				$appImageContainer.appendChild(getAccessibleAppArrowContainer());
				$appImageContainer.appendChild($("img", {"class": "appIconPng", "alt": "", src: currentApp.image}));
				$appLink.appendChild($appImageContainer);
			} else {
				const stringWidth = Math.round(getTextWidth(currentApp.abbr || "", "avenir") / 5);
				let abbreviationSize = abbreviationSizes[stringWidth];
				if (stringWidth > 6) { // Prevent user from exceeding icon width
					currentApp.abbr = currentApp.abbr.substr(0, 4);
					abbreviationSize = abbreviationSizes[4];
				}
				const surfaceDiv = $("div", {"class": "appIconImage"});
				surfaceDiv.appendChild(getAccessibleAppArrowContainer());
				const surfaceSpan = $("span", {
					style: `font-size: ${abbreviationSize}`,
					class: `avenir appIconSvgText ${selectNoneClass}`
				}, currentApp.abbr);
				surfaceDiv.appendChild(surfaceSpan);
				surfaceDiv.appendChild($("img", {"src": currentApp.placeHolderIcon, "alt": "", "class": selectNoneClass}));
				$appLink.appendChild(surfaceDiv);
			}
			$listItem.appendChild($appLink);
			const p = $("p", {style: "margin:0 auto; text-align:center", class: selectNoneClass}, currentApp.label);
			$appLink.appendChild(p);
		}

		$topAppContainer.appendChild($listItem);
	};

	const createMissingAppIcon = (currentApp, $listItem, selectNoneClass) => {
		const $appLink = $("div", {
			"class": "app-indicator app-indicator-removed",
			"tabindex": 0,
			click: removeAppFromDropdown.bind(null, currentApp.uid, $listItem),
			keyup: removeAppFromDropdown.bind(null, currentApp.uid, $listItem),
			keydown: preventBrowserKeyboardDefaults
		});
		$appLink.innerHTML = getRemoveAppX();

		// Displaying Warnings in association with removed apps
		// - Requires access to orgUrlKey and isAdmin like functionality
		// - To be implemented after discussion
		const $missingIcon = $("div", {
			"class": "missing-app-icon appIconImage",
			"tabindex": 0,
			"blur": deactivateAccessibilityMode.bind(null, currentApp),
			title: ddState.i18n.removed
			// keyup: showRemovedAppWarning.bind(null, currentApp.uid, $listItem),
			// onclick: showRemovedAppWarning.bind(null, currentApp.uid, $listItem)
		});
		$missingIcon.appendChild(getAccessibleAppArrowContainer());
		$listItem.appendChild($appLink);
		$listItem.appendChild($missingIcon);
		$listItem.appendChild($("p", {style: "margin:0 auto; text-align:center", class: selectNoneClass}, currentApp.label));
	};

	const saveAppOrderToUserProperties = (primaryApps, secondaryApps, appRevisions) => {
		$dispatch($control, 'header:apps:reorder', {
			icons: {
				primaryApps,
				secondaryApps,
				revisions: appRevisions || {}
			}
		});
	};

	const expandSecondaryDropdown = () => {
		$secondaryDropdownMenu.setAttribute('aria-expanded', "true");
		ddState.showMoreButton.classList.add("hide");
	};

	const hideOrShowDropAppsHereMessage = (containerAppWasDroppedIn) => {
		if (containerAppWasDroppedIn === ddState.bottomAppContainer && ddState.secondarySortable.toArray().length === 1) {
			showDragAppsHereBox(false);
		} else if (!ddState.secondarySortable.toArray().length) {
			showDragAppsHereBox(true);
		}
	};

	const getTextWidth = (text, font) => { // Adds support for app abbreviations in all languages
		const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
		const context = canvas.getContext("2d");
		context.font = font;
		const metrics = context.measureText(text);
		return metrics.width;
	};

	const getRemoveAppX  = () => '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 32 32"  class="default-svg-fill"><path d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z"/></svg>';

	const getDownChevron = () => ' <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 32 32" class="down-carrot-svg default-svg-fill"><path d="M28 9v5L16 26 4 14V9l12 12L28 9z"></path></svg>';

	const interactWithAppLi = (app, e) => {
		if (e.button === 0) {
			ddState.startClientX = e.clientX;
			ddState.startClientY = e.clientY;
			ddState.startApp = app;
			ddState.dragEventWasCanceled = false;
			ddState.startElement = e.currentTarget;

			if (ddState.disabled) {
				if (app.canAccess) {
					ddState.dropdownNav.addEventListener("mouseup", closeAppLauncherOnClick);
				}
				return;
			}

			setTimeout((e) => {
				ddState.startElement.classList.remove("sortable-drag-class");
			}, 1);

			if (app.isNew) {
				const primaryApps = ddState.primarySortable.toArray();
				// -- Bug occurs where duplicate value gets added to array when clicked
				if (ddState.duplicateValueIndex) {
					primaryApps.splice(ddState.duplicateValueIndex, 1);
				}

				saveAppOrderToUserProperties(
					primaryApps,
					ddState.secondarySortable.toArray(),
					{targetUid: e.currentTarget.getAttribute("data-id"), isNew: true, targetValue: null}
				);
				e.currentTarget.classList.remove("sortable-drag-class");
			} else {
				e.currentTarget.classList.remove("sortable-drag-class");
			}

			ddState.listenForMouseOverElement = e.currentTarget.parentNode;
			ddState.listenForMouseOverElement.addEventListener("mousemove", simulateDragEvent);

			if (app.canAccess) {
				ddState.dropdownNav.addEventListener("mouseup", $closeAppLauncher);
			} else {
				ddState.dropdownNav.addEventListener("mouseup", deactivateDraggingStyles);
				const removedAppClass = "app-indicator app-indicator-removed";
				if (e.target.classList.className === removedAppClass ||
						e.target.parentNode.className === removedAppClass ||
						e.target.parentNode.parentNode.className === removedAppClass
					) {
					ddState.removeStartApp = true;
				}
			}
		}
	};

	const closeAppLauncherOnClick = (e) => {
		ddState.dropdownNav.removeEventListener("mouseup", closeAppLauncherOnClick, false);
		if (!dragEventWasSimulated(e.clientX, e.clientY)) {
			$closeAppLauncher();
		}
	};

	const generateCustomLinkClick = (app, el, removeApp) => {
		if (ddState.disabled || !app) return;
		if (app.canAccess) {
			$closeAppLauncher();
			window.open(app.url, "_blank");
		} else if (removeApp) {
			ddState.removeStartApp = false;
			removeAppFromDropdown(app.itemId || app.title, el);
		} else {
			showRemovedAppWarning(app.itemId || app.title, el);
		}
	};

	const removeAppFromDropdown = (uid, el, e) => {
		if (!e || verifyKeyPress(e.keyCode)) {
			$remove(el);
			setTimeout(() => {
				saveAppOrderToUserProperties(ddState.primarySortable.toArray(), ddState.secondarySortable.toArray());
				hideOrShowDropAppsHereMessage(ddState.bottomAppContainer);
			}, 0);
		}
	};

	const showRemovedAppWarning = (uid, el, e) => {
		ddState.dropdownWrapper.classList.remove("dragging");
		if (!ddState.removedAppWithFoucs && (!e || verifyKeyPress(e.keyCode))) {
			ddState.removedAppWithFoucs = {uid, el};
		} else {
			ddState.removedAppWithFoucs = null;
		}
	};

	const deactivateDraggingStyles = (e) => {
		ddState.dragEventWasCanceled = true;
	};

	const showDragAppsHereBox = (show) => {
		ddState.bottomAppContainer.classList[show ? "add" : "remove"]("drag-apps-here-box");
		ddState.dragAppsHereText.classList[show ? "remove" : "add"]("hide");
	};

	const disableLinkHref = (e, disable) => {
			const link = (e.item.children[1] && e.item.children[1].nodeName === "A") ? e.item.children[1] : e.item.children[0];
			if (disable) {
				ddState.recentlyRemovedHref = link.href;
				link.removeAttribute("href");
			} else {
				setTimeout(() => {
					link.href = ddState.recentlyRemovedHref;
				}, 1);
			}
	};

	const dismissIntro = (e) => {
		ddState.dragAndDropIntro.classList.add("hide");
		saveAppOrderToUserProperties(ddState.primarySortable.toArray(), ddState.secondarySortable.toArray());
	};

	const removeMouseUpListener = () => {
		if (ddState.dropdownNav && ddState.dropdownNav.removeEventListener) {
			ddState.dropdownNav.removeEventListener('mouseup', $closeAppLauncher, false);
		}
	};

	const removeMouseOverListener = () => {
		if (ddState.listenForMouseOverElement) {
			ddState.listenForMouseOverElement.removeEventListener('mousemove', simulateDragEvent, false);
		}
	};

	const simulateDragEvent = (e) => {
		if (dragEventWasSimulated(e.clientX, e.clientY)) {
			ddState.simulatedDragEvent = true;
			ddState.dropdownWrapper.classList.add("dragging");
			removeMouseOverListener();
		}
	};

	const applyDragAndDropAdjustmentsForIE = (ieVersion) => {
		if (ieVersion === "edge") {
			ddState.browserIsEdge = true;
		} else if (ieVersion === "ie11") {
			primarySortableOptions.ghostClass = "sortable-ghost-class-with-pointer-events";
			secondarySortableOptions.ghostClass = "sortable-ghost-class-with-pointer-events";
		}
	};

	const dragEventWasSimulated = (clientX, clientY) => (
		!ddState.dragEventWasCanceled &&
		(Math.abs(clientX - ddState.startClientX) > ddState.maxDragErrorTollerance ||
		Math.abs(clientY - ddState.startClientY) > ddState.maxDragErrorTollerance)
	);

	const verifyKeyPress = (keyCode) => !keyCode || (keyCode === 13);

	/* Apps: Helper functions for Arrow Key Accessibility
	/* ====================================================================== */

	const activateAccessibilityMode = (app, e) => {
		if (e.target.className !== "app-indicator app-indicator-removed") {
			if (e.keyCode === keys.SPACE) {
				if (ddState.activeAccessibleListElement) {
					return deactivateAccessibilityMode(app, e);
				}
				const arrowSpan = app.canAccess ? e.target.firstChild.firstChild : e.target.firstChild;
				const li = e.target.parentNode;
				const ul = li.parentNode;
				const liIndex = getIndexOfListItem(li);
				const numOfPrimaryApps = ddState.primarySortable.toArray().length;

				expandSecondaryDropdown();

				const combinedIndex = getCombinedIndexOfApp(liIndex, ul, numOfPrimaryApps);
				ddState.activeAccessibleListElement = li;
				ddState.activeAccessibleListElementEvent = moveAppWithArrowKeys.bind(
					null, app, getArrayOfDirections(combinedIndex, ul), li, ul, liIndex
				);
				li.addEventListener("keydown", ddState.activeAccessibleListElementEvent);

				populateAccessibleArrows(arrowSpan, liIndex, ul, numOfPrimaryApps);
			}
		}
		return false;
	};

	const deactivateAccessibilityMode = (app, e) => {
		const target = e.target || e;
		const arrowSpan = app.canAccess ? target.firstChild.firstChild : target.firstChild;

		arrowSpan.classList.remove("arrow-keys-enabled");
		arrowSpan.classList.add("arrow-keys-disabled");

		if (ddState.activeAccessibleListElement) {
			ddState.activeAccessibleListElement.removeEventListener("keydown", ddState.activeAccessibleListElementEvent, false);
			ddState.activeAccessibleListElement = null;
		}
	};

	const getArrowKeyDirection = (e) => {
		if (e.keyCode === keys.DOWN_ARROW) return "bottom";
		if (e.keyCode === keys.UP_ARROW) return "top";
		if (e.keyCode === keys.RIGHT_ARROW) return (isRightToLeft ? "left" : "right");
		if (e.keyCode === keys.LEFT_ARROW) return (isRightToLeft ? "right" : "left");
	};

	const preventBrowserKeyboardDefaults = (e) => {
		if (e.keyCode === keys.SPACE || e.keyCode === keys.DOWN_ARROW || e.keyCode === keys.UP_ARROW) {
			e.preventDefault();
		}
	};

	const moveAppWithArrowKeys = (app, directions, li, ul, liIndex, e) => {
		const direction = getArrowKeyDirection(e);

		if (direction === "bottom" && directions.indexOf("bottom") > -1) {
			moveAppByNumberOfSpaces(li, liIndex, ul, 3, app, e);
		}
		if (direction === "top" && directions.indexOf("top") > -1) {
			moveAppByNumberOfSpaces(li, liIndex, ul, -3, app, e);
		}
		if (direction === "right" && directions.indexOf("right") > -1) {
			moveAppByNumberOfSpaces(li, liIndex, ul, 1, app, e);
		}
		if (direction === "left" && directions.indexOf("left") > -1) {
			moveAppByNumberOfSpaces(li, liIndex, ul, -1, app, e);
		}
	};

	const moveAppByNumberOfSpaces = (li, liIndex, ul, spaces, app, e) => {
		const newPosition = liIndex + spaces;
		const ulLength = ul === ddState.bottomAppContainer ? ul.children.length - 1 : ul.children.length;
		const ulIsPrimaryApps = ul === ddState.topAppContainer;

		if ((ulIsPrimaryApps && newPosition < ulLength) || (!ulIsPrimaryApps && newPosition <= ulLength && newPosition > 0)) {
			const node = spaces < 0 ? ul.children[newPosition] : ul.children[newPosition].nextSibling;
			ul.insertBefore(li, node);
		} else if (ulIsPrimaryApps) {
			moveAppToSecondaryList(li, liIndex, spaces);
			hideOrShowDropAppsHereMessage(ddState.bottomAppContainer);
		} else {
			moveAppToPrimaryList(li, liIndex, spaces);
			hideOrShowDropAppsHereMessage(ddState.topAppContainer);
		}

		deactivateAccessibilityMode(app, e);
		if (app.canAccess && !app.isNew) {
			li.children[0].focus();
		} else {
			li.children[1].focus();
		}

		setTimeout(() => {
			if (app.isNew) {
				saveAppOrderToUserProperties(
					ddState.primarySortable.toArray(),
					ddState.secondarySortable.toArray(),
					{targetUid: (app.itemId || app.title), isNew: true, targetValue: null}
				);
			} else {
				saveAppOrderToUserProperties(ddState.primarySortable.toArray(), ddState.secondarySortable.toArray());
			}
		}, 0);
	};

	const moveAppToPrimaryList = (li, liIndex, spaces) => {
		const list = ddState.topAppContainer;
		const appPositionInRow = liIndex % 3 || 3;
		const numOfAppsInLastRow = numOfPrimaryApps % 3 || 3;
		const numOfPrimaryApps = ddState.topAppContainer.children.length;

		if (Math.abs(spaces) === 1 || numOfAppsInLastRow === 3) return list.appendChild(li);
		if (appPositionInRow === 2 && numOfAppsInLastRow > 1) {
			return list.insertBefore(li, list.children[numOfPrimaryApps - (numOfAppsInLastRow - 1)]);
		}
		if (appPositionInRow === 1 && numOfPrimaryApps) {
			return list.insertBefore(li, list.children[numOfPrimaryApps - numOfAppsInLastRow]);
		}
		list.appendChild(li);
	};

	const moveAppToSecondaryList = (li, liIndex, spaces) => {
		const list = ddState.bottomAppContainer;
		const numOfSecondaryApps = ddState.bottomAppContainer.children.length - 1;
		const appPositionInRow = (liIndex + 1) % 3 || 3;

		if (!numOfSecondaryApps) return list.appendChild(li);

		if (Math.abs(spaces) === 1) return list.insertBefore(li, list.children[1]);
		if (appPositionInRow === 2 && numOfSecondaryApps > 1) return list.insertBefore(li, list.children[2]);
		if (appPositionInRow === 3 && numOfSecondaryApps === 2) return list.insertBefore(li, list.children[3]);
		list.insertBefore(li, list.children[1]);
	};

	const getCombinedIndexOfApp = (ind, ul, numOfPrimaryApps) => ind + (ul === ddState.bottomAppContainer ? (numOfPrimaryApps + 1) : 1);

	const getIndexOfListItem = (li) => {
		const ul = li.parentNode;
		return Array.prototype.indexOf.call(ul.children, li);
	};

	const getAccessibleAppArrowContainer = () => $("span", {"class": "arrow-keys-disabled"});

	const populateAccessibleArrows = (arrowSpan, liIndex, ul, numOfPrimaryApps) => {
		arrowSpan.classList.add("arrow-keys-enabled");
		arrowSpan.classList.remove("arrow-keys-disabled");

		const combinedIndex = getCombinedIndexOfApp(liIndex, ul, numOfPrimaryApps);
		arrowSpan.innerHTML = getAccessibleArrows(getArrayOfDirections(combinedIndex, ul), ul);
	};

	const getAccessibleArrows = (arrayOfDirections) => arrayOfDirections.reduce((prev, direction) => prev + getAccessibleArrow(direction), "");

	const getAccessibleArrow = (direction) => `<div class="app-arrow app-arrow-${direction}"></div>`;

	const getArrayOfDirections = (n, ul) => {
		const dirs = [];
		const numOfPrimaryApps = ddState.topAppContainer.children.length;
		const numOfSecondaryApps = ddState.bottomAppContainer.children.length;
		const total = numOfPrimaryApps + numOfSecondaryApps;

		if (n - 1 > 0) dirs.push("left");
		if ((n + 1 <= total || !numOfSecondaryApps) && n !== numOfPrimaryApps) dirs.push("right");
		if (n - 3 > 0) dirs.push("top");
		if ((n - numOfPrimaryApps) + 2 < numOfSecondaryApps || ul === ddState.topAppContainer) dirs.push("bottom");
		return dirs;
	};

	/* Apps: Primary Sortable Options
	/* ====================================================================== */

	const primarySortableOptions = {
		group: "Apps",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
		sort: true,  // sorting inside list
		disabled: false, // Disables the sortable if set to true.
		animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
		forceFallback: true,
		delay: 0,
		fallbackTolerance: 0,
		ghostClass: "sortable-ghost-class",
		dragClass: "sortable-drag-class",
		onStart: (e) => {
			ddState.dragAppsHereText.classList.add("hide");
			removeMouseUpListener();
			disableLinkHref(e, true);
		},
		onEnd: (e) => {
			e.preventDefault();
			removeMouseOverListener();
			disableLinkHref(e, false);
			ddState.dropdownWrapper.classList.remove("dragging");
			ddState.bottomAppContainer.classList.remove("on-drag-over");
			if (ddState.secondarySortable.toArray().length) {
				showDragAppsHereBox(false);
			}
			return false;
		},
		onMove: (e, oe) => {
			if (e.to === ddState.bottomAppContainer) {
				ddState.bottomAppContainer.classList.add("on-drag-over");
			} else {
				ddState.bottomAppContainer.classList.remove("on-drag-over");
			}
		},
		store: {
			get: (sortable) => (sortable.options.group.name && sortable.options.group.name.split("!")) || [],
			set: (sortable) => {
				if (!ddState.simulatedDragEvent) {
					generateCustomLinkClick(ddState.startApp, ddState.startElement, ddState.removeStartApp);
				} else {
					saveAppOrderToUserProperties(sortable.toArray(), ddState.secondarySortable.toArray());
				}
				if (ddState.startElement) ddState.startElement.classList.remove("sortable-drag-class");
				ddState.simulatedDragEvent = false;
			}
		}
	};

	/* Apps: Secondary Sortable Options
	/* ====================================================================== */

	const secondarySortableOptions = {
		group: "Apps",
		sort: true,
		disabled: false,
		animation: 150,
		forceFallback: true,
		delay: 0,
		fallbackTolerance: 0,
		ghostClass: "sortable-ghost-class",
		dragClass: "sortable-drag-class",
		onStart: (e) => {
			removeMouseUpListener();
			disableLinkHref(e, true);
		},
		onEnd: (e) => {
			e.preventDefault();
			removeMouseOverListener();
			disableLinkHref(e, false);
			ddState.dropdownWrapper.classList.remove("dragging");
			if (!ddState.secondarySortable.toArray().length) {
				showDragAppsHereBox(true);
			}
		},
		store: {
			get: (sortable) => (sortable.options.group.name && sortable.options.group.name.split('!')) || [],
			set: (sortable) => {
				if (!ddState.simulatedDragEvent) {
					generateCustomLinkClick(ddState.startApp, ddState.startElement, ddState.removeStartApp);
				} else {
					saveAppOrderToUserProperties(ddState.primarySortable.toArray(), sortable.toArray());
				}
				if (ddState.startElement) ddState.startElement.classList.remove("sortable-drag-class");
				ddState.simulatedDragEvent = false;
			}
		}
	};

	/* Apps: On Update
	/* ====================================================================== */

	$target.addEventListener('header:update:apps', ({detail}) => {
		const $gridIcon = $renderSvgOrImg({imgDef: $grid.md, imgClass: `${prefix}-image`, $targetElm: $appSwitcherIcon});
		// -- Remove display:none from style to show icon
		$control.removeAttribute('style');

		if (!detail.primary) return;
		if (detail.ieVersion) applyDragAndDropAdjustmentsForIE(detail.ieVersion);
		if (detail.disableDragAndDrop) ddState.disabled = true;
		if (detail.text) ddState.i18n = detail.text || {};

		if (!detail.isLoading) {
			$target.appendChild($content);
			$control.className = `${prefix}-control`;
 			$control.setAttribute("tabindex", "0");

			$($control, {aria: {label: detail.label}});

			const numberOfApps = detail.primary.length;
			const dropdownWidth = ` dropdown-width-${(numberOfApps < 3 ? numberOfApps : 3)}`;
			// Variables to Assist with Moving Apps Between Primary and Secondary Groups
			const primaryAppCount = 6;
			const primaryAppsOverflowed = false;

			// App Icons

			ddState.topAppContainer = $("ul", {
				class: `${prefix} appContainer primary`,
				role: "menu"
			});

			ddState.bottomAppContainer = $("ul", {
				class: `${prefix} appContainer secondary`,
				role: "menu"
			});

			if (!ddState.disabled) {
				if (ddState.dropdownWrapper) {
					// Destroy dropdown content to start from clean slate
					$content.innerHTML = "";
					if ($bottomContainer.lastChild) $bottomContainer.removeChild($bottomContainer.lastChild);
				}

				ddState.dragAppsHereText = $("p", {"class": "hide"}, ddState.i18n.dragAppsHere);
				ddState.bottomAppContainer.appendChild(ddState.dragAppsHereText);

				if (!detail.secondary.length) showDragAppsHereBox(true);

				ddState.primarySortable = Sortable.create(ddState.topAppContainer, primarySortableOptions);
				ddState.secondarySortable = Sortable.create(ddState.bottomAppContainer, secondarySortableOptions);
			}

			const maxAppsPerDialog = numberOfApps >= 100 ? 100 : numberOfApps;
			detail.primary.forEach((a, i) => {
				createDefaultAppLayout(ddState.topAppContainer, a, i);
			});
			detail.secondary.forEach((a, i) => {
				createDefaultAppLayout(ddState.bottomAppContainer, a, i);
			});

			$bottomContainer.appendChild(ddState.bottomAppContainer);
			$secondaryDropdownMenu.appendChild($bottomContainer);

			const $dropdown = $('div', {
				class: ''
			});

			const $dragAndDropIntroText = $('p', {
				class: `${prefix} drag-and-drop-intro`
			}, ddState.i18n.intro);
			const $dismissIntroButton = $('button', {
				class: `${prefix} dismiss-intro-button`,
				click: dismissIntro
			}, ddState.i18n.confirm);
			ddState.dragAndDropIntro = detail.displayIntro ? $('div', {class: `${prefix} intro-container`}, $dragAndDropIntroText, $dismissIntroButton) : "";

			const $showMoreChevron = $('span');
			$showMoreChevron.innerHTML = getDownChevron();
			ddState.showMoreButton = $('button', {
				class: `${prefix} show-more-button`,
				click: expandSecondaryDropdown
			}, ddState.i18n.showMore, $showMoreChevron);

			ddState.dropdownWrapper = $('div', {}, ddState.dragAndDropIntro, ddState.topAppContainer, ddState.showMoreButton, $secondaryDropdownMenu);

			ddState.dropdownNav = $('nav', {
				class: `${prefix} dropdown-menu dropdown-right app-switcher-dropdown-menu ${dropdownWidth}`,
				role: "menu"
			}, ddState.dropdownWrapper);

			$dropdown.appendChild(ddState.dropdownNav);
			$content.appendChild($dropdown);
			$replaceAll($target, $control, $content);
			ddState.loading = false;
			resetStateOfBottomContainer();
		} else {
			ddState.loading = true;
			$control.className = `${prefix}-control disabled-grid-icon`;
			$control.setAttribute("tabindex", "-1");
			$replaceAll($target, $control);
		}
	});

	return $target;
};
