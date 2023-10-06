import { PersonPin } from '@mui/icons-material'
import React from 'react'

interface Props {
  lat: number
  lng: number
  payload?: any
  onClick: (obj: any) => void
}

const Marker = (props: Props) => (
  // <IconWrapper>
  <PersonPin
    fontSize="large"
    color="secondary"
    onClick={props.onClick}
  />
  // </IconWrapper>
)

export default Marker
