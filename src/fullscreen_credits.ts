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
