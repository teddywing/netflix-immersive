# Copyright (c) 2020  Teddy Wing
#
# This file is part of Immersive.
#
# Immersive is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Immersive is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Immersive. If not, see <https://www.gnu.org/licenses/>.

BROWSERIFY := ./node_modules/.bin/browserify
TSC := ./node_modules/.bin/tsc


all: netflix-immersive.user.js

build/%.js: src/%.ts
	$(TSC)

	@# Remove license headers
	perl -ni -e 'print unless ($$record_count = /^\/\/ Copyright/ .. /^(?!\/\/)/ and $$record_count !~ /E0$$/)' build/*.js

netflix-immersive.user.js: build/index.js build/*.js src/userscript-header.txt
	$(BROWSERIFY) $< -o $@

	cat src/userscript-header.txt $@ > $@.tmp
	mv $@.tmp $@
