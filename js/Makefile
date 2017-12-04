SRC_DIR = src

PREFIX = .
DIST_DIR = ${PREFIX}/dist

MODULES = titleScene.js \
	main.js

GAME = ${DIST_DIR}/game.js
GAME_MIN = ${DIST_DIR}/game.min.js

all: game min

game: ${GAME}

${GAME}: ${MODULES} ${DIST_DIR}
	@@echo "Building.."

	@@cat ${MODULES} | \
		sed 's/.function..ns..{//' | \
		sed 's/}...NameSpace..;//' > ${GAME}

min: game ${GAME_MIN}

${GAME_MIN}: ${GAME}
	@@echo "Minifying use Google Closure Compiler"

	@@curl -s \
		-d compilation_level=SIMPLE_OPTIMIZATIONS \
		-d output_format=text \
		-d output_info=compiled_code \
		--data-urlencode "js_code@${GAME}" \
		http://closure-compiler.appspot.com/compile \
		> ${GAME_MIN}

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

.PHONY: all
