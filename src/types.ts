export type TValue = 'X' | 'O' | null;

export type boardState = TValue[];

export interface PlayerNames {
  player1: string,
  player2: string,
}

export interface IWinner {
  sign: TValue,
  set: number[]
}