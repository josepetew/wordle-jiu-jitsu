import { FC } from 'react'
import { StyledModal } from './ResultModal.styles'
import { useGame } from '@/hooks/useGame'
import { GameStatus } from '@/types/Game'

export const ResultModal: FC = () => {
  const { setResultModal, resultModal, gameStatus } = useGame()

  const handleToggleModal = () => {
    setResultModal({ isOpen: !resultModal.isOpen })
  }

  return (
    <StyledModal
      isOpen={resultModal.isOpen}
      onBackgroundClick={handleToggleModal}
      onEscapeKeydown={handleToggleModal}
    >
      {gameStatus === GameStatus.WON && 'You won!'}
      {gameStatus === GameStatus.LOST && 'You lost!'}
    </StyledModal>
  )
}
