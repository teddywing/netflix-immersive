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
import logger from './logger';
import wait_element from './wait_element';


function init_mutation_observer (controls_el) {
	const observer = new MutationObserver(function(mutation_list) {
		for (var i = 0; i < mutation_list.length; i++) {
			const mutation = mutation_list[i];
			const element = mutation.target as HTMLElement;

			const watch_credits_button: HTMLButtonElement = element.querySelector(
				'[data-uia="watch-credits-seamless-button"]'
			);

			if (watch_credits_button) {
				logger.debug(
					'watch_credits',
					'init_mutation_observer()',
					'found Watch Credits button',
					watch_credits_button,
				);

				const pointer_event = new PointerEvent('pointerdown', { bubbles: true });
				watch_credits_button.dispatchEvent(pointer_event);

				controls.hide();

				return;
			}
		}
	});

	observer.observe(
		controls_el,
		{
			childList: true,
			subtree: true
		}
	);
}

export default function init () {
	wait_element('.PlayerControlsNeo__all-controls')
		.then(function(controls_el) {
			logger.debug('Controls element:', controls_el);

			init_mutation_observer(controls_el);
		});
}
