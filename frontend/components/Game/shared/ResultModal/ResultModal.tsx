import { FC, useState } from 'react'
import {
  StyledModal,
  Result,
  ResultTitle,
  TweetItAnchor,
  CopyButton,
  Spacer,
} from './ResultModal.styles'
import { useGame } from '@/hooks/useGame'
import { GameStatus, SequenceItemStatus } from '@/types/Game'

const getDayOfYear = (): number => {
  const now: Date = new Date()
  const start: Date = new Date(now.getFullYear(), 0, 0)
  const diff: number = now.getTime() - start.getTime()
  const oneDay: number = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export const ResultModal: FC = () => {
  const { setResultModal, resultModal, attempts, rounds, gameStatus } =
    useGame()

  const [isSharedFromClipboard, setIsSharedFromClipboard] = useState(false)

  const handleToggleModal = () => {
    setResultModal({ isOpen: !resultModal.isOpen })
  }

  const getResultString = () => {
    return rounds.reduce((agg, item) => {
      const roundResult = item.sequence.reduce((agg, item) => {
        if (item.status === SequenceItemStatus.CORRECT) {
          agg += '🟩'
        } else if (item.status === SequenceItemStatus.MISSPLACED) {
          agg += '🟨'
        } else {
          agg += '⬛️'
        }
        return agg
      }, '')

      agg += roundResult + '\n'
      return agg
    }, '')
  }

  const getTweetUrl = () => {
    const encodedText = encodeURIComponent(getShareText() + '\n')
    return `https://twitter.com/intent/tweet?text=${encodedText}&url=https%3A%2F%2Fwordlejitsu.com`
  }

  const getShareText = () => {
    let shareText = `Wordle Jitsu ${getDayOfYear()} 🤙 \n${attempts.count} / ${
      attempts.max
    } \n${getResultString()}
  `
    return shareText
  }

  const handleShareFromClipboard = () => {
    let shareText = getShareText()
    navigator.clipboard.writeText(shareText)
    setIsSharedFromClipboard(true)
  }

  return (
    <StyledModal
      isOpen={resultModal.isOpen}
      onBackgroundClick={handleToggleModal}
      onEscapeKeydown={handleToggleModal}
    >
      {gameStatus === GameStatus.WON && <ResultTitle>Well done!</ResultTitle>}
      {gameStatus === GameStatus.LOST && <ResultTitle>Almost...</ResultTitle>}
      <Result>
        <p>Wordle Jitsu {getDayOfYear()} 🤙</p>
        <p>
          {attempts.count} / {attempts.max}
        </p>
        <p>{getResultString()}</p>
      </Result>
      <Spacer />
      <TweetItAnchor target="_blank" href={getTweetUrl()}>
        Tweet it!
      </TweetItAnchor>

      <Spacer />
      <CopyButton onClick={handleShareFromClipboard}>
        {isSharedFromClipboard ? 'Copied!' : 'Copy to clipboard'}
      </CopyButton>
    </StyledModal>
  )
}
