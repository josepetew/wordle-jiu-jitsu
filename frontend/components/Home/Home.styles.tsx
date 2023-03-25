import styled from 'styled-components'

export const Main = styled.main`
  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
`

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;

  font-weight: 700;
  font-size: 3.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`

export const SequenceContainer = styled.section`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

export const SequenceItem = styled.div`
  width: 100%;
  height: 50px;
  background: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SelectSequenceItem = styled.select``

export const Spacer = styled.div`
  height: 10px;
  width: 10px;
`
