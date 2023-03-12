(function () {
	const gameContainer = document.querySelector('.game-container');
	const startBtn = document.querySelector('.start-btn');
	const humanBtn = document.querySelector('.human-btn');
	const aiBtn = document.querySelector('.pc-ai-btn');
	const submitBtn = document.querySelector('.submit-btn');
	const resetBtn = document.querySelector('.reset-btn');

	const enemyTxt = document.querySelector('.enemy-text');
	const enemySelection = document.querySelector('.enemy-selection');

	const firstPlayerName = document.querySelector('#player1-name');
	const secondPlayerName = document.querySelector('#player2-name');
	const playerInput = document.querySelector('.player-input');
	const playerNameContainer = document.querySelector('.player-name-container');

	let gameOver;

	startBtn.addEventListener('click', () => {
		startBtn.style.display = 'none';
		enemyTxt.style.display = 'block';
		enemySelection.style.display = 'flex';
		aiBtn.style.display = 'block';
		humanBtn.style.display = 'block';
		gameContainer.style.display = 'none';
		firstPlayerName.innerHTML = '';
		secondPlayerName.innerHTML = '';
		playerInput.style.display = 'none';
		resetBtn.style.display = 'none';
	});
	humanBtn.addEventListener('click', () => {
		aiBtn.style.display = 'none';
		playerInput.style.display = 'flex';
	});
	submitBtn.addEventListener('click', (e) => {
		e.preventDefault();
		startBtn.style.display = 'block';
		playerInput.style.display = 'none';
		playerNameContainer.style.display = 'flex';
		gameContainer.style.display = 'grid';
		enemyTxt.style.display = 'none';
		enemySelection.style.display = 'none';
		resetBtn.style.display = 'block';
		firstPlayerName.innerHTML = document.querySelector('#player1').value;
		secondPlayerName.innerHTML = document.querySelector('#player2').value;
		Game.start();
	});
	resetBtn.addEventListener('click', () => {
		Gameboard.reset();
		Gameboard.render();
	});

	const Gameboard = (() => {
		let gameboard = [null, null, null, null, null, null, null, null, null];

		const getGameboard = () => {
			return gameboard;
		};

		const reset = () => {
			gameOver = false;
			gameboard = [null, null, null, null, null, null, null, null, null];
		};

		const render = () => {
			// Clear the game container
			gameContainer.innerHTML = '';

			// Loop through each cell in the game board array and create a button element for it
			gameboard.forEach((val, i) => {
				const cell = document.createElement('button');
				cell.id = i;
				cell.classList.add('cell-btn');
				cell.textContent = val || ''; // Set text content to val or empty string if val is null
				gameContainer.appendChild(cell);
			});
			//Attach eventListener to the button element
			const cellBtn = document.querySelectorAll('.cell-btn');
			cellBtn.forEach((btn) => {
				btn.addEventListener('click', (e) => {
					Game.handleClick(e);
				});
			});
		};

		const update = (id, symbol) => {
			gameboard[id] = symbol;
			Gameboard.render();
		};

		return {
			getGameboard,
			reset,
			render,
			update,
		};
	})();

	const createPlayer = (name, symbol) => {
		return { name, symbol };
	};

	const Game = (() => {
		let players = [];
		let currPlayerID;

		const start = () => {
			players = [
				createPlayer(document.querySelector('#player1').value, 'X'),
				createPlayer(document.querySelector('#player2').value, 'O'),
			];
			currPlayerID = 0;
			gameOver = false;
			Gameboard.render();
		};

		const handleClick = (e) => {
			let id = parseInt(e.target.id);
			if (Gameboard.getGameboard()[id] !== null || gameOver) return;

			Gameboard.update(id, players[currPlayerID].symbol);

			if (checkForWin(Gameboard.getGameboard())) {
				alert(`${players[currPlayerID].name} won!`);
			} else if (checkForTie(Gameboard.getGameboard())) {
				alert("It's a tie!");
				gameOver = true;
			}
			currPlayerID = (currPlayerID + 1) % players.length;
		};

		const checkForTie = (board) => {
			for (let i = 0; i < board.length; i++) {
				if (board[i] === null) {
					return false;
				}
			}
			return true;
		};
		const checkForWin = (board) => {
			const winningCombos = [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6],
			];
			for (let i = 0; i < winningCombos.length; i++) {
				const [a, b, c] = winningCombos[i];
				if (board[a] && board[a] === board[b] && board[b] === board[c]) {
					gameOver = true;
					return true;
				}
			}
			return false;
		};
		return { start, handleClick };
	})();
})();
