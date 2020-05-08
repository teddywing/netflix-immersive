import logger from './logger';
import wait_element from './wait_element';


const controls = {
	hide: function() {
		logger.debug('hide():', 'Hiding controls');

		wait_element('.PlayerControlsNeo__layout.PlayerControlsNeo__layout--active')
			.then(function(controls) {
				logger.debug('hide():', 'Controls:', controls);

				controls
					.classList
					.replace(
						'PlayerControlsNeo__layout--active',
						'PlayerControlsNeo__layout--inactive'
					);
			});
	}
};

export default controls;
