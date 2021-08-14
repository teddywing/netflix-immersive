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

import controls from './controls';
import logger from './logger';
import wait_element from './wait_element';


// Prevent credits from being minimised.
function init_mutation_observer (player) {
	const observer = new MutationObserver(function(mutation_list) {
		for (var i = 0; i < mutation_list.length; i++) {
			const mutation = mutation_list[i];
			const player = mutation.target as HTMLElement;
			const video = player.querySelector('video') as HTMLElement;

			// The `postplay` class minimises the movie. Remove it if it gets
			// added to remain in full frame.
			if (player.classList.contains('watch-video--player-view-minimized')) {
				logger.debug('fullscreen_credits', 'init_mutation_observer()', 'Maximising');

				player.classList.remove('watch-video--player-view-minimized');

				// Resize the video to full frame. Otherwise it will shrink for
				// a second until the click event kicks in.
				video.style.height = null;
				video.style.width = 'inherit';

				// Activating playback controls makes them visible. Keep them
				// hidden.
				const style_el = document.createElement('style');
				document.head.appendChild(style_el);

				const stylesheet = style_el.sheet as CSSStyleSheet;

				stylesheet.insertRule(`
					.watch-video--back-container {
						visibility: hidden !important;
					}

					.watch-video--bottom-controls-container {
						display: none !important;
					}`,
					stylesheet.cssRules.length
				);

				// Playback controls are removed when postplay is activated.
				// Re-enable them.
				const click_area = player.children[0] as HTMLElement;
				click_area.click();

				// Once the player controls auto-hide themselves, remove our
				// forced hiding so that the controls become user-accessible
				// again.
				setTimeout(
					function() {
						document.head.removeChild(style_el);
					},
					4000
				);

				return;
			}
		}
	});

	observer.observe(
		player,
		{
			attributeFilter: ['class']
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
