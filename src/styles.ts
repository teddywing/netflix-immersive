export function styles () {
	const style = document.createElement('style');

	document.head.appendChild(style);

	const stylesheet = style.sheet as CSSStyleSheet;

	// "Back to Browse" button that appears when credits are minimised.
	stylesheet.insertRule(
		'.OriginalsPostPlay-BackgroundTrailer .BackToBrowse { visibility: hidden; }',
		stylesheet.cssRules.length
	);

	// Age rating.
	stylesheet.insertRule(
		'.player-view-childrens { visibility: hidden; }',
		stylesheet.cssRules.length
	);

	// "Watch Credits" button.
	stylesheet.insertRule(
		'[data-uia="watch-credits-seamless-button"] { visibility: hidden; }',
		stylesheet.cssRules.length
	);

	// Skip buttons.
	stylesheet.insertRule(`
		a[aria-label="Skip Intro"],
		a[aria-label="Skip Recap"],
		a[aria-label="Next Episode"],
		[data-uia="next-episode-seamless-button"] {
			visibility: hidden;
		}`,
		stylesheet.cssRules.length
	);
}
