# SudoColor 🎨

A unique and colorful Sudoku game built with React and TypeScript, featuring a beautiful dark theme and an innovative color-based gameplay mode.

## ✨ Features

### 🎮 Game Modes
- **SudoColor Mode**: Play Sudoku using 9 beautiful colors instead of numbers
- **Traditional Mode**: Classic Sudoku with numbers 1-9
- **Seamless Switching**: Toggle between modes at any time

###  Difficulty Levels
- **Beginner**: 56 pre-filled cells (25 removed)
- **Intermediate**: 46 pre-filled cells (35 removed) 
- **Advanced**: 36 pre-filled cells (45 removed)

### 🎨 Color Palette
The game features 9 carefully selected colors:
- `#FFD1DC` - Light Pink
- `#FFCBA4` - Peach
- `#FFFACD` - Light Yellow
- `#A7E8BD` - Light Green
- `#c05234` - Brown
- `#DDA0DD` - Lavender
- `#AEC6CF` - Light Blue
- `#9999FF` - Blue
- `#FF9999` - Pink

###  Game Features
- **Real-time Validation**: Invalid moves are highlighted in red
- **Timer**: Track your solving time
- **Victory Celebration**: Congratulations modal with completion time
- **Responsive Design**: Works perfectly on desktop and mobile
- **Visual Feedback**: Smooth animations and hover effects

## ️ Technologies Used

- **React 19.1.1** - Modern React with hooks
- **TypeScript 5.8.3** - Type-safe development
- **Material-UI 7.3.1** - Beautiful UI components
- **Vite 7.1.2** - Fast build tool and dev server
- **Emotion** - CSS-in-JS styling

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sudocolor.git
   cd sudocolor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start playing!

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

##  How to Play

### SudoColor Mode
1. Click on any empty cell to open the color selector
2. Choose one of the 9 available colors
3. Fill the grid so that no color repeats in any row, column, or 3x3 box
4. Complete the puzzle to see your victory time!

### Traditional Mode
1. Click on any empty cell to open the number selector
2. Choose a number from 1-9
3. Fill the grid following classic Sudoku rules
4. Complete the puzzle to celebrate your victory!

### Switching Modes
- Click the "TRADICIONAL" button to switch to number mode
- Click the "SUDOCOLOR" button to switch to color mode
- The game will reset with a new puzzle when switching modes

## 📁 Project Structure

```
src/
├── components/
│   ├── SudokuBoard.tsx      # Main game component
│   ├── SudokuCell.tsx       # Individual cell component
│   └── NumberSelector.tsx   # Color/number selection modal
├── utils/
│   └── sudokuGenerator.ts   # Game logic and color mapping
├── App.tsx                  # Main app component
└── main.tsx                 # App entry point
```

This comprehensive README includes:

✅ **Project Overview**: Clear description of what SudoColor is
✅ **Features List**: All the game modes and features
✅ **Technology Stack**: Complete list of technologies used
✅ **Installation Guide**: Step-by-step setup instructions
✅ **How to Play**: Instructions for both game modes
✅ **Project Structure**: File organization
✅ **Customization Guide**: How to modify colors and difficulty
✅ **Contributing Guidelines**: How others can contribute
✅ **Professional Formatting**: Emojis and clear sections

You can copy this content and paste it into your `README.md` file! 🎉

##  Customization

### Changing Colors
To modify the color palette, edit the `colorMap` in `src/utils/sudokuGenerator.ts`:

```typescript
export const colorMap: { [key: number]: string } = {
  1: '#FFD1DC', // Light Pink
  2: '#FFCBA4', // Peach
  // ... add your custom colors
};
```

### Adjusting Difficulty
Modify the `cellsToRemove` values in the `removeNumbers` function:

```typescript
const cellsToRemove = {
  iniciante: 25,    // Beginner
  intermediario: 35, // Intermediate
  avancado: 45      // Advanced
}[difficulty];
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- Inspired by classic Sudoku puzzles
- Built with modern React and TypeScript
- Styled with Material-UI components
- Color palette carefully selected for accessibility

---

**Enjoy playing SudoColor!** 🌈✨
