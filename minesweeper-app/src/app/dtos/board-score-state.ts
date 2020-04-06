export interface BoardScoreState {
  availableMarks: number;

  installedMines: number;

  numberOfOpenMines: number;

  playing: boolean;

  lose: boolean;

  win: boolean;
}
