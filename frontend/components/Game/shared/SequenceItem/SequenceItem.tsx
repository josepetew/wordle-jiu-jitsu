import { FC } from 'react'
import { SequenceItemContainer, StyledReorderItem } from './SequenceItem.styles'
import { SequenceItem as SequenceItemType } from '@/types/Game'
import { useGame } from '@/hooks/useGame'
import { Reorder, useMotionValue, useDragControls } from 'framer-motion'
import { useRaisedShadow } from '@/hooks/useRaisedShadow'

interface SequenceItem {
  editable?: boolean
  draggable?: boolean
  isAtEdge?: boolean
  sequenceItemIndex?: number
  sequenceItem: SequenceItemType | null
}

export const SequenceItem: FC<SequenceItem> = ({
  editable = false,
  sequenceItem,
  sequenceItemIndex,
  draggable = false,
  isAtEdge = false,
}) => {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)

  const comp = (
    <SequenceItemContainer $isAtEdge={isAtEdge} $status={sequenceItem?.status}>
      {sequenceItem?.name}
    </SequenceItemContainer>
  )

  if (draggable) {
    return (
      <StyledReorderItem
        id={`${sequenceItemIndex}`}
        value={sequenceItem}
        style={{ boxShadow, y }}
      >
        {comp}
      </StyledReorderItem>
    )
  }
  return comp
}
