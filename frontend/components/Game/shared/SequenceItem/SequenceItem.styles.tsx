import styled, { css } from 'styled-components'
import { SequenceItemStatus } from '@/types/Game'
import { Reorder } from 'framer-motion'

export const SequenceItemContainer = styled.div<{
  $isAtEdge: boolean
  $status?: SequenceItemStatus | null
}>(
  ({ $isAtEdge, $status }) => css`
    width: 100%;
    height: 50px;
    background: ${(() => {
      if ($isAtEdge) {
        return 'gray'
      }
      switch ($status) {
        case SequenceItemStatus.CORRECT:
          return 'green'
        case SequenceItemStatus.MISSPLACED:
          return 'orange'
        case SequenceItemStatus.INVALID:
          return '#b5b5b5'
        default:
          return '#b5b5b5'
      }
    })()};
    display: flex;
    align-items: center;
    justify-content: center;
  `
)

export const StyledReorderItem = styled(Reorder.Item)`
  cursor: grab;
  list-style: none;
`
