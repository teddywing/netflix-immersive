import with_player from './player';


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

				document.querySelector('.PlayerControlsNeo__layout.PlayerControlsNeo__layout--active')
					.classList
					.replace(
						'PlayerControlsNeo__layout--active',
						'PlayerControlsNeo__layout--inactive'
					);

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
	with_player().then(function(player) {
		init_mutation_observer(player);
	});
}
