import { useContext } from 'react'
import { GameContext } from '@/providers/GameProvider/GameProvider'
import { IGameContext } from '@/types/Game'

export const useGame = () => {
  return useContext(GameContext) as IGameContext
}
