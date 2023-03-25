export enum SequenceItemStatus {
  CORRECT = 'CORRECT',
  MISSPLACED = 'MISSPLACED',
  INVALID = 'INVALID',
}

export interface SequenceResponse {
  true_sequence: string[]
  sequence_to_fill: string[]
  start: string
  finish: string
}

export interface SequenceItem {
  value: string | null
  label: string | null
  status?: SequenceItemStatus
}

export type CurrentRoundSequence = SequenceItem[]
export type PreviousRoundsSequence = SequenceItem[][]
export type RoundState = { [key: number]: SequenceItem }

export type IGameContext = {
  start?: string
  finish?: string
  previousRounds?: PreviousRoundsSequence
  currentRoundSequence?: CurrentRoundSequence
  availableSequenceItems: SequenceItem[]
  setSequenceItem: (index: number, value: SequenceItem) => void
}
