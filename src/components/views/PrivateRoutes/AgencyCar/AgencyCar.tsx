import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
  styled
} from '@mui/material'
import {
  AddPhotoAlternate, ArrowBack, Edit
} from '@mui/icons-material'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { RoundedCard } from '../../../shared/material-rounded/RoundedCard'
import { formatPrice } from '../../../../utils/price.helper'
import {
  AgencyCarImagesMap,
  Image as ImageType
} from '../../../../types/types'
import { ELinks } from '../../../routes/links'
import AgencyCarService from '../../../../services/basics/agency-car.service'
import { RQueryKeys, getAgencyCarQueryKey } from '../../../../types/react-query'
import { extractImagePositionFromUrl } from '../../../../utils/agency-car.helper'
import { convertToEmbedUrl } from '../../../../utils/youtube.helper'

const { REACT_APP_WEBSITE_URL } = process.env

export const AgencyCar = () => {
  const history = useHistory()
  const { id } = useParams<any>()

  const [images, setImages] = useState<AgencyCarImagesMap>({})
  const [currentImage, setCurrentImage] = useState<ImageType | null>(null)
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

  useEffect(() => {
    if (data) {
      const imageMap: AgencyCarImagesMap = {} as any
      data.images.forEach((image) => {
        const key: keyof AgencyCarImagesMap = extractImagePositionFromUrl(image.url) as any

        imageMap[key] = image
      })
      setCurrentImage(imageMap['image-1'] || null)
      setImages(imageMap)
    }
  }, [data])

  const videoUrl = useMemo(() => {
    if (!data || !data.videoUrl) return null
    const url = convertToEmbedUrl(data.videoUrl)
    return url
  }, [data])

  const formatCarAttributeValue = (attr: any) => {
    if (typeof attr === 'boolean') {
      return attr ? 'Si' : 'No'
    }
    return attr
  }

  const selectImage = (image: ImageType | undefined) => {
    if (!image) return
    setCurrentImage(image)
  }

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
      {/* TODO: exxtract this modal into a reusable component */}
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
        <Container
        maxWidth='sm'
        >
        <Box sx={{
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem',
          borderRadius: '.8rem',
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
        </Container>
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
          <RoundedCard sx={{
            width: '100%',
            height: '220px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {
              currentImage
                ? <Image
                  src={`${currentImage.url}?${currentImage.date}`}
                  key={`${currentImage.date}`}
                />
                : <AddPhotoAlternate sx={{
                  width: '77px',
                  height: '77px'
                }} />
            }

          </RoundedCard>

          <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-start',
            paddingY: '0.5rem',
            overflowX: 'scroll',
            gap: 2,
          }}>
            {
              Object
                .keys(images)
                .map((keyImage) => {
                  const key: keyof AgencyCarImagesMap = keyImage as any
                  return (
                    <DisplayImage
                      key={key}
                      image={images[key]}
                      onClick={() => selectImage(images[key])}
                    />
                  )
                })
            }
          </Box>
        </Box>

        {
          videoUrl
            ? <RoundedCard sx={{
              aspectRatio: '16 / 9',
              width: '100%',
              height: '100%'
            }}>
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                frameBorder={0}
              />
            </RoundedCard>
            : <RoundedCard sx={{
              padding: '1rem',
              flexShrink: 0
            }}>
              <Typography variant='h6' fontWeight={600}>Sin video</Typography>
            </RoundedCard>
        }

        <RoundedCard sx={{
          padding: '1rem',
          flexShrink: 0
        }}>
          <Typography variant='h6' fontWeight={600}>
            Descripcion
          </Typography>
          <Divider />
          <Stack gap={0.5}>
            <DescriptionRow label='Auto' value={`${data.make} ${data.model}`} />
            <DescriptionRow label='Precio' value={`$${formatPrice(data.price)}`} />
            <DescriptionRow label='Año' value={data.year.toString()} />
            <DescriptionRow label='Condicion' value={data.condition} />
            <DescriptionRow label='Combustible' value={data.fuel || ''} />
            <DescriptionRow label='Transmision' value={data.transmision || ''} />
            <DescriptionRow label='Color' value={data.color} />
            <Box sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between'
            }}>
              <Typography>{'Video'}</Typography>
              <a href={data.videoUrl} target='_blank'>{data.videoUrl}</a>
            </Box>
          </Stack>
        </RoundedCard>

        <RoundedCard sx={{
          padding: '1rem',
          flexShrink: 0
        }}>
          <Typography variant='h6' fontWeight={600}>
            Caracteristicas
          </Typography>
          <Divider />
          <Stack gap={0.5}>
            {
              Object.keys(data.attributes).map((attrKey) => (
                <DescriptionRow
                  key={attrKey}
                  label={attrKey}
                  value={formatCarAttributeValue((data.attributes as any)[attrKey])}
                />
              ))
            }
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
            Ver en la pagina
          </Button>

          <Button
            onClick={() => setDeleteModalOpen(true)}
            variant='text'
            size='large'
            color='error'
            sx={{
              width: '70%',
              marginY: '2rem'
            }}>
            ELIMINAR AUTO
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

interface DisplayImageProps {
  image?: ImageType
  onClick: () => void
}
const DisplayImage = ({ image, onClick }: DisplayImageProps) => (
  <RoundedCard
    onClick={onClick}
    key={`${image?.date}`}
    sx={{
      width: '120px',
      height: '70px',
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'box-shadow .5s',
      ':hover': {
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(3,3,3,0.8)'
      }
    }}>
    <Image
      src={`${image?.url}?${image?.date}`}
      key={`${image?.date}`}
    />
    {
      !image
      && <AddPhotoAlternate sx={{
        width: '30px',
        height: '30px'
      }} />
    }
  </RoundedCard >

)

const Image = styled('img')`
  width: 100%;
  height: 100%;
`
