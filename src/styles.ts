// Copyright (c) 2020–2021  Teddy Wing
//
// This file is part of Immersive.
//
// Immersive is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Immersive is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Immersive. If not, see <https://www.gnu.org/licenses/>.

// Adds CSS to the page to hide superfluous user interface elements.
export default function styles () {
	const style = document.createElement('style');

	document.head.appendChild(style);

	const stylesheet = style.sheet as CSSStyleSheet;

	// 2021.08.13: May want to remove `.player-view-childrens`, which is now
	// replaced by `.advisory-container`.
	stylesheet.insertRule(`
		/* "Back to Browse" button that appears when credits are minimised. */
		.OriginalsPostPlay-BackgroundTrailer .BackToBrowse,

		/* Promo that appears during credis */
		.OriginalsPostPlay-BackgroundTrailer,

		/* Age rating. */
		.player-view-childrens,
		.advisory-container,

		/* "Watch Credits" button. */
		[data-uia="watch-credits-seamless-button"],

		/* Skip buttons. */
		a[aria-label="Skip Intro"],
		a[aria-label="Skip Recap"],
		a[aria-label="Next Episode"],
		[data-uia="next-episode-seamless-button"] {
			visibility: hidden !important;
		}`,
		stylesheet.cssRules.length
	);

	stylesheet.insertRule(`
		/* Remove white border around credits. */
		.NFPlayer.can-resume:hover {
			border: none !important;
		}`,
		stylesheet.cssRules.length
	);
}
