import {$assign as $} from '../../shared/js/shared';

/* Language
/* ========================================================================== */

export default (data) => {
	const $choice = $('select',
		{
			class: `${data.prefix}-choice`,
			autofocus: '',
			aria: {label: data.optionsLabel}
		},
		...data.options.map(
			(option) => {
				const opt = document.createElement('option');
				opt.value = option.value;
				opt.innerHTML = option.label;
				return opt;
			}
		)
	);

	const $language = $('form', {
			class: data.prefix,
			aria: {labelledby: `${data.prefix}-message`, describedby: 'dialog-description'}
		},
		$('p', {class: `${data.prefix}-message`, id: `${data.prefix}-message`},
			$('strong', data.greetingLabel),
			' ',
			data.messageLabel
		),
		$choice,
		$('button', {
			class: `${data.prefix}-submit`,
			type: 'submit',
			aria: {label: `${data.submitLabel} ${data.optionsLabel}`}
		}, data.submitLabel)
	);

	$language.addEventListener('submit', (event) => {
		event.preventDefault();

		window.location.href = $choice.value;
	});

	return $language;
};
