export function styles () {
	const style = document.createElement('style');

	document.head.appendChild(style);

	const stylesheet = style.sheet as CSSStyleSheet;

	stylesheet.insertRule(
		'.OriginalsPostPlay-BackgroundTrailer .BackToBrowse { visibility: hidden; }',
		stylesheet.cssRules.length
	);

	stylesheet.insertRule(
		'.player-view-childrens { visibility: hidden; }',
		stylesheet.cssRules.length
	);

	stylesheet.insertRule(
		'[data-uia="watch-credits-seamless-button"] { visibility: hidden; }',
		stylesheet.cssRules.length
	);
}
