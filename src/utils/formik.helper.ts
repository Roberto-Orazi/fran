import { FormikProps } from 'formik'
import _ from 'lodash'

export const getFormikProps = (formik: FormikProps<any>, property: string, mode?: string) => {
  const touched = _.get(formik.touched, property)
  const errors = _.get(formik.errors, property)
  const values = _.get(formik.values, property)

  return ({
    name: property,
    error: touched && Boolean(errors),
    helperText: touched && errors,
    disabled: mode === 'READ',
    onBlur: formik.handleBlur(property),
    onChange: formik.handleChange(property),
    value: `${values}`
  })
}
