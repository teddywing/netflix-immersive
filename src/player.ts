export default function with_player (): Promise<HTMLElement> {
	return new Promise(function(resolve) {
		const interval = setInterval(
			function() {
				const player = document.querySelector('.NFPlayer.nf-player-container');

				if (player) {
					clearInterval(interval);

					resolve(player);
				}
			},
			1000
		);
	});
}
