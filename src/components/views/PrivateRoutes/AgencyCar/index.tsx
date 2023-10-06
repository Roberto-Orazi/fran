import {
  Add,
  EventNote,
  MinorCrash,
  Speed
} from '@mui/icons-material'
import {
  Box,
  Button,
  Grid,
  Pagination,
  Stack,
  Typography
} from '@mui/material'
import { useHistory } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import { RoundedTextField } from '../../../shared/material-rounded/RoundedTextField'
import { RoundedCard } from '../../../shared/material-rounded/RoundedCard'
import { TypographyIcon } from '../../../shared/material-rounded/TypographyIcon'
import { formatPrice } from '../../../../utils/price.helper'
import { ELinks } from '../../../routes/links'
import { RQueryKeys, getAgencyCarQueryKey } from '../../../../types/react-query'
import AgencyCarService from '../../../../services/basics/agency-car.service'
import { AgencyCar } from '../../../../types/types'

export const AgencyCarView = () => {
  const history = useHistory()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const queryClient = useQueryClient()

  const agencyCarQuery = useQuery([RQueryKeys.AgencyCars, page], async () => {
    const res = await AgencyCarService.list(search, page, minPrice, maxPrice)
    return res.data
  })

  const handleSetNumber = (
    str: string,
    setFn: React.Dispatch<React.SetStateAction<number | null>>,
  ) => {
    if (str === '') {
      setFn(null)
      return
    }

    const value = parseFloat(str)
    if (Number.isNaN(value)) {
      return
    }

    setFn(value)
  }

  const debounceSearchRefetch = useMemo(() => debounce(agencyCarQuery.refetch, 500), [])

  useEffect(() => {
    debounceSearchRefetch()
  }, [search, minPrice, maxPrice])

  const viewCar = (car: AgencyCar) => {
    queryClient.setQueryData(getAgencyCarQueryKey(car.id), car)
    history.push({
      pathname: `${ELinks.agencyCar}/${car.id}`,
      state: car
    })
  }

  return (
    <Grid
      style={{ height: '100vh' }}
      container
      maxWidth='xs'
      alignItems="center"
      justifyContent="center"
      flexDirection={'column'}
    >
      <Stack
        width='90%'
        height={'100%'}
        gap={2}
        alignItems={'center'}
      >
        <Button
          startIcon={<Add />}
          variant='contained'
          sx={{ width: '60%' }}
          onClick={() => history.push(ELinks.agencyCarForm)}
        >
          Agregar Auto
        </Button>
        <RoundedTextField
          label='Buscar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box sx={{
          display: 'flex',
          width: '100%',
          gap: 2
        }}>
          <RoundedTextField
            label='Minimo $'
            onChange={(e) => handleSetNumber(e.target.value, setMinPrice)}
            value={minPrice || ''}
          />
          <RoundedTextField
            label='Maximo $'
            onChange={(e) => handleSetNumber(e.target.value, setMaxPrice)}
            value={maxPrice || ''}
          />
        </Box>

        {
          (agencyCarQuery.data?.rows || []).map((car) => (
            <RoundedCard
              key={car.id}
              sx={{
                width: '100%',
                flexShrink: 0,
              }}
              onClick={() => viewCar(car)}
            >
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '1.3rem'
              }}>
                <Stack gap={1}>
                  <TypographyIcon startIcon={MinorCrash}>{car.make} {car.model}</TypographyIcon>
                  <TypographyIcon startIcon={EventNote}>{car.year}</TypographyIcon>
                  <TypographyIcon startIcon={Speed}>{car.km ? `${car.km} KM` : '-'}</TypographyIcon>
                </Stack>
                <Typography variant='h5' fontWeight={600}>${formatPrice(car.price)}</Typography>
              </Box>
            </RoundedCard>
          ))
        }

        {
          agencyCarQuery.data
          && <Pagination
            count={agencyCarQuery.data?.metadata.totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        }
      </Stack>
    </Grid >

  )
}
