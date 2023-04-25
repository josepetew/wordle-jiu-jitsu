export enum SequenceItemStatus {
  CORRECT = 'CORRECT',
  MISSPLACED = 'MISSPLACED',
  PRISTINE = 'PRISTINE',
}

export interface SequenceItem {
  name: string | null
  id: number | null
  status: SequenceItemStatus | null
  correctIndex?: number | null
}

export enum GameStatus {
  WON = 'WON',
  LOST = 'LOST',
  PLAYING = 'PLAYING',
}

export interface SequenceResponse {
  true_sequence: SequenceItem[]
  sequence_to_fill: SequenceItem[]
  start: SequenceItem
  finish: SequenceItem
}

export interface Round {
  sequence: SequenceItem[]
  isWin?: boolean
}
export type Rounds = Round[]
export type RoundState = { [key: number]: SequenceItem | null }

export interface ResultModal {
  isOpen: boolean
}

export interface Attempts {
  max: number
  count: number
}

export type IGameContext = {
  start: SequenceItem | null
  finish: SequenceItem | null
  rounds: Rounds
  reorder: (sequence: SequenceItem[]) => void
  setSequenceItem: (index: number, value: SequenceItem | null) => void
  submit: () => Promise<unknown>
  setResultModal: (modal: ResultModal) => void
  resultModal: ResultModal
  attempts: Attempts
  gameStatus: GameStatus
  isSubmitting: boolean
}
