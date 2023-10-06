/* eslint-disable quote-props */
import {
  Box,
  MenuItem,
  Typography
} from '@mui/material'
import { FormikProps } from 'formik'
import { IOSSwitch } from '../../../../shared/Switch'
import { RoundedSelect } from '../../../../shared/material-rounded/RoundedSelect'
import { CreateAgencyCarDto } from '../../../../../validations/agency-car.dto'

interface Props {
  formik: FormikProps<CreateAgencyCarDto>
}

interface ExtraInfo {
  [x: string]: boolean | string[]
}

const data: ExtraInfo = {
  'Rodado': [
    '17',
    '18',
    '19',
    '20'
  ],
  'Tapizado': [
    'Cuero',
    'Pana',
    'Tela'
  ],
  'Aire acondicionado': false,
  'Calefaccion auxiliar': false,
  'Techo panoramico': false,
  'Velocidad crucero': false,
  'Bluetooth': false,
  'GPS': false,
  'Sensores de estacionamiento': false,
  'ABS': false,
  'Airbags': false,
  'Cierre centralizado': false,
  'Cobertor de caja': false,
  'Direccion asistida': false,
  'Inmovilizador': false,
  'Camara trasera': false,
  'Control de estabilidad': false,
  'Baranda antivuelco': false,
  'Caja de herramientas': false,
  'Estribos': false,
  'Espejo lateral electrico': false,
  'Llantas de aleacion': false,
  'Paquete deportivo': false,
  'Suspension deportiva': false,
}

export const ExtraInfo = (props: Props) => {
  const { formik } = props
  return (
    <>
      {
        Object.keys(data).map((key) => (
          (Array.isArray(data[key]))
            ? <RoundedSelect
              label={key}
              name={`attributes.${key}`}
              onChange={formik.handleChange}
              value={`${(formik.values.attributes as any)[key]}`}
              key={key}
            // FIXME: the line below throws an error
            // error={(formik.touched.attributes as any)[key] && Boolean((formik.errors.attributes as any)[key])}
            >
              {
                (data[key] as string[]).map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))
              }
            </RoundedSelect>
            : <Box
              key={key}
              sx={{
                display: 'flex',
                width: '90%',
                justifyContent: 'space-between'
              }}
            >
              <Typography>{key}</Typography>
              <IOSSwitch
                onChange={(e, checked) => formik.setFieldValue(`attributes.${key}`, checked)}
                value={(formik.values.attributes as any)[key]}
                checked={(formik.values.attributes as any)[key]}
              />
            </Box>
        ))
      }
    </>
  )
}
