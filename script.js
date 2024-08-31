document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.sudoku_grid input');
    const getPuzzleButton = document.getElementById('GetPuzzle');
    const solvePuzzleButton = document.getElementById('SolvePuzzle');

    let puzzle = Array(81).fill(0); // Initialize an empty puzzle (0 means empty)

    // Generate a random Sudoku puzzle (you can replace this with your own logic)
    function generatePuzzle() {
        const samplePuzzle = [
            5, 3, 0, 0, 7, 0, 0, 0, 0,
            6, 0, 0, 1, 9, 5, 0, 0, 0,
            0, 9, 8, 0, 0, 0, 0, 6, 0,
            8, 0, 0, 0, 6, 0, 0, 0, 3,
            4, 0, 0, 8, 0, 3, 0, 0, 1,
            7, 0, 0, 0, 2, 0, 0, 0, 6,
            0, 6, 0, 0, 0, 0, 2, 8, 0,
            0, 0, 0, 4, 1, 9, 0, 0, 5,
            0, 0, 0, 0, 8, 0, 0, 7, 9
        ];
        puzzle = [...samplePuzzle];
        updateGrid();
    }

    // Update the Sudoku grid with the current puzzle state
    function updateGrid() {
        cells.forEach((cell, index) => {
            cell.value = puzzle[index] === 0 ? '' : puzzle[index];
        });
    }

    // Extract the puzzle from the grid input values
    function extractPuzzle() {
        return Array.from(cells).map(cell => parseInt(cell.value) || 0);
    }

    // Check if a number can be placed in a specific cell
    function canPlace(board, row, col, num) {
        for (let x = 0; x < 9; x++) {
            if (board[row * 9 + x] === num || board[x * 9 + col] === num) {
                return false;
            }
        }

        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let r = 0; r < 3; r++) {
            for (let d = 0; d < 3; d++) {
                if (board[(startRow + r) * 9 + startCol + d] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    // Solve the Sudoku puzzle using backtracking
    function solve(board) {
        for (let i = 0; i < 81; i++) {
            if (board[i] === 0) {
                const row = Math.floor(i / 9);
                const col = i % 9;
                for (let num = 1; num <= 9; num++) {
                    if (canPlace(board, row, col, num)) {
                        board[i] = num;
                        if (solve(board)) {
                            return true;
                        }
                        board[i] = 0;
                    }
                }
                return false;
            }
        }
        return true;
    }

    // Handle the SolvePuzzle button click
    function solvePuzzle() {
        const board = extractPuzzle();
        if (solve(board)) {
            puzzle = board;
            updateGrid();
        } else {
            alert('No solution exists!');
        }
    }

    getPuzzleButton.addEventListener('click', generatePuzzle);
    solvePuzzleButton.addEventListener('click', solvePuzzle);
});