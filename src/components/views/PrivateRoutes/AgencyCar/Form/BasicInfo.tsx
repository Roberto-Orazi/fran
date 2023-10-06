import {
  MenuItem
} from '@mui/material'
import React from 'react'
import { FormikProps } from 'formik'
import { RoundedTextField } from '../../../../shared/material-rounded/RoundedTextField'
import { RoundedSelect } from '../../../../shared/material-rounded/RoundedSelect'
import { CreateAgencyCarDto } from '../../../../../validations/agency-car.dto'
import { getFormikProps } from '../../../../../utils/formik.helper'

interface Props {
  formik: FormikProps<CreateAgencyCarDto>
}

export const BasicInfo = (props: Props) => {
  const { formik } = props

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

  return (
    <>
      <RoundedTextField
        required
        label='Marca'
        {...getFormikProps(formik, 'make')}
      />
      <RoundedTextField
        required
        label='Modelo'
        {...getFormikProps(formik, 'model')}
      />
      <RoundedTextField
        required
        label='Año'
        {...getFormikProps(formik, 'year')}
        onChange={(e) => handleSetNumber(
          e.target.value,
          (val) => formik.setFieldValue('year', val)
        )}
      />
      <RoundedSelect
        label='Condicion'
        name='condition'
        onChange={formik.handleChange}
        value={`${formik.values.condition}`}
        error={formik.touched.condition && Boolean(formik.errors.condition)}
      >
        <MenuItem value={'usado'}>Usado</MenuItem>
        <MenuItem value={'nuevo'}>Nuevo</MenuItem>
      </RoundedSelect>
      <RoundedSelect
        label='Transmision'
        name='transmision'
        onChange={formik.handleChange}
        value={`${formik.values.transmision}`}
        error={formik.touched.transmision && Boolean(formik.errors.transmision)}
      >
        <MenuItem value={'manual'}>Manual</MenuItem>
        <MenuItem value={'automatica'}>Automatica</MenuItem>
      </RoundedSelect>
      <RoundedSelect
        label='Combustible'
        name='fuel'
        onChange={formik.handleChange}
        value={`${formik.values.fuel}`}
        error={formik.touched.fuel && Boolean(formik.errors.fuel)}
      >
        <MenuItem value={'diesel'}>Diesel</MenuItem>
        <MenuItem value={'nafta'}>Nafta</MenuItem>
        <MenuItem value={'electrico'}>Electrico</MenuItem>
      </RoundedSelect>
      <RoundedTextField
        required
        label='Color'
        {...getFormikProps(formik, 'color')}
      />
      <RoundedTextField
        required
        label='Kilometros'
        {...getFormikProps(formik, 'km')}
        onChange={(e) => handleSetNumber(
          e.target.value,
          (val) => formik.setFieldValue('km', val)
        )}
      />
      <RoundedTextField
        required
        label='Precio'
        {...getFormikProps(formik, 'price')}
        onChange={(e) => handleSetNumber(
          e.target.value,
          (val) => formik.setFieldValue('price', val)
        )}
      />
      <RoundedTextField
        label='Link del video'
        {...getFormikProps(formik, 'videoUrl')}
      />
    </>
  )
}
