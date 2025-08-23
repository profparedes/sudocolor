// Tipos
export type CellValue = number | null;
export type SudokuGrid = CellValue[][];

export const colorMap: { [key: number]: string } = {
  1: '#FFD1DC',
  2: '#FFCBA4',
  3: '#FFFACD',
  4: '#A7E8BD',
  5: '#c05234',
  6: '#DDA0DD',
  7: '#AEC6CF',
  8: '#9999FF',
  9: '#FF9999',
};

export const hardColorMap: { [key: number]: string } = {
  1: '#4DD9A6',
  2: '#42C6A3',
  3: '#39B3A4',
  4: '#329FA9',
  5: '#2F8BAF',
  6: '#2E78B2',
  7: '#3165B4',
  8: '#3553B6',
  9: '#3942B8',
};