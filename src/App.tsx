/**
 * Developed by Skillful Dev LLC
 * Contact: contact@skillfuldev.com
 * website: https://skillfuldev.com
 * Copyright 2022
 */
import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SnackbarProvider } from 'notistack'
import { AppNavigation } from './components/routes/navigation'
import 'moment/locale/es-mx'
import { theme } from './styles/theme'

// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
window.Buffer = window.Buffer || require('buffer').Buffer

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * (1000 * 60) // 2 min
    }
  }
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          autoHideDuration={5000}
        >
          <AppNavigation />
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </QueryClientProvider>
)

export default App
