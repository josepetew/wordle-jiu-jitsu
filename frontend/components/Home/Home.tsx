import {
  Main,
  Header,
  SequenceContainer,
  SequenceItem,
  Spacer,
  SelectSequenceItem,
} from './Home.styles'
import { useGame } from '@/hooks/useGame'

export const Home = () => {
  const {
    start,
    finish,
    previousRounds,
    currentRoundSequence,
    availableSequenceItems,
    setSequenceItem,
  } = useGame()

  return (
    <>
      <Main>
        <Header>WORDLE JITSU</Header>
        <Spacer />
        {!currentRoundSequence && (
          // We will remove this later, user doesn't have to see it.
          <p>No game found, make sure django server is running</p>
        )}
        {currentRoundSequence && (
          <SequenceContainer>
            <SequenceItem>{start}</SequenceItem>
            <Spacer />
            {currentRoundSequence?.map((sequenceItem, sequenceItemIndex) => (
              <>
                <SequenceItem>
                  {!sequenceItem.value && (
                    <SelectSequenceItem
                      value={sequenceItem.value ?? ''}
                      onChange={(e) => {
                        const value = e.target.value
                        const [index, sequenceItemValue] = value.split(':')

                        const sequenceItem = availableSequenceItems.find(
                          (item) => item.value === sequenceItemValue
                        )
                        if (sequenceItem) {
                          setSequenceItem(+index, sequenceItem)
                        }
                      }}
                    >
                      <option disabled value="">
                        Select step
                      </option>
                      {[sequenceItem, ...availableSequenceItems]
                        .filter((i) => Boolean(i.value))
                        .map((item, index) => (
                          <option
                            value={`${sequenceItemIndex}:${item.value}` ?? ''}
                          >
                            {item.label}
                          </option>
                        ))}
                    </SelectSequenceItem>
                  )}

                  {sequenceItem.value && <span>{sequenceItem.label}</span>}
                </SequenceItem>
                <Spacer />
              </>
            ))}
            <SequenceItem>{finish}</SequenceItem>
          </SequenceContainer>
        )}
      </Main>
    </>
  )
}
