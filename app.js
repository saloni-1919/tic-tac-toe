document.addEventListener('DOMContentLoaded', function() {
    // Selecting all the cells
    const cells = document.querySelectorAll('.box');

    // Current player ('X' starts the game)
    let currentPlayer = 'X';

    // Function to toggle player
    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Function to check for a winner
    function checkWinner() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                return cells[a].textContent;
            }
        }

        return null;
    }

    // Function to check if the board is full (draw)
    function checkDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    // Function to handle cell clicks
    function handleCellClick() {
        if (this.textContent === '') {
            this.textContent = currentPlayer;
            this.style.color = '#FAB201'; // Setting color
            if (checkWinner()) {
                const winner = checkWinner();
                document.getElementById('message').textContent = `${winner} wins!`;
                document.getElementById('result').style.visibility = 'visible';
            } else if (checkDraw()) {
                document.getElementById('message').textContent = 'It\'s a draw!';
                document.getElementById('result').style.visibility = 'visible';
            } else {
                togglePlayer();
            }
        }
    }

    // Add event listener to each cell
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    // Function to reset the game
    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.color = 'white'; // Reset color
        });
        document.getElementById('message').textContent = '';
        document.getElementById('result').style.visibility = 'hidden';
    }

    // Add event listener to the "Play again" button
    document.getElementById('button').addEventListener('click', resetGame);
});
