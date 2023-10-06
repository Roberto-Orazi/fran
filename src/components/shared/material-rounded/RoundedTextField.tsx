import { TextField, TextFieldProps, styled } from '@mui/material'
import { DEFAULT_SHADOW } from '../../../styles/theme'

export const RoundedTextField = (props: TextFieldProps): JSX.Element => (
  <RoundedTextFieldStyled
    fullWidth
    size="small"
    sx={{
      '& fieldset': { border: 'none' }
    }}
    {...props}
  />
)

const RoundedTextFieldStyled = styled(TextField)`
  border-radius: 10px;
  box-shadow: ${DEFAULT_SHADOW};
  border: none;
`
