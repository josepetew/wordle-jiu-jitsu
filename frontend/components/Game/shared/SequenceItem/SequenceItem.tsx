import { FC } from 'react'
import {
  SequenceItemContainer,
  StyledReorderItem,
  SequenceItemText,
} from './SequenceItem.styles'
import {
  SequenceItemStatus,
  SequenceItem as SequenceItemType,
} from '@/types/Game'
import { useMotionValue } from 'framer-motion'
import { useRaisedShadow } from '@/hooks/useRaisedShadow'
import { ReorderIcon } from './ReorderIcon'
interface SequenceItem {
  editable?: boolean
  draggable?: boolean
  isAtEdge?: boolean
  sequenceItemIndex?: number
  sequenceItem: SequenceItemType | null
}

export const SequenceItem: FC<SequenceItem> = ({
  sequenceItem,
  sequenceItemIndex,
  draggable = false,
  isAtEdge = false,
}) => {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)

  const comp = (
    <SequenceItemContainer $isAtEdge={isAtEdge} $status={sequenceItem?.status}>
      <SequenceItemText>
        {sequenceItem?.name} and a very loing text because it can be grewt
      </SequenceItemText>
      {draggable && (
        <ReorderIcon
          dark={sequenceItem?.status !== SequenceItemStatus.PRISTINE}
        />
      )}
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
