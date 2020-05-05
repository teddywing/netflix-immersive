function with_player (callback) {
	var interval = setInterval(
		function() {
			var player = document.querySelector('.NFPlayer.nf-player-container');

			if (player) {
				clearInterval(interval);

				callback(player);
			}
		},
		1000
	);
}

function init_mutation_observer (player) {
	var observer = new MutationObserver(function(mutation_list) {
		for (var i = 0; i < mutation_list.length; i++) {
			var mutation = mutation_list[i];

			if (mutation.target.classList.contains('postplay')) {
				mutation.target.classList.remove('postplay');

				// Activate player controls.
				mutation.target.click();

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

function styles () {
	var style = document.createElement('style');

	document.head.appendChild(style);

	style.sheet.insertRule(
		'.OriginalsPostPlay-BackgroundTrailer .BackToBrowse { visibility: hidden; }',
		style.sheet.cssRules.length
	);

	style.sheet.insertRule(
		'.player-view-childrens { visibility: hidden; }',
		style.sheet.cssRules.length
	);
}


with_player(function(player) {
	window.player = player;

	init_mutation_observer(player);
});

styles();
