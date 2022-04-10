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

import logger from './logger';

// 2021.08.14: This may be obsolete, replaced by `seamless.ts`.

const controls = {
	// Hide playback controls.
	hide: function() {
		logger.debug('hide():', 'Hiding controls');

		// When the player is activated, the mouse cursor is shown.
		hide_cursor();

		const controls_el = document.querySelector(
			'.watch-video--bottom-controls-container'
		);
		logger.debug('hide():', 'Controls:', controls_el);

		controls_el
			.classList
			.replace(
				'PlayerControlsNeo__layout--active',
				'PlayerControlsNeo__layout--inactive'
			);
	}
};

export default controls;


// Hide the cursor, which appears due to the `active` CSS class when the player
// is reactivated.
function hide_cursor () {
	const style_el = document.createElement('style');

	// Hide the cursor.
	function style () {
		document.head.appendChild(style_el);

		const stylesheet = style_el.sheet as CSSStyleSheet;

		stylesheet.insertRule(`
			.NFPlayer.nf-player-container.active {
				cursor: none !important;
			}`,
			stylesheet.cssRules.length
		);
	}

	// When the player reappears, set it to inactive.
	function set_player_inactive () {
		const observer = new MutationObserver(function(mutation_list) {
			for (var i = 0; i < mutation_list.length; i++) {
				const mutation = mutation_list[i];
				const player = mutation.target as HTMLElement;

				if (player.classList.contains('active')) {
					player.classList.replace('active', 'inactive');

					document.head.removeChild(style_el);
					observer.disconnect();

					return;
				}
			}
		});

		observer.observe(
			document.querySelector('.NFPlayer.nf-player-container'),
			{
				attributeFilter: ['class']
			}
		);
	}

	set_player_inactive()
	style();
}
