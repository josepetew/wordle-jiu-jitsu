import styled, { css } from 'styled-components'
import Modal from 'styled-react-modal'
import { up, down, between, only, createTheme } from 'styled-breakpoints'

export const Main = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`

export const Header = styled.h1`
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 2rem;
  font-family: var(--sedgwick-ave-display-font);
  color: #8b6f67;

  

  ${up('mobile')} {
    font-size: 3.6rem;
    margin-top: 32px;
    margin-bottom: 24px;
  }
}
`
export const GameContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${up('mobile')} {
    max-width: 576px;
  }
`

export const RoundsContainer = styled.div<{ $nrOfItems: number }>(
  ({ $nrOfItems }) => css`
    position: relative;
    display: flex;
    overflow: auto;
    width: 100%;
  `
)

export const SequenceContainer = styled.div<{ $index?: number }>(
  ({ $index = 0 }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-shrink: 0;
    position: sticky;

    left: 0;
    width: calc(100% - ${$index * 10}px);
    transform: translateX(${$index * 10}px);

    &:before {
      content: '';
      background: #231c1a;
      height: 100%;
      width: 100%;
      z-index: -2;
      transform: translateX(-10px);
      left: 0;
      position: absolute;
      filter: blur(10px);
    }

    &:after {
      content: '';
      background: #231c1a;
      height: 100%;
      width: 80%;
      z-index: -1;
      right: 0;
      position: absolute;
    }
  `
)

export const Spacer = styled.div`
  height: 12px;
`

export const RoundCount = styled.div`
  font-family: var(--sedgwick-ave-display-font);
  color: #8b6f67;
  font-size: 1rem;

  ${up('mobile')} {
    font-size: 1.4rem;
  }
`

export const Subtitle = styled.div`
  font-size: 1rem;
  font-family: var(--catamaran-font);
  color: #8b6f67;
  text-align: center;

  ${up('mobile')} {
    font-size: 1.2rem;
    text-align: left;
  }
`

export const GameDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  ${up('mobile')} {
    margin-bottom: 4px;
    max-width: 576px;
    flex-direction: row;
    gap: 4px;
  }
`

export const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`

export const SubmitButton = styled.button(
  () => css`
  border: none;
  margin: 0;
  font-size: inherit;
  cursor: pointer;
  outline: none;

  padding: 16px 24px;
  width: 50%;
  font-family: var(--sedgwick-ave-display-font);
  font-size: 1.2rem;
  background: #be4521;
  border-radius: 8px;
  color: white;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #d55935;
    opacity: 0.9
    cursor: pointer;
  }
`
)
