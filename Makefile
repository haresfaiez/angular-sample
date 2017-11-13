all: build test deploy clean

initiate:
	npm install
	./node_modules/bower/bin/bower install

build: typescript pug sass

typescript:
	npm run build:ts

pug:
	npm run build:pug

sass:
	npm run build:sass

test: build factory micro integration

factory:
	npm run test:factory:build

micro: typescript factory
	npm run test:micro:build
	npm run test:micro:once

integration: build factory
	npm run test:integration:build
	npm run test:integration:once

manual: build
	npm start

deploy:
	npm install

clean:
	rm -f src/app/*.js*
	rm -f src/config/*.js*
	rm -f src/app/style/*.css*
	rm -f src/app/*.css*
	rm -f src/app/*.html
	rm -f src/app/fund/*.js*
	rm -f src/app/fund/*.html
	rm -f src/app/fund/model/*.js*
	rm -f src/app/fund/flat/*.js*
	rm -f src/app/fund/flat/*.html
	rm -f src/app/share/*.js*
	rm -f src/app/share/*.html
	rm -f src/app/share/factory/*.js*
	rm -f src/app/share/factory/*.html
	rm -f src/app/share/flat/*.js*
	rm -f src/app/share/flat/*.html
	rm -f src/app/share/model/*.js*
	rm -f src/app/opportunity/*.js*
	rm -f src/app/opportunity/model/*.js*
	rm -f src/app/opportunity/*.html
	rm -f src/app/opportunity/card/*.js*
	rm -f src/app/opportunity/card/*.html
	rm -f src/index.html
	rm -f src/main.js*
	rm -f test/factory/fund/*.js*
	rm -f test/factory/share/*.js*
	rm -f test/factory/opportunity/*.js*
	rm -f test/factory/*.js
	rm -f test/factory/*.js.map
	rm -f test/integration/src/app/*.js*
	rm -f test/integration/src/app/fund/*.js*
	rm -f test/integration/src/app/opportunity/*.js*
	rm -f test/integration/src/app/share/*.js*
	rm -f test/integration/src/app/share/factory/*.js*
	rm -f test/integration/src/app/fund/flat/*.js*
	rm -f test/micro/src/app/fund/model/*.js*
	rm -f test/micro/src/app/share/model/*.js*
	rm -f test/micro/src/app/fund/*.js*
	rm -f test/micro/src/app/share/*.js*
