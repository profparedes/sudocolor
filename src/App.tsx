import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Typography, Container } from '@mui/material';
import SudokuBoard from './components/SudokuBoard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a1a1a',
      paper: '#2d2d2d',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
    },
    primary: {
      main: '#e0e0e0',
    },
    error: {
      main: '#ff6b6b',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#e0e0e0',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#1a1a1a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: '3rem',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #FFD1DC 0%, #FFCBA4 12.5%, #FFFACD 25%, #A7E8BD 37.5%, #c05234 50%, #DDA0DD 62.5%, #AEC6CF 75%, #9999FF 87.5%, #FF9999 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 3s ease-in-out infinite',
              '@keyframes gradientShift': {
                '0%, 100%': {
                  backgroundPosition: '0% 50%',
                },
                '50%': {
                  backgroundPosition: '100% 50%',
                },
              },
            }}
          >
            SudoCor
          </Typography>
          <SudokuBoard />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
