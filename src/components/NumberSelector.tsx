import React from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Button,
    Typography,
} from '@mui/material';
import { colorMap, hardColorMap } from '../enum/sudoku';

interface NumberSelectorProps {
    open: boolean;
    onClose: () => void;
    onNumberSelect: (number: number) => void;
    isColorMode: boolean;
    currentDifficulty: 'iniciante' | 'intermediario' | 'avancado' | 'hardcore';
}

const NumberSelector: React.FC<NumberSelectorProps> = ({
    open,
    onClose,
    onNumberSelect,
    isColorMode,
    currentDifficulty,
}) => {
    const handleNumberClick = (number: number) => {
        onNumberSelect(number);
    };

    const getCurrentColorMap = () => {
        return currentDifficulty === 'hardcore' ? hardColorMap : colorMap;
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
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
                        variant="h6"
                        sx={{
                            color: '#e0e0e0',
                            marginBottom: 1,
                        }}
                    >
                        {isColorMode ? 'Escolha uma cor' : 'Escolha um número'}
                    </Typography>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 1,
                            width: '100%',
                            maxWidth: '200px',
                        }}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                            <Button
                                key={number}
                                variant="outlined"
                                onClick={() => handleNumberClick(number)}
                                sx={{
                                    width: '60px',
                                    height: '60px',
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    color: isColorMode ? '#000000' : '#e0e0e0',
                                    borderColor: '#404040',
                                    backgroundColor: isColorMode ? getCurrentColorMap()[number] : '#2d2d2d',
                                    '&:hover': {
                                        backgroundColor: isColorMode ? getCurrentColorMap()[number] + 'CC' : '#404040',
                                        borderColor: '#606060',
                                    },
                                    '&:active': {
                                        transform: 'scale(0.95)',
                                    },
                                }}
                            >
                                {isColorMode ? '' : number}
                            </Button>
                        ))}
                    </Box>

                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            marginTop: 2,
                            color: '#b0b0b0',
                            borderColor: '#404040',
                            '&:hover': {
                                backgroundColor: '#404040',
                                borderColor: '#606060',
                            },
                        }}
                    >
                        Cancelar
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default NumberSelector;
