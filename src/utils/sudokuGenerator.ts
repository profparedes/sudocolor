// Tipos
export type CellValue = number | null;
export type SudokuGrid = CellValue[][];

// Mapeamento de números para cores
export const colorMap: { [key: number]: string } = {
  1: '#FFD1DC', // Rosa claro
  2: '#FFCBA4', // Pêssego
  3: '#FFFACD', // Amarelo claro
  4: '#A7E8BD', // Verde claro
  5: '#c05234', // Marrom
  6: '#DDA0DD', // Lavanda
  7: '#AEC6CF', // Azul claro
  8: '#9999FF', // Azul
  9: '#FF9999', // Rosa
};

// Função para verificar se um número é válido em uma posição específica
export const isValidMove = (board: SudokuGrid, row: number, col: number, num: number): boolean => {
  // Verifica a linha
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) {
      return false;
    }
  }

  // Verifica a coluna
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) {
      return false;
    }
  }

  // Verifica o quadrado 3x3
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
};

// Função para resolver um Sudoku usando backtracking
const solveSudoku = (board: SudokuGrid): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            
            if (solveSudoku(board)) {
              return true;
            }
            
            board[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

// Função para gerar um tabuleiro Sudoku completo
const generateCompleteBoard = (): SudokuGrid => {
  const board: SudokuGrid = Array(9).fill(null).map(() => Array(9).fill(null));
  
  // Preenche alguns números aleatórios para começar
  for (let i = 0; i < 20; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const num = Math.floor(Math.random() * 9) + 1;
    
    if (isValidMove(board, row, col, num)) {
      board[row][col] = num;
    }
  }
  
  // Resolve o Sudoku
  solveSudoku(board);
  
  return board;
};

// Função para remover números do tabuleiro completo para criar o puzzle
const removeNumbers = (board: SudokuGrid, difficulty: 'iniciante' | 'intermediario' | 'avancado' = 'intermediario'): SudokuGrid => {
  const puzzle = board.map(row => [...row]);
  const cellsToRemove = {
    iniciante: 25,
    intermediario: 35,
    avancado: 45
  }[difficulty];
  
  const positions = [];
  for (let i = 0; i < 81; i++) {
    positions.push(i);
  }
  
  // Embaralha as posições
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  
  // Remove números
  for (let i = 0; i < cellsToRemove; i++) {
    const pos = positions[i];
    const row = Math.floor(pos / 9);
    const col = pos % 9;
    puzzle[row][col] = null;
  }
  
  return puzzle;
};

// Função principal para gerar um Sudoku
export const generateSudoku = (difficulty: 'iniciante' | 'intermediario' | 'avancado' = 'intermediario'): SudokuGrid => {
  const completeBoard = generateCompleteBoard();
  return removeNumbers(completeBoard, difficulty);
};

// Função para verificar se o tabuleiro está completo e correto
export const isBoardComplete = (board: SudokuGrid): boolean => {
  // Verifica se todas as células estão preenchidas
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        return false;
      }
    }
  }
  
  // Verifica se todas as linhas, colunas e quadrados são válidos
  for (let i = 0; i < 9; i++) {
    const row = new Set(board[i]);
    const col = new Set(board.map(row => row[i]));
    
    if (row.size !== 9 || col.size !== 9) {
      return false;
    }
  }
  
  // Verifica os quadrados 3x3
  for (let blockRow = 0; blockRow < 3; blockRow++) {
    for (let blockCol = 0; blockCol < 3; blockCol++) {
      const square = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          square.add(board[blockRow * 3 + i][blockCol * 3 + j]);
        }
      }
      if (square.size !== 9) {
        return false;
      }
    }
  }
  
  return true;
};
