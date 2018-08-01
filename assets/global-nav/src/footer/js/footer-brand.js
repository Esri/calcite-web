import {$assign as $, $renderSvgOrImg} from '../../shared/js/shared';

// Create branding and social sections
export default (data, prefix) => $('div', {class: `${prefix}-brand`},
	$('a',
		{
			class: `${prefix}-brand-link`,
			href: data.href,
			aria: {label: data.label}
		},
		$renderSvgOrImg({imgDef: data.path, imgClass: `${prefix}-brand-image`})
	)
);
