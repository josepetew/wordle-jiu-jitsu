export enum SequenceItemStatus {
  CORRECT = 'CORRECT',
  MISSPLACED = 'MISSPLACED',
  INVALID = 'INVALID',
  PRISTINE = 'PRISTINE',
}

export interface SequenceItem {
  name: string | null
  id: number | null
  status: SequenceItemStatus | null
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
  message?: string
}

export interface Attempts {
  max: number
  count: number
}

export type IGameContext = {
  start: SequenceItem | null
  finish: SequenceItem | null
  rounds: Rounds
  updateLastRoundSequence: (sequence: SequenceItem[]) => Rounds | undefined
  setSequenceItem: (index: number, value: SequenceItem | null) => void
  submit: () => Promise<unknown>
  setResultModal: (modal: ResultModal) => void
  resultModal: ResultModal
  attempts: Attempts
  gameStatus: GameStatus
  isSubmitting: boolean
}
