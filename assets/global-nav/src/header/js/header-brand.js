import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';

const prefix = 'esri-header-brand';

export default () => {
	const $target = $('div', {class: prefix});

	// On Click
	$target.addEventListener('click', (event) => {
		$dispatch($target, 'header:click:brand', {event});
	});

	/* Brand: On Update
	/* ====================================================================== */
	$target.addEventListener('header:update:brand', ({detail}) => {
		let $targetLink = $('span', {class: prefix, id: prefix});
		if (detail.href) {
			$targetLink = $('a', {class: `${prefix}-link`, id: prefix, href: detail.href});
		}
		$($target, $targetLink);

		if (detail.distributorImage) {
			const $distributorImage = $('span', {class: 'distributor-image'});
			$renderSvgOrImg({imgDef: detail.distributorImage, imgClass: `${prefix}-image`, alt: '', imgWidth: detail.distributorImageWidth, imgHeight: detail.distributorImageHeight, $targetElm: $distributorImage});
			$($targetLink, $distributorImage, $('span', {class: 'distributor-image-border'}));
		}
		if (detail.image) {
			const $brandImage = $('span', {class: 'brand-image'});
			$($targetLink, {aria: {label: detail.label}});
			$renderSvgOrImg({imgDef: detail.image, imgClass: `${prefix}-image`, alt: '', imgWidth: detail.width, imgHeight: detail.height, $targetElm: $brandImage});
			$($targetLink, $brandImage);
		}
		if (detail.brandText) {
			const textClass = detail.image ? `${prefix}-text -has-image` : `${prefix}-text`;
			const $brandText = $('span', {class: textClass}, detail.brandText);
			$($targetLink, $brandText);
		}
	});

	return $target;
};
