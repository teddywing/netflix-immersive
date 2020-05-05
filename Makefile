BROWSERIFY := ./node_modules/.bin/browserify
TSC := ./node_modules/.bin/tsc


all: build/netflix-no-skip.user.js

build/%.js: src/%.ts
	$(TSC)

build/netflix-no-skip.user.js: build/index.js build/*.js src/userscript-header.txt
	$(BROWSERIFY) $^ -o $@

	cat src/userscript-header.txt $@ > $@.tmp
	mv $@.tmp $@