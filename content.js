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

			console.log(
				mutation.target.className +
				'\n' +
				mutation.oldValue
			);

			if (mutation.target.classList.includes('postplay')) {
				mutation.target.classList = mutation.target.classList.filter(function(c) {
					return c !== 'postplay';
				});
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


with_player(function(player) {
	init_mutation_observer(player);
});
