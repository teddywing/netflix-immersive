import { init_mutation_observer, with_player } from './fullscreen_credits';
import { styles } from './styles';


with_player(function(player) {
	// window.player = player;

	init_mutation_observer(player);
});

styles();
