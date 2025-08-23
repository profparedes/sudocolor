import React, { useState, useEffect } from 'react';
import { Box, Paper, Button, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';
import SudokuCell from './SudokuCell';
import NumberSelector from './NumberSelector';
import { generateSudoku, isValidMove, isBoardComplete } from '../utils/sudokuGenerator';
import { type SudokuGrid, colorMap, hardColorMap } from '../enum/sudoku';

const SudokuBoard: React.FC = () => {
    const [board, setBoard] = useState<SudokuGrid>([]);
    const [initialBoard, setInitialBoard] = useState<SudokuGrid>([]);
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
    const [showSelector, setShowSelector] = useState(false);
    const [currentDifficulty, setCurrentDifficulty] = useState<'iniciante' | 'intermediario' | 'avancado' | 'hardcore'>('intermediario');
    const [showWinDialog, setShowWinDialog] = useState(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [isColorMode, setIsColorMode] = useState(true);

    useEffect(() => {
        const newBoard = generateSudoku(currentDifficulty);
        setBoard(newBoard.map(row => [...row]));
        setInitialBoard(newBoard.map(row => [...row]));
        setStartTime(new Date());
        setEndTime(null);
        setShowWinDialog(false);
    }, [currentDifficulty]);

    const handleCellClick = (row: number, col: number) => {
        // Só permite editar células que estavam vazias inicialmente
        if (initialBoard[row][col] === null) {
            setSelectedCell({ row, col });
            setShowSelector(true);
        }
    };

    const handleNumberSelect = (number: number) => {
        if (selectedCell) {
            const { row, col } = selectedCell;

            const newBoard = board.map(rowArray => [...rowArray]);
            newBoard[row][col] = number;

            setBoard(newBoard);
            setSelectedCell(null);
            setShowSelector(false);

            // Verifica se o jogador ganhou
            if (isBoardComplete(newBoard)) {
                setEndTime(new Date());
                setShowWinDialog(true);
            }
        }
    };

    const handleCloseSelector = () => {
        setSelectedCell(null);
        setShowSelector(false);
    };

    const handleDifficultyChange = (difficulty: 'iniciante' | 'intermediario' | 'avancado' | 'hardcore') => {
        setCurrentDifficulty(difficulty);
        setShowWinDialog(false);
        // Força o modo SudoCor quando selecionar hardcore
        if (difficulty === 'hardcore') {
            setIsColorMode(true);
        }
    };

    const toggleColorMode = () => {
        setIsColorMode(!isColorMode);
    };

    const formatTime = (start: Date, end: Date): string => {
        const diffInSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);
        const minutes = Math.floor(diffInSeconds / 60);
        const seconds = diffInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const isInitialCell = (row: number, col: number) => {
        return initialBoard[row]?.[col] !== null;
    };

    const isInvalidCell = (row: number, col: number) => {
        // Só mostra erros se o tabuleiro estiver completo
        const isComplete = board.every(row => row.every(cell => cell !== null));
        if (!isComplete) return false;

        const value = board[row][col];
        if (value === null) return false;

        // Verifica se o valor atual é válido
        const tempBoard: SudokuGrid = board.map(rowArray => [...rowArray]);
        tempBoard[row][col] = null;
        return !isValidMove(tempBoard, row, col, value);
    };

    // Determina qual paleta de cores usar
    const getCurrentColorMap = () => {
        return currentDifficulty === 'hardcore' ? hardColorMap : colorMap;
    };

    if (board.length === 0) {
        return <div>Carregando...</div>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    padding: { xs: 1, md: 2 },
                    backgroundColor: '#2d2d2d',
                    border: '2px solid #404040',
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(9, 1fr)',
                        gap: 0.5,
                        padding: 1,
                        // Adiciona espaçamento extra entre blocos 3x3
                        '& > div:nth-of-type(3n)': {
                            marginRight: '4px',
                        },
                        '& > div:nth-of-type(n+19):nth-of-type(-n+27)': {
                            marginBottom: '8px',
                        },
                        '& > div:nth-of-type(n+46):nth-of-type(-n+54)': {
                            marginBottom: '8px',
                        },
                    }}
                >
                    {board.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <SudokuCell
                                key={`${rowIndex}-${colIndex}`}
                                value={cell}
                                row={rowIndex}
                                col={colIndex}
                                isInitial={isInitialCell(rowIndex, colIndex)}
                                isInvalid={isInvalidCell(rowIndex, colIndex)}
                                isColorMode={isColorMode}
                                currentDifficulty={currentDifficulty}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            />
                        ))
                    )}
                </Box>
            </Paper>

            <NumberSelector
                open={showSelector}
                onClose={handleCloseSelector}
                onNumberSelect={handleNumberSelect}
                isColorMode={isColorMode}
                currentDifficulty={currentDifficulty}
            />

            {/* Paleta de Cores (apenas no modo SudoCor) */}
            {isColorMode && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#b0b0b0',
                            textAlign: 'center',
                        }}
                    >
                        Cores disponíveis:
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 0.5,
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                            <Box
                                key={getCurrentColorMap()[number]}
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: getCurrentColorMap()[number],
                                    border: '1px solid #404040',
                                    borderRadius: '2px',
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            )}

            {/* Botão de Modo (não aparece no hardcore) */}
            {currentDifficulty !== 'hardcore' && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={toggleColorMode}
                        sx={{
                            backgroundColor: isColorMode ? '#e0e0e0' : '#FFD1DC',
                            color: isColorMode ? '#1a1a1a' : '#000000',
                            fontWeight: 600,
                            padding: '12px 24px',
                            '&:hover': {
                                backgroundColor: isColorMode ? '#b0b0b0' : '#FFB6C1',
                            },
                        }}
                    >
                        {isColorMode ? 'TRADICIONAL' : 'SudoCor'}
                    </Button>
                </Box>
            )}

            {/* Botões de Dificuldade */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: '#e0e0e0',
                        marginBottom: 1,
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    Dificuldade:
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    {(['iniciante', 'intermediario', 'avancado', 'hardcore'] as const).map((difficulty) => (
                        <Button
                            key={difficulty}
                            variant={currentDifficulty === difficulty ? 'contained' : 'outlined'}
                            onClick={() => handleDifficultyChange(difficulty)}
                            sx={{
                                minWidth: '120px',
                                color: currentDifficulty === difficulty ? '#1a1a1a' : '#e0e0e0',
                                backgroundColor: currentDifficulty === difficulty ? '#e0e0e0' : 'transparent',
                                borderColor: '#404040',
                                '&:hover': {
                                    backgroundColor: currentDifficulty === difficulty ? '#b0b0b0' : '#404040',
                                    borderColor: '#606060',
                                },
                            }}
                        >
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </Button>
                    ))}
                </Box>
            </Box>

            {/* Diálogo de Vitória */}
            <Dialog
                open={showWinDialog}
                onClose={() => setShowWinDialog(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        backgroundColor: '#2d2d2d',
                        border: '2px solid #404040',
                    },
                }}
            >
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            padding: 2,
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                color: '#e0e0e0',
                                textAlign: 'center',
                                fontWeight: 700,
                            }}
                        >
                            🎉 Parabéns! 🎉
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#b0b0b0',
                                textAlign: 'center',
                            }}
                        >
                            Você completou o SudoCor com sucesso!
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#b0b0b0',
                                textAlign: 'center',
                            }}
                        >
                            Dificuldade: {currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)}
                        </Typography>
                        {startTime && endTime && (
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#e0e0e0',
                                    textAlign: 'center',
                                    fontWeight: 600,
                                    marginTop: 1,
                                }}
                            >
                                ⏱️ Tempo: {formatTime(startTime, endTime)}
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'center',
                        padding: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => setShowWinDialog(false)}
                        sx={{
                            backgroundColor: '#e0e0e0',
                            color: '#1a1a1a',
                            '&:hover': {
                                backgroundColor: '#b0b0b0',
                            },
                        }}
                    >
                        Continuar Jogando
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SudokuBoard;
