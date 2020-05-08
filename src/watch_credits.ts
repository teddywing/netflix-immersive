import controls from './controls';
import logger from './logger';
import wait_element from './wait_element';


function init_mutation_observer (controls) {
	var observer = new MutationObserver(function(mutation_list) {
		for (var i = 0; i < mutation_list.length; i++) {
			var mutation = mutation_list[i];
			var element = mutation.target as HTMLElement;

			var watch_credits_button: HTMLButtonElement = element.querySelector(
				'[data-uia="watch-credits-seamless-button"]'
			);

			if (watch_credits_button) {
				logger.debug('found Watch Credits button', watch_credits_button);

				var pointer_event = new PointerEvent('pointerdown', { bubbles: true });
				watch_credits_button.dispatchEvent(pointer_event);

				controls.hide();

				return;
			}
		}
	});

	observer.observe(
		controls,
		{
			childList: true,
			subtree: true
		}
	);
}

export default function init () {
	wait_element('.PlayerControlsNeo__all-controls')
		.then(function(controls) {
			logger.debug('Controls element:', controls);

			init_mutation_observer(controls);
		});
}
