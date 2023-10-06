import {
  Add,
} from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { useHistory } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import React, {
  useEffect, useMemo, useRef, useState
} from 'react'
import debounce from 'lodash.debounce'
import ApartmentIcon from '@mui/icons-material/Apartment'
import { list } from '../../../../services/basics/apartment.service'
import { RoundedTextField } from '../../../shared/material-rounded/RoundedTextField'
import { RoundedCard } from '../../../shared/material-rounded/RoundedCard'
import { TypographyIcon } from '../../../shared/material-rounded/TypographyIcon'
import { ELinks } from '../../../routes/links'
import { RQueryKeys, getApartmentQueryKey } from '../../../../types/react-query'
import { Apartments } from '../../../../types/types'
import { Paginated, Res } from '../../../../types/response.types'
import { DEFAULT_SHADOW } from '../../../../styles/theme'

const cities = [
  { value: 'firmat', label: 'Firmat' },
  { value: 'rosario', label: 'Rosario' },
]

export const RentalApartments = () => {
  const history = useHistory()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [city, setCity] = React.useState('')

  const queryClient = useQueryClient()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedApartmentId, setSelectedApartmentId] = useState('')

  const apartmentQuery = useQuery<Res<Paginated<Apartments>>, Error>(
    [RQueryKeys.Apartment, page],
    async () => {
      const res = await list(search, page, city)
      return res
    }
  )

  const debounceSearchRefetch = useMemo(() => debounce(apartmentQuery.refetch, 500), [])

  useEffect(() => {
    debounceSearchRefetch()
  }, [search])

  const viewApartment = (apartment: Apartments) => {
    setSelectedApartmentId(apartment.id)
    queryClient.setQueryData(getApartmentQueryKey(apartment.id), apartment)
    history.push({
      pathname: `${ELinks.apartmentsView}/${apartment.id}`,
      state: apartment,
    })
  }
  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string)
  }
  const selectRef = useRef<HTMLDivElement>(null)
  const [isSelectFocused, setIsSelectFocused] = useState(false)

  const handleFocus = (event: React.FocusEvent) => {
    if (selectRef.current) {
      setIsSelectFocused(event.type === 'focus' && selectRef.current.contains(event.target as Node))
    }
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
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: '1rem'
        }}
        >
        <Button
          startIcon={<Add />}
          variant='contained'
          sx={{ width: '100%' }}
          onClick={() => history.push(ELinks.apartmentsForm)}
        >
          Agregar Apartamento
        </Button>
        <Button
          startIcon={<ReceiptIcon />}
          variant='contained'
          sx={{ width: '80%' }}
          onClick={() => history.push(ELinks.apartmentsRented)}
        >
          Alquileres
        </Button>
        </Box>
        <RoundedTextField
          label='Buscar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel
            sx={{
              marginTop: isSelectFocused || city ? 0 : '-7px'
            }}
          >
            Ciudad
          </InputLabel>
          <Select
            ref={selectRef}
            value={city}
            label="City"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleFocus}
            sx={{
              borderRadius: '10px',
              height: '40px',
              boxShadow: `${DEFAULT_SHADOW}`,
              '& fieldset': { border: 'none' }
            }}
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
          </Select>
        </FormControl>

        {
          (apartmentQuery.data?.data.rows || []).map((apartment) => (
            <RoundedCard
              key={apartment.id}
              sx={{
                width: '100%',
                flexShrink: 0,
                cursor: 'pointer',
              }}
              onClick={() => viewApartment(apartment)}
            >
              <Box sx={{
                display: 'flex',
                justifyContent: 'start',
                gap: '2rem',
                alignItems: 'flex-start',
                padding: '1.3rem',

              }}>
                <ApartmentIcon sx={{
                  fontSize: '3.5rem',
                }}/>
                <Stack gap={1}>
                  <TypographyIcon>{apartment.fullAddress}</TypographyIcon>
                  <TypographyIcon>{apartment.city}</TypographyIcon>
                </Stack>
              </Box>
            </RoundedCard>
          ))
        }

        {
          apartmentQuery.data
          && <Pagination
            count={apartmentQuery.data?.data.metadata.totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        }
      </Stack>
    </Grid >

  )
}
