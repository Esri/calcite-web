import {$assign as $, $renderSvgOrImg} from '../../shared/js/shared';

export default (data, prefix) => {
	const $socialIcons = document.createDocumentFragment();


	data.menu.forEach((item) => $($socialIcons,
		$('li', {class: `${prefix}-social-item`},
			$('a',
				{
					class: `${prefix}-social-link -${item.label.toLowerCase()}`,
					href: item.href,
					aria: {label: item.label}
				},
				$renderSvgOrImg({imgDef: item.image.path, imgClass: `${prefix}-social-image`, imgWidth: 30, imgHeight:30, viewBox : item.image.viewBox})
			)
		)));

	return $('div',
		{class: `${prefix}-social`, aria: {label: data.label}},
		$('ul', {class: `${prefix}-social-list`, role: 'presentation'},
			$socialIcons));
};
