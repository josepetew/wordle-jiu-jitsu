import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react'
import {
  IGameContext,
  SequenceItemStatus,
  Rounds,
  SequenceResponse,
  SequenceItem,
  RoundState,
  ResultModal,
  GameStatus,
  Attempts,
} from '@/types/Game'
import useSWRImmutable from 'swr/immutable'
import { api } from '@/api'

const MAX_ATTEMPS = 7

export const GameContext = createContext<IGameContext | null>({
  start: null,
  finish: null,
  rounds: [],
  setSequenceItem: () => {},
  setResultModal: () => {},
  submit: async () => {},
  resultModal: { isOpen: false },
  reorder: () => {},
  gameStatus: GameStatus.PLAYING,
  isSubmitting: false,
  attempts: { max: MAX_ATTEMPS, count: 1 },
})

const getGameStatus = (rounds: Rounds) => {
  const lastRound = rounds[rounds.length - 1]
  const isGameFinished = rounds.length === MAX_ATTEMPS

  if (lastRound?.isWin) {
    return GameStatus.WON
  }
  if (isGameFinished) {
    if (!lastRound?.isWin) {
      return GameStatus.LOST
    }
  }
  return GameStatus.PLAYING
}

const GameProvider: FC<PropsWithChildren> = ({ children }) => {
  const [rounds, setRounds] = useState<Rounds>([])
  const [isSubmitting, setIsSumbitting] = useState(false)
  const [roundState, setRoundState] = useState<RoundState>({})
  const [sequenceData, setSequenceData] = useState<SequenceResponse>()
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    getGameStatus(rounds)
  )
  const [resultModal, setResultModal] = useState<ResultModal>({
    isOpen: false,
  })
  const [attempts, setAttempts] = useState<Attempts>({
    max: MAX_ATTEMPS,
    count: 1,
  })

  const { data, error } = useSWRImmutable<SequenceResponse>(`/sequence`)

  useEffect(() => {
    if (data && !sequenceData) {
      setSequenceData(data)

      const round = {
        sequence: data.sequence_to_fill.map((i) => ({
          ...i,
          status: SequenceItemStatus.PRISTINE,
        })),
      }

      setRounds([round])
      setRoundState(roundState)
    }
  }, [data])

  const setSequenceItem = (index: number, value: SequenceItem | null) => {
    setRoundState({ ...roundState, [index]: value })
  }

  const updateLastRoundSequence = (sequence: SequenceItem[]) => {
    rounds.pop()
    const isWin = sequence.every(
      (item) => item.status === SequenceItemStatus.CORRECT
    )

    const withCorrectIndex = sequence.map((item, index) => ({
      ...item,
      correctIndex: item.status === SequenceItemStatus.CORRECT ? index : null,
    }))

    const updatedRounds = [
      ...rounds,
      {
        isWin,
        sequence: withCorrectIndex,
      },
    ]
    setRounds(updatedRounds)

    return updatedRounds
  }

  const reorder = (sequence: SequenceItem[]) => {
    rounds.pop()
    const isFirstRound = rounds.length < 1

    const validatedSequence = sequence.map((item, index) => ({
      ...item,
      status:
        item.correctIndex === index
          ? SequenceItemStatus.CORRECT
          : isFirstRound
          ? SequenceItemStatus.PRISTINE
          : SequenceItemStatus.MISSPLACED,
    }))

    const updatedRounds = [...rounds, { sequence: validatedSequence }]

    setRounds(updatedRounds)
  }

  const submit = async () => {
    setIsSumbitting(true)

    return new Promise(async (resolve, reject) => {
      const lastRound = rounds.at(-1)
      try {
        const result = await api
          .post<SequenceItem[]>(
            '/validateSequence',
            lastRound?.sequence.map((item) => ({
              id: item.id,
              name: item.name,
            }))
          )
          .then((res) => res.data)

        const updatedRounds = updateLastRoundSequence(result)
        const gameStatus = getGameStatus(updatedRounds)
        setGameStatus(gameStatus)

        if (gameStatus === GameStatus.WON) {
          setResultModal({ isOpen: true })
          setIsSumbitting(false)
          resolve(true)
          return
        }

        if (gameStatus === GameStatus.LOST) {
          setResultModal({ isOpen: true })
          setIsSumbitting(false)
          resolve(true)
          return
        }

        setAttempts({ ...attempts, count: attempts.count + 1 })
        setRounds(updatedRounds)

        setTimeout(() => {
          const copyRound = updatedRounds[updatedRounds.length - 1]
          setRounds([...updatedRounds, copyRound]) // add new card
          resolve(true)
          setIsSumbitting(false)
        }, 500) // Wait before sliding next card in
      } catch (error) {
        setIsSumbitting(false)
        reject()
      }
    })
  }

  return (
    <GameContext.Provider
      value={{
        start: data?.start ?? null,
        finish: data?.finish ?? null,
        rounds: rounds ?? null,
        resultModal,
        setSequenceItem,
        setResultModal,
        submit,
        reorder,
        attempts,
        gameStatus,
        isSubmitting,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
