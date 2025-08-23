import React from 'react';
import { Box, Typography } from '@mui/material';
import { colorMap, hardColorMap, type CellValue } from '../enum/sudoku';

interface SudokuCellProps {
    value: CellValue;
    row: number;
    col: number;
    isInitial: boolean;
    isInvalid: boolean;
    isColorMode: boolean;
    currentDifficulty: 'iniciante' | 'intermediario' | 'avancado' | 'hardcore';
    onClick: () => void;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
    value,
    isInitial,
    isInvalid,
    isColorMode,
    currentDifficulty,
    onClick,
}) => {
    const getCurrentColorMap = () => {
        return currentDifficulty === 'hardcore' ? hardColorMap : colorMap;
    };

    return (
        <Box
            onClick={onClick}
            sx={{
                width: { xs: '35px', sm: '45px', md: '55px' },
                height: { xs: '35px', sm: '45px', md: '55px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: value && isColorMode ? getCurrentColorMap()[value] : isInvalid ? '#ff6b6b20' : '#2d2d2d',
                border: isInvalid ? '2px dashed red' : '1px solid #404040',
                cursor: isInitial ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: isInitial ? (value && isColorMode ? getCurrentColorMap()[value] : '#2d2d2d') : '#404040',
                    transform: isInitial ? 'none' : 'scale(1.05)',
                },
                '&:active': {
                    transform: isInitial ? 'none' : 'scale(0.95)',
                },
            }}
        >
            {!isColorMode && (
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                        fontWeight: isInitial ? 700 : 400,
                        color: isInvalid ? '#ff6b6b' : isInitial ? '#e0e0e0' : '#b0b0b0',
                        userSelect: 'none',
                    }}
                >
                    {value || ''}
                </Typography>
            )}
        </Box>
    );
};

export default SudokuCell;
