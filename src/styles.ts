// Copyright (c) 2020  Teddy Wing
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

export default function styles () {
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
