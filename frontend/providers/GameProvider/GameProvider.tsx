// context/todoContext.tsx
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  IGameContext,
  SequenceItemStatus,
  SequenceResponse,
  SequenceItem,
  CurrentRoundSequence,
  PreviousRoundsSequence,
  RoundState,
} from '@/types/Game'
import useSWRImmutable from 'swr/immutable'

export const GameContext = createContext<IGameContext | null>(null)

const MAX_ATTEMPS = 7

const GameProvider: FC<PropsWithChildren> = ({ children }) => {
  const [nrOfAttempts, setNrOfAttempts] = useState(0)
  const [previousRounds, setPreviousRounds] = useState<PreviousRoundsSequence>()
  const [roundState, setRoundState] = useState<RoundState>()
  const [sequenceData, setSequenceData] = useState<SequenceResponse>()

  const currentRoundSequence =
    roundState &&
    (Object.keys(roundState).map(
      (item, key) => roundState[key]
    ) as CurrentRoundSequence)

  const { data, error } = useSWRImmutable<SequenceResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/sequence`
  )

  useEffect(() => {
    if (data && !sequenceData) {
      setSequenceData(data)

      const roundState = data.sequence_to_fill.reduce<RoundState>(
        (agg, value, index) => {
          agg[index] = { value: null, label: null }
          return agg
        },
        {}
      )

      setRoundState(roundState)
    }
  }, [data])

  const setSequenceItem = (index: number, value: SequenceItem) => {
    setRoundState({ ...roundState, [index]: value })
  }

  const availableSequenceItems =
    data?.sequence_to_fill
      .filter(
        (item) => !currentRoundSequence?.map((i) => i.value).includes(item)
      )
      .map((value) => ({ label: value, value: value } as SequenceItem)) ?? []

  return (
    <GameContext.Provider
      value={{
        start: data?.start,
        finish: data?.finish,
        previousRounds: previousRounds,
        currentRoundSequence: currentRoundSequence,
        availableSequenceItems,
        setSequenceItem,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
