import { Box } from '@mui/material'
import { AddPhotoAlternate } from '@mui/icons-material'
import { FormikProps } from 'formik'
import { useMemo, useRef } from 'react'
import { RoundedCard } from '../../../../shared/material-rounded/RoundedCard'
import { CreateAgencyCarDto } from '../../../../../validations/agency-car.dto'
import { SelectedImages } from '../../../../../services/basics/agency-car.service'

interface Props {
  images: SelectedImages<File>
  setImages: React.Dispatch<React.SetStateAction<SelectedImages<File>>>
  setPreviewImages: React.Dispatch<React.SetStateAction<SelectedImages<string>>>
  formik: FormikProps<CreateAgencyCarDto>
  previewImages: SelectedImages<string>
}

export const UploadImages = (props: Props) => {
  const { setImages, previewImages, setPreviewImages } = props

  const onSelectFile = (key: string) => (e: React.ChangeEvent<any>) => {
    console.log(key)
    e.preventDefault()
    if (!e.target.files || e.target.files.length === 0) return
    setImages((x) => ({ ...x, [key]: e.target.files[0] }))
    setPreviewImages((x) => ({ ...x, [key]: URL.createObjectURL(e.target.files[0]) }))
  }

  const imageList = useMemo(() => {
    let count = 0

    Object.keys(previewImages).forEach((key) => {
      const imageUrl = (previewImages as any)[key]
      // eslint-disable-next-line no-plusplus
      if (imageUrl) count++
    })

    const length = count < 15 ? count + 1 : 15
    return new Array(length).fill(1)
  }, [previewImages])

  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      {
        imageList.map((_, i) => {
          const key = `image-${i + 1}`
          const imageUrl = (previewImages as any)[key]
          return (
            <ImageInput
              key={key}
              imageKey={key}
              onSelectFile={onSelectFile}
              imageUrl={imageUrl}
            />
          )
        })
      }
    </Box >
  )
}

interface ImageInputProps {
  imageUrl?: string
  onSelectFile: (key: string) => (e: React.ChangeEvent<any>) => void
  imageKey: string
}

const ImageInput = ({
  imageUrl,
  onSelectFile,
  imageKey
}: ImageInputProps) => {
  const ref = useRef<HTMLInputElement | null>(null)

  return (
    <RoundedCard
      onClick={() => ref.current?.click()}
      sx={{
        width: '100%',
        height: '180px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundSize: 'cover',
        ':hover': {
          cursor: 'pointer'
        }
      }}>
      {
        !imageUrl
        && <AddPhotoAlternate sx={{
          width: '77px',
          height: '77px'
        }} />
      }
      <input
        type='file'
        ref={ref}
        style={{ display: 'none' }}
        onChange={onSelectFile(imageKey)}
      />

    </RoundedCard>
  )
}
