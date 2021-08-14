// Copyright (c) 2021  Teddy Wing
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

import logger from './logger';
import wait_element from './wait_element';


// Hide the cursor when seamless credits are played.
function init_mutation_observer (player) {
	const observer = new MutationObserver(function(mutation_list) {
		for (var i = 0; i < mutation_list.length; i++) {
			const mutation = mutation_list[i];
			const player = mutation.target as HTMLElement;

			const seamless_controls = document.querySelector(
				'.SeamlessControls--container'
			);

			if (seamless_controls) {
				logger.debug('seamless', 'init_mutation_observer()', 'Handling seamless');
				const style_el = document.createElement('style');

				// Hide the cursor.
				document.head.appendChild(style_el);

				const stylesheet = style_el.sheet as CSSStyleSheet;

				stylesheet.insertRule(`
					body {
						cursor: none !important;
					}`,
					stylesheet.cssRules.length
				);

				document.body.onmousemove = function() {
					document.head.removeChild(style_el);
				}

				return;
			}
		}
	});

	observer.observe(
		player,
		{
			childList: true,
			subtree: true
		}
	);
}

// Initialise the mutation observer when the video player becomes available.
export default function init () {
	wait_element('.watch-video--player-view')
		.then(function(player) {
			init_mutation_observer(player);
		});
}
