# roshambo

setup by running `npm i` <br/>
run a game by running `node index.js --move=rock` <br/>
you can increase the complexity of the game by using `node index.js --move=rock --complexity=1` valid values are 0, 1, or 2<br/>
you can find valid moves for the default complexity (0) by running: `node index.js --listrules`<br/>
you can find valid moves for a certain level of complexity by running: `node index.js --listrules --complexity=1`<br/>
these can all be combined like so: `node index.js --move=rock --complexity=2 --listrules`
