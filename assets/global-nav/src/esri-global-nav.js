import * as Polyfills from './shared/js/polyfills';
import createHeader from './header/js/header';
import createFooter from './footer/js/footer';

window.esriHeader = {create: createHeader};
window.esriFooter = {create: createFooter};

function buildHeader({targetElm, menuData}) {
	document.querySelector(targetElm).classList.add('esri-header-barrier');
	const $esriHeader = createHeader(menuData.header);
	const $headerBarrier = document.querySelector(targetElm);
	$headerBarrier.appendChild($esriHeader);
}

function buildFooter({targetElm, menuData}) {
	document.querySelector(targetElm).classList.add('esri-footer-barrier');
	const $esriFooter = createFooter(menuData.footer);
	const $footerBarrier = document.querySelector(targetElm);
	$footerBarrier.appendChild($esriFooter);
}

export default {
	createHeader: buildHeader,
	createFooter: buildFooter,
	create: ({headerElm, footerElm, menuData}) => {
		buildHeader({menuData, targetElm : headerElm});
		buildFooter({menuData, targetElm : footerElm});
	}
};
