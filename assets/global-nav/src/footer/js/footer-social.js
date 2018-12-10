import {$assign as $, $renderSvgOrImg} from '../../shared/js/shared';

export default (data, prefix) => {
	const $socialIcons = document.createDocumentFragment();


	data.menu.forEach((item) => {
		const platform = item.platform || item.label.toLowerCase().replace(' ','-');
		$($socialIcons,
			$('a',
				{
					class: `${prefix}-social-item ${prefix}-social-link -${platform}`,
					href: item.href,
					aria: {label: item.label},
					target: '_blank',
					rel: 'noopener'
				},
				$renderSvgOrImg({imgDef: item.image.path, imgClass: `${prefix}-social-image`, alt: '', imgWidth: 30, imgHeight:30, viewBox : item.image.viewBox})
			));
	});

	return $('div', {class: `${prefix}-social`},
		$('nav', {class: `${prefix}-social-nav`, aria: {label: data.label}},
			$socialIcons));
};
