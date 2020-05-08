// Copyright (c) 2020  Teddy Wing
//
// This file is part of Immersive.
//
// Immersive is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Immersive is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Immersive. If not, see <https://www.gnu.org/licenses/>.

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
