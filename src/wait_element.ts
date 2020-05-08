import logger from './logger';


export default function wait_element (selector: string): Promise<Element> {
	return new Promise(function(resolve) {
		const interval = setInterval(
			function() {
				const element = document.querySelector(selector);

				if (element) {
					logger.debug('wait_element():', 'found', element);

					clearInterval(interval);

					resolve(element);
				}
			},
			1000
		);
	});
}
