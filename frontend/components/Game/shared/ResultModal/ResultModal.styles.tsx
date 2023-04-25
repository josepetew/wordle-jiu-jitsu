import Modal from 'styled-react-modal'
import styled from 'styled-components'

export const StyledModal = Modal.styled`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #231c1a;
  padding: 48px 64px;
  border-radius: 8px;
`

export const Result = styled.div`
  white-space: pre-line;
  text-align: center;
  font-family: var(--catamaran-font);
  color: #8b6f67;
  font-size: 1.2rem;
  font-weight: 500;
`

export const ResultTitle = styled.h2`
  text-align: center;
  font-family: var(--sedgwick-ave-display-font);
  color: #8b6f67;
  font-size: 3rem;
`

export const TweetItAnchor = styled.a`
  text-align: center;
  font-family: var(--catamaran-font);
  color: white;
  opcity: 0.8;
  font-size: 1.3rem;
  color: #8b6f67;
  :hover {
    text-decoration: underline;
  }
`

export const CopyButton = styled.button`
border: none;
margin: 0;
font-size: inherit;
cursor: pointer;
outline: none;
text-transform: uppercase;
white-space: nowrap;

padding: 8px 12px;
font-family: var(--sedgwick-ave-display-font);
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

export const Spacer = styled.div`
  height: 12px;
`
