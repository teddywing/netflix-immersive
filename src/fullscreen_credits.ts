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

import controls from './controls';
import wait_element from './wait_element';


function init_mutation_observer (player) {
	const observer = new MutationObserver(function(mutation_list) {
		for (var i = 0; i < mutation_list.length; i++) {
			const mutation = mutation_list[i];
			const player = mutation.target as HTMLElement;

			if (player.classList.contains('postplay')) {
				player.classList.remove('postplay');

				// Activate player controls.
				player.click();

				controls.hide();

				return;
			}
		}
	});

	observer.observe(
		player,
		{
			attributeFilter: ['class'],
			attributeOldValue: true
		}
	);
}

export default function init () {
	wait_element('.NFPlayer.nf-player-container')
		.then(function(player) {
			init_mutation_observer(player);
		});
}
