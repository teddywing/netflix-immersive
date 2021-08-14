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

import fullscreen_credits from './fullscreen_credits';
import logger from './logger';
import styles from './styles';
import watch_credits from './watch_credits';


function main () {
	logger.debug('Initialising');

	styles();
	fullscreen_credits();
	watch_credits();
}


main();

// Reinitialise when the page changes.
window.onpopstate = main;
