import styled, { css } from 'styled-components'
import { SequenceItemStatus } from '@/types/Game'
import { Reorder } from 'framer-motion'

export const SequenceItemContainer = styled.div<{
  $isAtEdge: boolean
  $status?: SequenceItemStatus | null
}>(
  ({ $isAtEdge, $status }) => css`
    background: ${(() => {
      switch ($status) {
        case SequenceItemStatus.CORRECT:
          return '#139A43'
        case SequenceItemStatus.MISSPLACED:
          return '#FFA630'
        default:
          return '#634942'
      }
    })()};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    padding: 12px;
    color: ${$status === SequenceItemStatus.PRISTINE || $isAtEdge
      ? 'white'
      : 'black'};
    ${$isAtEdge &&
    css`
      opacity: 0.5;
    `}
  `
)

export const StyledReorderItem = styled(Reorder.Item)`
  cursor: grab;
  list-style: none;
`
export const SequenceItemText = styled.span`
  width: calc(100% - 30px);
  text-align: center;
  font-family: var(--catamaran-font);
  opacity: 0.7;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
`
