export function styles () {
	const style = document.createElement('style');

	document.head.appendChild(style);

	const stylesheet = style.sheet as CSSStyleSheet;

	stylesheet.insertRule(`
		/* "Back to Browse" button that appears when credits are minimised. */
		.OriginalsPostPlay-BackgroundTrailer .BackToBrowse,

		/* Age rating. */
		.player-view-childrens,

		/* "Watch Credits" button. */
		[data-uia="watch-credits-seamless-button"],

		/* Skip buttons. */
		a[aria-label="Skip Intro"],
		a[aria-label="Skip Recap"],
		a[aria-label="Next Episode"],
		[data-uia="next-episode-seamless-button"] {
			visibility: hidden;
		}`,
		stylesheet.cssRules.length
	);
}
