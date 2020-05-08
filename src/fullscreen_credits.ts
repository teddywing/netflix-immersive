import controls from './controls';
import wait_element from './wait_element';


function init_mutation_observer (player) {
	var observer = new MutationObserver(function(mutation_list) {
		for (var i = 0; i < mutation_list.length; i++) {
			var mutation = mutation_list[i];
			var player = mutation.target as HTMLElement;

			if (player.classList.contains('postplay')) {
				player.classList.remove('postplay');

				// Activate player controls.
				player.click();

				// TODO: Change .active to .inactive
				// mutation.target.classList.replace('active', 'inactive'); // Didn't work
				// Remove .can-resume: Removes white border on hover
				// PlayerControlsNeo__bottom-controls PlayerControlsNeo__bottom-controls--faded
				// PlayerControlsNeo__layout PlayerControlsNeo__layout--active
				// PlayerControlsNeo__layout PlayerControlsNeo__layout--inactive

				// document.querySelector('.PlayerControlsNeo__bottom-controls')
				// 	.classList
				// 	.add('PlayerControlsNeo__bottom-controls--faded');

				controls.hide();

				// .OriginalsPostPlay-BackgroundTrailer .BackToBrowse

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
