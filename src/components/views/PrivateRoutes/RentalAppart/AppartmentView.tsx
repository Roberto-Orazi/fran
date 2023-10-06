import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
  styled
} from '@mui/material'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { useEffect, useState } from 'react'
import {
  ArrowBack, Edit
} from '@mui/icons-material'
import { useHistory, useParams } from 'react-router-dom'
import { SelectChangeEvent } from '@mui/material/Select'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { RoundedCard } from '../../../shared/material-rounded/RoundedCard'
import { RQueryKeys, getApartmentQueryKey, getExpenseQueryKey } from '../../../../types/react-query'
import { ELinks } from '../../../routes/links'
import { formatCost } from '../../../../utils/cost.helper'
import ApartmentService from '../../../../services/basics/apartment.service'
import ExpensesService from '../../../../services/expense.service'
import { RoundedSelect } from '../../../shared/material-rounded/RoundedSelect'
import { DEFAULT_SHADOW } from '../../../../styles/theme'
import { Expenses } from '../../../../types/types'

const months = [
  { value: '1', label: 'Enero' },
  { value: '2', label: 'Febrero' },
  { value: '3', label: 'Marzo' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Mayo' },
  { value: '6', label: 'Junio' },
  { value: '7', label: 'Julio' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' },
]

export const ApartmentView = () => {
  const history = useHistory()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()
  const [selectedYear, setSelectedYear] = useState(new Date())
  const currentMonth = new Date().getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expenseData, setExpenseData] = useState<Expenses | undefined>(undefined)

  const { data } = useQuery(getApartmentQueryKey(id), async () => {
    const res = await ApartmentService.getOne(id)
    return res.data
  }, { cacheTime: 1000 * 60 * 10 })

  const expenseQuery = useQuery(getExpenseQueryKey(id), async () => {
    const res = await ExpensesService.getMonth(id, selectedYear.getFullYear(), selectedMonth)
    return res.data
  }, {
    retry: false,
    cacheTime: 1000 * 60 * 10,
  })

  console.log('Año seleccionado en ExpQuery:', selectedYear.getFullYear())
  console.log('Mes seleccionado en ExpQuery:', selectedMonth)

  const deleteMutation = useMutation(ApartmentService.deleteOne, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQueryKeys.Apartment)
    }
  })

  const handleDelete = async () => {
    if (!data) return
    await deleteMutation.mutateAsync(data.id)
    goBack()
  }

  const handleYearChange = (value: any) => {
    setSelectedYear(value)
  }

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    const selectedMonthValue = Number(event.target.value)
    setSelectedMonth(selectedMonthValue)
  }
  useEffect(() => {
    expenseQuery.refetch()
  }, [selectedMonth, selectedYear])

  const goEdit = () => {
    history.push({
      pathname: ELinks.apartmentsForm,
      state: {
        mode: 'update',
        data
      }
    })
  }
  useEffect(() => {
    if (expenseQuery.data) {
      setExpenseData(expenseQuery.data)
    }
  }, [expenseQuery.data])

  console.log('hola', expenseData)
  const goEditExpenses = () => {
    history.push({
      pathname: ELinks.apartmentsExpense,
      state: {
        mode: 'update',
        expenseData,
        data
      }
    })
    console.log('DataEditExpense', expenseData, data)
  }
  const goBack = () => history.push(ELinks.apartments)

  return (
    <Grid
      style={{ width: '100%' }}
      container
      alignItems="center"
      justifyContent="center"
      flexDirection={'column'}
    >
      <Stack
        sx={{
          width: '90%',
          gap: 2,
          padding: 1
        }}
      >
        <Modal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          aria-labelledby="modal-modal-delete"
          aria-describedby="modal-modal-delete-car"
          sx={{
            display: 'flex',
            alignitems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Box sx={{
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Borrar apartamento
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {`Desea borrar ${data?.fullAddress} ${data?.city} ?`}
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-around',
              marginY: '1rem',
              gap: '1rem'
            }}>
              <Button
                variant='outlined'
                onClick={() => setDeleteModalOpen(false)}
                disabled={deleteMutation.isLoading}
              >
                Cancelar
              </Button>
              <Button
                color='error'
                variant='contained'
                onClick={handleDelete}
                disabled={deleteMutation.isLoading}
              >
                {
                  deleteMutation.isLoading
                  && <CircularProgress size='1rem' />
                }
                Borrar
              </Button>
            </Box>
          </Box>
        </Modal>
        <Box sx={{
          display: 'flex',
          width: '100%',
          height: '10%',
          justifyContent: 'space-between'
        }}>
          <IconButton onClick={goBack}>
            <ArrowBack />
          </IconButton>
          <Button
            startIcon={<PostAddIcon />}
            variant='contained'
            sx={{ width: '100%' }}
            onClick={() => history.push(ELinks.apartmentsRentalForm)}
          >
            Agregar Alquiler
          </Button>
        </Box>

        <RoundedCard sx={{
          padding: '1rem',
          flexShrink: 0
        }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Typography variant='h6' fontWeight={600}>
              Descripcion
            </Typography>
            <IconButton onClick={goEdit}>
              <Edit />
            </IconButton>
          </Box>
          <Divider />
          <Stack gap={0.5}>
            <DescriptionRow label='Direccion' value={data?.fullAddress || ''} />
            <DescriptionRow label='Ciudad' value={data?.city || ''} />
          </Stack>
        </RoundedCard>

        <RoundedCard sx={{
          padding: '1rem',
          flexShrink: 0
        }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Typography variant='h6' fontWeight={600}>
              Gastos mensuales
            </Typography>

            <IconButton onClick={goEditExpenses}>
              <Edit />
            </IconButton>

          </Box>
          <Divider />
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            margin: '1rem 0',
            height: '2.5rem',
            gap: '2rem'
          }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StyledDatePicker
                label="año"
                views={['year']}
                value={selectedYear}
                onChange={handleYearChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <RoundedSelect
              label='Mes'
              name='month'
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {months.map((month) => (
                <MenuItem
                  key={month.value}
                  value={month.value}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {month.label}
                </MenuItem>
              ))}
            </RoundedSelect>
          </Box>
          <Divider />
          {
            expenseQuery?.data && Array.isArray(expenseQuery.data) && expenseQuery.data.length > 0 ? (
              <Stack gap={0.5}>
                {expenseQuery.data.map((expense) => (
                  <Box key={expense.id}>
                  <DescriptionRow label={`${expense.description}`} value={`$${formatCost(expense.cost || 0)}`} />
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography>No hay expensas cargadas</Typography>
            )
          }
        </RoundedCard>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <Button
            onClick={() => setDeleteModalOpen(true)}
            variant='text'
            size='large'
            color='error'
            sx={{
              width: '70%',
              marginY: '2rem'
            }}>
            ELIMINAR APARTAMENTO
          </Button>
        </Box>
      </Stack>
    </Grid>
  )
}

interface DescriptionRowProps {
  label: string
  value: string
}

const DescriptionRow = ({ label, value }: DescriptionRowProps) => (
  <Box sx={{
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  }}>
    <Typography>{label}</Typography>
    <Typography>{value}</Typography>
  </Box>
)
const StyledDatePicker = styled(DatePicker)`
 border-radius: 10px;
  box-shadow: ${DEFAULT_SHADOW};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  & fieldset{
    border: none;
    }
`
