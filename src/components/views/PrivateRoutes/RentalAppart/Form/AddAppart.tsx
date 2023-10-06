import { ArrowBack } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography
} from '@mui/material'
import { useHistory, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { useMutation, useQueryClient } from 'react-query'
import { CreateApartmentDto, UpdateApartmentDto } from '../../../../../validations/apartment.dto'
import { Apartments } from '../../../../../types/types'
import createValidator from '../../../../../utils/class-validator-formik'
import ApartmentService from '../../../../../services/basics/apartment.service'
import { RQueryKeys, getApartmentQueryKey } from '../../../../../types/react-query'
import { RoundedTextField } from '../../../../shared/material-rounded/RoundedTextField'
import { getFormikProps } from '../../../../../utils/formik.helper'
import { ELinks } from '../../../../routes/links'
import { RoundedSelect } from '../../../../shared/material-rounded/RoundedSelect'

type Values = CreateApartmentDto | UpdateApartmentDto

const cities = [
  { value: 'firmat', label: 'Firmat' },
  { value: 'rosario', label: 'Rosario' },
]

const createInitialValues: CreateApartmentDto = {
  fullAddress: '',
  city: '',
}

export interface ApartmentFormProps {
  mode: 'add' | 'update'
  data: Apartments
}

export const AddApartment = () => {
  const history = useHistory()
  const [title, setTitle] = useState('Agregar Apartamento')
  const location = useLocation<ApartmentFormProps>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialValues, setInitialValues] = useState<Values>(createInitialValues)
  const { mode = 'add', data } = location.state || {}
  const queryClient = useQueryClient()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isCreateMode = mode === 'add'

  useEffect(() => {
    if (mode === 'add') setTitle('Agregar Apartamento')
    else if (mode === 'update') setTitle('Editar Apartamento')

    if (mode === 'update') {
      setInitialValues({
        ...data
      } as UpdateApartmentDto)
    }
  }, [mode, data])

  const createMutation = useMutation(ApartmentService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQueryKeys.Apartment)
    },
  })

  // eslint-disable-next-line import/no-named-as-default-member
  const updateMutation = useMutation(ApartmentService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQueryKeys.Apartment)
      if (data.id) {
        queryClient.invalidateQueries([getApartmentQueryKey(data.id)])
      }
    },
  })

  const validate = mode === 'add'
    ? createValidator(CreateApartmentDto)
    : createValidator(UpdateApartmentDto)

  const onSubmit = async (values: Values) => {
    try {
      if (mode === 'add') {
        await createMutation.mutateAsync(values as CreateApartmentDto)
      } else if (mode === 'update') {
        await updateMutation.mutateAsync(values as UpdateApartmentDto)
      }

      history.push(ELinks.apartments)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Grid
      style={{ height: '100vh' }}
      container
      alignItems="center"
      justifyContent="center"
      flexDirection={'column'}
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
          <Typography>Guardando...</Typography>
        </Box>
      }
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(formik) => (
          <Stack
            width='90%'
            height={'100%'}
            gap={2}
            alignItems={'center'}
          >
            <Box sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center'
            }}>
              <IconButton onClick={() => history.goBack()}>
                <ArrowBack />
              </IconButton>
              <Typography variant='h5'>{title}</Typography>
            </Box>

            <RoundedTextField
              required
              label='Direccion'
              {...getFormikProps(formik, 'fullAddress')}
              error={formik.touched.fullAddress && Boolean(formik.errors.fullAddress)}
              helperText={
                formik.touched.fullAddress && formik.errors.fullAddress
                  ? formik.errors.fullAddress
                  : undefined
              }
            />
            <RoundedSelect
             label='Ciudad'
             name='city'
             onChange={formik.handleChange}
             value={`${formik.values.city}`}
             error={formik.touched.city && Boolean(formik.errors.city)}
            >
              {cities.map((city) => (
              <MenuItem
                key={city.value}
                value={city.value}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {city.label}
              </MenuItem>
              ))}
            </RoundedSelect>
            <Button
              variant='contained'
              sx={{ width: '40%' }}
              size='large'
              onClick={() => formik.handleSubmit()}
              disabled={isLoading}
            >
              {isLoading && <CircularProgress />}
              Guardar
            </Button>
          </Stack>
        )}
      </Formik>
    </Grid>
  )
}
