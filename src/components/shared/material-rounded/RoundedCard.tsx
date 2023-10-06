import { Card, CardProps, styled } from '@mui/material'

export const RoundedCard = (props: CardProps): JSX.Element => (
  <RoundedCardStyled
    {...props}
  />
)

const RoundedCardStyled = styled(Card)`
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(3,3,3,0.1);
  border: none;
`
