import styled, { css } from 'styled-components'
import Modal from 'styled-react-modal'

export const Main = styled.main`
  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-weight: 700;
  font-size: 3.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`
export const GameContainer = styled.div``

export const RoundsContainer = styled.div<{ $nrOfItems: number }>(
  ({ $nrOfItems }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: flex-start;
    overflow: scroll;
    width: ${390 + $nrOfItems * 10}px;
  `
)

export const SequenceContainer = styled.div<{ $index?: number }>(
  ({ $index = 0 }) => css`
    display: flex;
    flex-direction: column;
    width: 400px;
    flex-shrink: 0;
    position: sticky;
    background: red;

    box-shadow: -5px -5px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
    color: #333;
    left: 0;

    transform: translateX(${$index * 10}px);
  `
)

export const Spacer = styled.div`
  height: 10px;
  width: 10px;
`

export const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`
