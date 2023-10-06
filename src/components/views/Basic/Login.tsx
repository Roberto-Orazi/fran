import React, { useEffect } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography
} from '@mui/material'
import { Formik } from 'formik'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import { RoundedTextField } from '../../shared/material-rounded/RoundedTextField'
import { LoginDto } from '../../../validations/basic/auth.dto'
import createValidator from '../../../utils/class-validator-formik'
import AuthService from '../../../services/basics/auth.service'
import { getCredentials, setCredentials } from '../../../utils/credentials.helper'
import { ELinks } from '../../routes/links'

const initialValues: LoginDto = {
  email: '',
  password: '',
}

const Login = () => {
  const validate = createValidator(LoginDto)
  const history = useHistory()

  useEffect(() => {
    const credentials = getCredentials()
    if (credentials) {
      goToDashboard()
    }
  }, [])

  const loginMutation = useMutation(AuthService.login, {
    onSuccess: ({ data }) => {
      setCredentials(data)
      goToDashboard()
    }
  })
  const goToDashboard = () => history.replace(ELinks.agencyCars)

  const onSubmit = async (values: LoginDto) => {
    await loginMutation.mutateAsync(values)
  }
  const isLoading = loginMutation.isLoading
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={styles.container}
      style={{ height: '100vh' }}
    >
      {
        isLoading
        && <Box sx={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          backgroundColor: 'rgba(255,255,255,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          zIndex: 10
        }}>
          <CircularProgress />
          <Typography>Iniciando Sesion...</Typography>
        </Box>
      }
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(formik) => (
          <Stack sx={{ width: '80%' }} gap={3} alignItems="center">
            <Typography variant="h2" sx={styles.heading}>
              Inicio de sesión
            </Typography>
            <RoundedTextField
              autoFocus
              label="Email"
              placeholder="johndoe@gmail.com"
              name='email'
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <RoundedTextField
              label="Contraseña"
              name='password'
              type='password'
              placeholder="********"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              variant="contained"
              sx={styles.loginButton}
              size="large"
              onClick={() => formik.handleSubmit()}
              disabled={!formik.isValid || !formik.dirty || loginMutation.isLoading}
            >
              Iniciar sesión
            </Button>
          </Stack>
        )}
      </Formik>
    </Grid>
  )
}

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  heading: {
    marginBottom: '35px',
    fontSize: '24px',
    color: 'black',
    fontWeight: 'bold',
  },
  loginButton: {
    width: '80%',
  },
}

export default Login
