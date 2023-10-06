import { ArrowBack } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material'
import { useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Formik, FormikHelpers } from 'formik'
import { useMutation, useQueryClient } from 'react-query'
import { BasicInfo } from './BasicInfo'
import { ExtraInfo } from './ExtraInfo'
import { UploadImages } from './UploadImages'
import { CreateAgencyCarDto, UpdateAgencyCarDto } from '../../../../../validations/agency-car.dto'
import { AgencyCar, defaultCarAttributes } from '../../../../../types/types'
import createValidator from '../../../../../utils/class-validator-formik'
import AgencyCarService, { SelectedImages } from '../../../../../services/basics/agency-car.service'
import { RQueryKeys, getAgencyCarQueryKey } from '../../../../../types/react-query'
import { extractImagePositionFromUrl } from '../../../../../utils/agency-car.helper'

type Values = CreateAgencyCarDto | UpdateAgencyCarDto

const steps = [
  'Informacion basica',
  'Agregar caracteristicas',
  'Agregar fotos'
]

const createInitialValues: CreateAgencyCarDto = {
  make: '',
  model: '',
  year: new Date().getFullYear(),
  condition: 'usado',
  transmision: 'manual',
  fuel: '',
  color: '',
  km: 0,
  price: 0,
  currency: 'ARS',
  videoUrl: '',
  attributes: {
    ...defaultCarAttributes
  }
}

export interface AgencyCarFormProps {
  mode: 'add' | 'update'
  data: AgencyCar
}

export const AgencyCarForm = () => {
  const history = useHistory()
  const [title, setTitle] = useState('Agregar auto')
  const [currentStep, setCurrentStep] = useState(0)
  const [images, setImages] = useState<SelectedImages<File>>({})
  const location = useLocation<AgencyCarFormProps>()
  const [initialValues, setInitialValues] = useState<Values>(createInitialValues)
  const { mode = 'add', data } = location.state || {}
  const [previewImages, setPreviewImages] = useState<SelectedImages<string>>({})
  const queryClient = useQueryClient()

  useEffect(() => {
    if (mode === 'add') setTitle('Agregar auto')
    else if (mode === 'update') setTitle('Editar auto')

    if (mode === 'update') {
      setInitialValues({
        ...data
      } as UpdateAgencyCarDto)

      const imageMap: SelectedImages<string> = {}
      data.images.forEach((image) => {
        const key: keyof SelectedImages<string> = extractImagePositionFromUrl(image.url) as any
        imageMap[key] = image.url
      })

      setPreviewImages(imageMap)
    }
  }, [mode, data])

  const createMutation = useMutation(AgencyCarService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQueryKeys.AgencyCar)
    }
  })
  const updateMutation = useMutation(AgencyCarService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(RQueryKeys.AgencyCar)
      queryClient.invalidateQueries(getAgencyCarQueryKey(data.id))
    }
  })

  const validate = mode === 'add'
    ? createValidator(CreateAgencyCarDto)
    : createValidator(UpdateAgencyCarDto)

  const onSubmit = async (values: Values, formik: FormikHelpers<CreateAgencyCarDto>) => {
    if (mode === 'add') {
      await createMutation.mutateAsync({
        dto: values,
        files: images
      })
    } else {
      await updateMutation.mutateAsync({
        dto: values as UpdateAgencyCarDto,
        files: images
      })
    }
    setPreviewImages({})
    setImages({})
    setCurrentStep(0)
    formik.resetForm()
    history.goBack()
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
            {/** console.log(formik.errors) */}

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
            <Stepper activeStep={currentStep}>
              {
                steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))
              }
            </Stepper>

            <Stack
              width='100%'
              gap={2}
              alignItems={'center'}
              padding='0.5rem'
            >
              {
                currentStep === 0
                && <BasicInfo
                  formik={formik}
                />
              }
              {
                currentStep === 1
                && <ExtraInfo
                  formik={formik}
                />
              }
              {
                currentStep === 2
                && <UploadImages
                  formik={formik}
                  images={images}
                  setImages={setImages}
                  setPreviewImages={setPreviewImages}
                  previewImages={previewImages}
                />
              }
            </Stack>

            {
              formik.errors
              && Object.keys(formik.errors).map((key) => (
                <Typography color='red'>{(formik.errors as any)[key]}</Typography>
              ))
            }

            {
              currentStep === steps.length - 1
                ? <Button
                  variant='contained'
                  sx={{ width: '40%' }}
                  size='large'
                  onClick={() => formik.handleSubmit()}
                  disabled={isLoading}
                >
                  {
                    isLoading
                    && <CircularProgress />
                  }
                  Guardar
                </Button>
                : <Button
                  variant='contained'
                  sx={{ width: '40%' }}
                  size='large'
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Siguiente
                </Button>
            }
            {
              currentStep !== 0
              && <Button
                sx={{ width: '40%' }}
                size='large'
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={isLoading}
              >
                Volver
              </Button>
            }
          </Stack>
        )}
      </Formik>
    </Grid >
  )
}
