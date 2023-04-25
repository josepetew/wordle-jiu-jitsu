import { Fragment, useCallback, useEffect, useRef } from 'react'
import {
  Main,
  Header,
  SequenceContainer,
  Spacer,
  GameContainer,
  RoundsContainer,
  RoundCount,
  Subtitle,
  GameDetails,
  SubmitButton,
} from './Game.styles'
import { useGame } from '@/hooks/useGame'
import { SequenceItem } from './shared/SequenceItem/SequenceItem'
import { Reorder } from 'framer-motion'
import { ResultModal } from './shared/ResultModal/ResultModal'
import { GameStatus } from '@/types/Game'

export const Game = () => {
  const ref = useRef<null | HTMLDivElement>(null)
  const {
    start,
    finish,
    submit,
    rounds,
    attempts,
    isSubmitting,
    reorder,
    gameStatus,
  } = useGame()

  useEffect(() => {
    scrollToEnd()
  }, [rounds])

  const scrollToEnd = useCallback(() => {
    if (ref.current) {
      const scrollEnd = ref.current.scrollWidth - ref.current.clientWidth
      ref.current.scroll({
        left: scrollEnd,
        behavior: 'smooth',
      })
    }
  }, [ref])

  return (
    <>
      <Main>
        <GameContainer>
          <Header>WORDLE JITSU</Header>
          <GameDetails>
            <Subtitle>Arrange the sequence in the correct order</Subtitle>
            <RoundCount>
              {attempts.count} / {attempts.max}
            </RoundCount>
          </GameDetails>

          <RoundsContainer ref={ref} $nrOfItems={rounds.length + 1}>
            {rounds.length > 0 &&
              rounds.map((roundSequence, index) => (
                <SequenceContainer key={index} $index={index}>
                  <SequenceItem sequenceItem={start} isAtEdge />
                  <Spacer />
                  <Reorder.Group
                    values={roundSequence?.sequence}
                    onReorder={reorder}
                  >
                    {roundSequence?.sequence.map(
                      (sequenceItem, sequenceItemIndex) => {
                        const isLastCard = index === rounds.length - 1
                        return (
                          <Fragment key={`${sequenceItem.id}`}>
                            <SequenceItem
                              draggable={isLastCard}
                              sequenceItem={sequenceItem}
                              sequenceItemIndex={sequenceItemIndex}
                            />
                            <Spacer />
                          </Fragment>
                        )
                      }
                    )}
                  </Reorder.Group>
                  <SequenceItem sequenceItem={finish} isAtEdge />
                </SequenceContainer>
              ))}
          </RoundsContainer>
          <Spacer />
          <Spacer />
          <SubmitButton
            disabled={isSubmitting}
            onClick={() => {
              if (!isSubmitting) {
                submit()
              }
            }}
          >
            {gameStatus === GameStatus.PLAYING && 'SUBMIT'}
            {gameStatus !== GameStatus.PLAYING && 'SEE RESULTS'}
          </SubmitButton>
        </GameContainer>
        <ResultModal />
      </Main>
    </>
  )
}
