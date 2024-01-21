document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    let currentPlayer = 1;
    let isGameOver = false;

    // Create the Connect Four board
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            board.appendChild(cell);
        }
    }

    // Add click event listener to each cell
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    function handleCellClick() {
        if (isGameOver) return;

        const clickedRow = parseInt(this.dataset.row);
        const clickedCol = parseInt(this.dataset.col);

        // Check if the clicked column is valid
        if (isValidMove(clickedCol)) {
            const emptyCell = findEmptyCell(clickedCol);
            const currentPlayerClass = currentPlayer === 1 ? 'player1' : 'player2';

            emptyCell.classList.add(currentPlayerClass);

            if (checkForWinner(clickedRow, clickedCol)) {
                isGameOver = true;
                highlightWinningCells();
                alert(`Player ${currentPlayer} wins!`);
            } else if (checkForDraw()) {
                isGameOver = true;
                alert('It\'s a draw!');
            } else {
                currentPlayer = 3 - currentPlayer; // Switch player (1 -> 2 or 2 -> 1)
            }
        }
    }

    function isValidMove(col) {
        return !cells[col].classList.contains('player1') && !cells[col].classList.contains('player2');
    }

    function findEmptyCell(col) {
        for (let row = 5; row >= 0; row--) {
            const cell = cells[row * 7 + col];
            if (!cell.classList.contains('player1') && !cell.classList.contains('player2')) {
                return cell;
            }
        }
    }

    function checkForWinner(row, col) {
        return (
            checkDirection(row, col, 0, 1) || // Check horizontally
            checkDirection(row, col, 1, 0) || // Check vertically
            checkDirection(row, col, 1, 1) || // Check diagonally (top-left to bottom-right)
            checkDirection(row, col, 1, -1)   // Check diagonally (top-right to bottom-left)
        );
    }

    function checkDirection(row, col, rowIncrement, colIncrement) {
        const playerClass = currentPlayer === 1 ? 'player1' : 'player2';
        let count = 1;

        // Check to the left/up
        for (let i = 1; i <= 3; i++) {
            const newRow = row - i * rowIncrement;
            const newCol = col - i * colIncrement;

            if (newRow < 0 || newCol < 0 || newRow >= 6 || newCol >= 7) {
                break;
            }

            const cell = cells[newRow * 7 + newCol];
            if (cell.classList.contains(playerClass)) {
                count++;
            } else {
                break;
            }
        }

        // Check to the right/down
        for (let i = 1; i <= 3; i++) {
            const newRow = row + i * rowIncrement;
            const newCol = col + i * colIncrement;

            if (newRow < 0 || newCol < 0 || newRow >= 6 || newCol >= 7) {
                break;
            }

            const cell = cells[newRow * 7 + newCol];
            if (cell.classList.contains(playerClass)) {
                count++;
            } else {
                break;
            }
        }

        return count >= 4;
    }

    function highlightWinningCells() {
        const playerClass = currentPlayer === 1 ? 'player1' : 'player2';
        const winningCells = document.querySelectorAll(`.${playerClass}`);
        winningCells.forEach(cell => cell.classList.add('winner'));
    }

    function checkForDraw() {
        return Array.from(cells).every(cell => cell.classList.contains('player1') || cell.classList.contains('player2'));
    }
});
