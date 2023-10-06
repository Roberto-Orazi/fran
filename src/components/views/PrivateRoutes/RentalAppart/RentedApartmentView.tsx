import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import {
  ArrowBack, Edit
} from '@mui/icons-material'
import { useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { RoundedCard } from '../../../shared/material-rounded/RoundedCard'
import { formatPrice } from '../../../../utils/price.helper'
import { ELinks } from '../../../routes/links'
import AgencyCarService from '../../../../services/basics/agency-car.service'
import { RQueryKeys, getAgencyCarQueryKey } from '../../../../types/react-query'

const { REACT_APP_WEBSITE_URL } = process.env

export const AparmentsRentedView = () => {
  const history = useHistory()
  const { id } = useParams<any>()

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data } = useQuery(getAgencyCarQueryKey(id), async () => {
    const res = await AgencyCarService.getOne(id)
    return res.data
  }, { cacheTime: 1000 * 60 * 10 })

  const deleteMutation = useMutation(AgencyCarService.deleteOne, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQueryKeys.AgencyCar)
    }
  })

  const goEdit = () => {
    history.push({
      pathname: ELinks.agencyCarForm,
      state: {
        mode: 'update',
        data
      }
    })
  }

  const goSite = () => {
    if (!data) return
    window.open(`${REACT_APP_WEBSITE_URL}/car/${data.id}`)
  }

  const goBack = () => history.push(ELinks.agencyCars)

  const handleDelete = async () => {
    if (!data) return
    await deleteMutation.mutateAsync(data.id)
    goBack()
  }

  if (!data) {
    return (
      <CircularProgress />
    )
  }

  return (
    <Grid
      style={{ width: '100%' }}
      container
      alignItems="center"
      justifyContent="center"
      flexDirection={'column'}
    >
      {/** TODO: exxtract this modal into a reusable component */}
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
          alignitems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Borrar auto
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Desea borrar ${data.make} ${data.model} ${data.year} ?`}
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            marginY: '1rem'
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
      <Stack
        sx={{
          width: '90%',
          gap: 2,
          padding: 1
        }}
      >
        <Box sx={{
          display: 'flex',
          width: '100%',
          height: '10%',
          justifyContent: 'space-between'
        }}>
          <IconButton onClick={goBack}>
            <ArrowBack />
          </IconButton>
          <IconButton onClick={goEdit}>
            <Edit />
          </IconButton>
        </Box>
        <Box sx={{
          display: 'flex',
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          gap: '1rem',
        }}>
        </Box>

        <RoundedCard sx={{
          padding: '1rem',
          flexShrink: 0
        }}>
          <Typography variant='h6' fontWeight={600}>
            Descripcion
          </Typography>
          <Divider />
          <Stack gap={0.5}>
            <DescriptionRow label='Apartamento' value={`${data.make} ${data.model}`} />
            <DescriptionRow label='Precio' value={`$${formatPrice(data.price)}`} />
            <DescriptionRow label='Desde' value={data.year.toString()} />
            <DescriptionRow label='Hasta' value={data.condition} />
            <DescriptionRow label='Facturado' value={data.fuel || ''} />
          </Stack>
        </RoundedCard>

        <RoundedCard sx={{
          padding: '1rem',
          flexShrink: 0
        }}>
          <Typography variant='h6' fontWeight={600}>
            Cliente
          </Typography>
          <Divider />
          <Stack gap={0.5}>
            <DescriptionRow label='Nombre' value={`${data.make} ${data.model}`} />
            <DescriptionRow label='Email' value={`$${formatPrice(data.price)}`} />
            <DescriptionRow label='Celular' value={data.year.toString()} />
            <DescriptionRow label='Sexo' value={data.condition} />
          </Stack>
        </RoundedCard>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginBottom: '1rem'
        }}>
          <Button
            onClick={goSite}
            variant='contained'
            size='large'
            sx={{ width: '70%' }}>
            Descargar Factura
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
