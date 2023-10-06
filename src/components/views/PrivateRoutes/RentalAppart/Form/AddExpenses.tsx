import { ArrowBack } from '@mui/icons-material'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  TextFieldProps,
  Typography
} from '@mui/material'
import { useHistory, useLocation } from 'react-router-dom'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import ApartmentIcon from '@mui/icons-material/Apartment'
import { useMutation, useQueryClient } from 'react-query'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DeleteIcon from '@mui/icons-material/Delete'
import { CreateExpenseDto, UpdateExpenseDto } from '../../../../../validations/expense.dto'
import { Apartments, Expenses } from '../../../../../types/types'
import createValidator from '../../../../../utils/class-validator-formik'
import { RQueryKeys, getApartmentQueryKey } from '../../../../../types/react-query'
import { RoundedTextField } from '../../../../shared/material-rounded/RoundedTextField'
import { getFormikProps } from '../../../../../utils/formik.helper'
import { ELinks } from '../../../../routes/links'
import ExpensesService from '../../../../../services/expense.service'
import { TypographyIcon } from '../../../../shared/material-rounded/TypographyIcon'
import { DEFAULT_SHADOW } from '../../../../../styles/theme'

type Values = CreateExpenseDto | UpdateExpenseDto

const createInitialValues: CreateExpenseDto = {
  cost: 0,
  date: new Date(),
  description: '',
  apartmentId: '',
}

export interface ExpensesFormProps {
  mode: 'add' | 'update'
  expenseData: Expenses
  data: Apartments
}

export const AddExpense = () => {
  const history = useHistory()
  const location = useLocation<ExpensesFormProps>()
  const { mode = 'add', data, expenseData } = location.state || {}
  const apartmentData = data
  const [expenses, setExpenses] = useState<Expenses[]>([])
  const queryClient = useQueryClient()
  console.log('ID del apartamento en apartmentData:', expenseData.apartment?.id)
  console.log('ID del apartamento en expenseData:', expenseData?.id)
  console.log('apartamento en expenseData:', expenseData?.apartment)
  const [initialValues, setInitialValues] = useState<Values>(createInitialValues)

  const createMutation = useMutation(ExpensesService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQueryKeys.Expense)
    },
  })

  console.log('esto tiene que darme un array', expenseData)
  const updateMutation = useMutation(ExpensesService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQueryKeys.Expense)
      if (expenseData.id) {
        queryClient.invalidateQueries(getApartmentQueryKey(expenseData.id))
      }
    },
  })
  useEffect(() => {
    if (data?.id) {
      setInitialValues({
        ...initialValues,
        apartmentId: data.id,
      })
    }
  }, [data])
  const validate = mode === 'add'
    ? createValidator(CreateExpenseDto)
    : createValidator(UpdateExpenseDto)

  const handleDeleteExpense = (expenseIdToDelete: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseIdToDelete))
  }

  useEffect(() => {
    if (mode === 'update' && expenseData.id) {
      setExpenses([expenseData, ...expenses])
    }
  }, [mode, expenseData])

  const handleSetNumber = (
    str: string,
    setFn: (value: any) => void,
  ) => {
    if (str === '') {
      setFn('')
      return
    }

    const value = parseFloat(str)
    if (Number.isNaN(value)) return

    setFn(value)
  }
  const onSubmit = async (values: Values) => {
    console.log('Entrando en onSubmit')
    console.log('Guardando valores:', values)
    try {
      if (mode === 'add') {
        await createMutation.mutateAsync(values as CreateExpenseDto)
      } else {
        await updateMutation.mutateAsync(values as UpdateExpenseDto)
      }
      history.push(ELinks.apartmentsView)
    } catch (error) {
      console.error('An error occurred:', error)
    }

    console.log('EL SUBMIT FUE EXITOSO')
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
             {console.log('Formik initialized', formik)}
            <Box sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center'
            }}>
              <IconButton onClick={() => history.goBack()}>
                <ArrowBack />
              </IconButton>
              <Typography variant='h5'>Gastos Mensuales</Typography>
            </Box>
            {console.log('Initial values', initialValues)}
            <Box sx={{
              display: 'flex',
              justifyContent: 'start',
              gap: '2rem',
              alignItems: 'flex-start',
              padding: '1.3rem',

            }}>
              <ApartmentIcon sx={{
                fontSize: '4rem',
                backgroundColor: '#ffffff',
                padding: '.4rem',
                borderRadius: '10px',
                boxShadow: `${DEFAULT_SHADOW}`,
              }} />
              <Stack gap={1}>
                <TypographyIcon>{apartmentData?.fullAddress}</TypographyIcon>
                <TypographyIcon>{apartmentData?.city}</TypographyIcon>
              </Stack>
            </Box>
            <>
              {console.log('Direccion:', apartmentData?.fullAddress)}
              {console.log('Ciudad:', apartmentData?.city)}
              {console.log('expensa:', expenseData)}
              {console.log('apartamento:', apartmentData)}</>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fecha"
                value={formik.values.date || null}
                readOnly
                onChange={(newValue: Date | null) => {
                  formik.setFieldValue('date', newValue)
                }}
                renderInput={(params: TextFieldProps) => (
                  <RoundedTextField
                    {...params}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
            <Box sx={{
              display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%'
            }}>
               <RoundedTextField
                  required
                  label={'Expensa '}
                  {...getFormikProps(formik, 'description')}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={
                    formik.touched.description && formik.errors.description
                      ? formik.errors.description
                      : undefined
                  }
                />
                <RoundedTextField
                  required
                  label={'Costo expensa '}
                  {...getFormikProps(formik, 'cost')}
                  onChange={(e) => {
                    handleSetNumber(e.target.value, (val) => {
                      formik.setFieldValue('cost', val)
                    })
                  }}
                  onBlur={formik.handleBlur('cost')}
                  error={formik.touched.cost && Boolean(formik.errors.cost)}
                  helperText={
                    formik.touched.cost && formik.errors.cost
                      ? formik.errors.cost
                      : undefined
                  }
                />
                <IconButton onClick={() => handleDeleteExpense(expenseData.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
           {/*  {<IconButton onClick={handleAddExpense} sx={{
              fontSize: '1rem',
              color: '#000',
              '&:hover': {
                backgroundColor: '#fff',
              },
            }}>
              Agregar expensa
              <AddCircleIcon />
            </IconButton>} */}
            <Button
              variant='contained'
              sx={{ width: '40%' }}
              size='large'
              onClick={() => {
                console.log('Form is valid:', formik.isValid)
                formik.handleSubmit()
              }}
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
