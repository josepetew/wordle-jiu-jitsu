import { Fragment, useRef } from 'react'
import {
  Main,
  Header,
  SequenceContainer,
  Spacer,
  GameContainer,
  RoundsContainer,
} from './Game.styles'
import { useGame } from '@/hooks/useGame'
import { SequenceItem } from './shared/SequenceItem/SequenceItem'
import { Reorder } from 'framer-motion'
import { ResultModal } from './shared/ResultModal/ResultModal'
import { GameStatus } from '@/types/Game'

export const Game = () => {
  const scrollEnd = useRef<null | HTMLDivElement>(null)
  const {
    start,
    finish,
    submit,
    rounds,
    updateLastRoundSequence,
    attempts,
    isSubmitting,
    gameStatus,
  } = useGame()

  return (
    <>
      <Main>
        <Header>WORDLE JITSU</Header>
        {!rounds?.length && (
          <p>No game found, make django sure server is running</p>
        )}
        <Spacer />

        <pre>
          {attempts.count}/{attempts.max}
        </pre>

        <GameContainer>
          <RoundsContainer $nrOfItems={rounds.length + 1}>
            {rounds.length > 0 &&
              rounds.map((roundSequence, index) => (
                <SequenceContainer key={index} $index={index}>
                  <SequenceItem sequenceItem={start} isAtEdge />
                  <Spacer />
                  <Reorder.Group
                    values={roundSequence?.sequence}
                    onReorder={updateLastRoundSequence}
                  >
                    {roundSequence?.sequence.map(
                      (sequenceItem, sequenceItemIndex) => (
                        <Fragment key={`${sequenceItem.id}`}>
                          <SequenceItem
                            draggable={index === rounds.length - 1}
                            sequenceItem={sequenceItem}
                            sequenceItemIndex={sequenceItemIndex}
                          />
                          <Spacer />
                        </Fragment>
                      )
                    )}
                  </Reorder.Group>
                  <SequenceItem sequenceItem={finish} isAtEdge />
                </SequenceContainer>
              ))}

            <SequenceContainer>
              <div ref={scrollEnd}></div>
            </SequenceContainer>
          </RoundsContainer>
        </GameContainer>

        <button
          disabled={gameStatus !== GameStatus.PLAYING}
          onClick={() => {
            if (!isSubmitting) {
              submit().then(() => {
                scrollEnd?.current?.scrollIntoView({
                  behavior: 'smooth',
                })
              })
            }
          }}
        >
          Submit
        </button>
        <ResultModal />
      </Main>
    </>
  )
}
