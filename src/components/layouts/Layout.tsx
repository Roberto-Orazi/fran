import { Box, Container, CssBaseline } from '@mui/material'
import Navbar from './Navbar'

interface Props {
  children: any
}

export const Layout = (props: Props) => (
  <Box>
    <CssBaseline />
    <Navbar />
    <Container maxWidth='sm'>
      <Box marginTop={'5rem'}>
        {props.children}
      </Box>
    </Container>
  </Box>
)
