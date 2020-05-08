import logger from './logger';


const controls = {
	hide: function() {
		logger.debug('hide():', 'Hiding controls');

		const controls_el = document.querySelector(
			'.PlayerControlsNeo__layout.PlayerControlsNeo__layout--active'
		);
		logger.debug('hide():', 'Controls:', controls_el);

		controls_el
			.classList
			.replace(
				'PlayerControlsNeo__layout--active',
				'PlayerControlsNeo__layout--inactive'
			);
	}
};

export default controls;
