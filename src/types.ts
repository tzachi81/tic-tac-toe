export type TPlayer = 'X' | 'O' | null;

export type boardState = TPlayer[];

export interface PlayerNames {
  player1: string,
  player2: string,
}

export interface IWinner {
  sign: TPlayer,
  set: number[]
}