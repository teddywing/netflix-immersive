export function styles () {
	var style = document.createElement('style');
	var stylesheet = style.sheet as CSSStyleSheet;

	document.head.appendChild(style);

	stylesheet.insertRule(
		'.OriginalsPostPlay-BackgroundTrailer .BackToBrowse { visibility: hidden; }',
		stylesheet.cssRules.length
	);

	stylesheet.insertRule(
		'.player-view-childrens { visibility: hidden; }',
		stylesheet.cssRules.length
	);
}
