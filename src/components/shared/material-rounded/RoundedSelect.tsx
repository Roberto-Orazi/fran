import {
  FormControl, InputLabel, Select, SelectProps, styled
} from '@mui/material'
import { DEFAULT_SHADOW } from '../../../styles/theme'

type RoundedSelect = (<T>(props: SelectProps<T>) => JSX.Element)

export const RoundedSelect: RoundedSelect = (props) => (
  <RoundedSelectStyled
    fullWidth
    size="small"
    sx={{
      '& fieldset': { border: 'none' }
    }}>
    <InputLabel>{props.label}</InputLabel>
    <Select {...props}>
      {props.children}
    </Select>
  </RoundedSelectStyled>
)

const RoundedSelectStyled = styled(FormControl)`
  border-radius: 10px;
  box-shadow: ${DEFAULT_SHADOW};
  border: none;
`
