const NOT_FOUND = 404
const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const PRECONDITION_FAILED = 412

export interface ErrorData {
  message: string,
  code: string,
  httpStatus: number
}

export const errorsCatalogs = {
  ADDRESS_NOT_FOUND: {
    message: 'Direccion no encontrada',
    code: 'ADDRESS_NOT_FOUND',
    httpStatus: NOT_FOUND
  },
  CATEGORY_NOT_FOUND: {
    message: 'Categoría no encontrada',
    code: 'CATEGORY_NOT_FOUND',
    httpStatus: NOT_FOUND
  },
  CITY_NOT_FOUND: {
    message: 'Ciudad no encontrada',
    code: 'CITY_NOT_FOUND',
    httpStatus: NOT_FOUND
  },
  PRODUCT_NOT_FOUND: {
    message: 'Producto no encontrado',
    code: 'PRODUCT_NOT_FOUND',
    httpStatus: NOT_FOUND

  },
  EMAIL_OR_PASSWORD_INVALID: {
    message: 'Email o clave inválidos',
    code: 'EMAIL_OR_PASSWORD_INVALID',
    httpStatus: UNAUTHORIZED

  },
  LOG_NOT_FOUND: {
    message: 'Log no encontrado',
    code: 'LOG_NOT_FOUND',
    httpStatus: NOT_FOUND

  },
  ROLE_NOT_FOUND: {
    message: 'Rol no encontrado',
    code: 'ROLE_NOT_FOUND',
    httpStatus: NOT_FOUND

  },
  ROLE_NAME_ALREADY_TAKEN: {
    message: 'Ese nombre de rol ya esta en uso',
    code: 'ROLE_NAME_ALREADY_TAKEN',
    httpStatus: BAD_REQUEST
  },
  USER_NOT_FOUND: {
    message: 'Usuario no encontrado',
    code: 'USER_NOT_FOUND',
    httpStatus: NOT_FOUND

  },
  USER_EMAIL_NOT_FOUND: {
    message: 'Usuario con email no encontrado',
    code: 'USER_EMAIL_NOT_FOUND',
    httpStatus: NOT_FOUND

  },
  USER_EMAIL_TAKEN: {
    message: 'Ese email ya se encuentra en uso',
    code: 'USER_EMAIL_TAKEN',
    httpStatus: BAD_REQUEST
  },
  STORE_NOT_FOUND: {
    message: 'Store was not found',
    code: 'Tienda no encontrada',
    httpStatus: NOT_FOUND

  },
  ORDER_NOT_FOUND: {
    message: 'Order was not found',
    code: 'Orden no encontrada',
    httpStatus: NOT_FOUND

  },
  EMAIL_NOT_VERIFIED: {
    message: 'Email not verified',
    code: 'Email no verificado',
    httpStatus: UNAUTHORIZED
  },
  EMAIL_AND_PHONE_NOT_VERIFIED: {
    message: 'Email and phone not verified',
    code: 'EMAIL_AND_PHONE_NOT_VERIFIED',
    httpStatus: UNAUTHORIZED
  },
  PHONE_NOT_VERIFIED: {
    message: 'Número de telefono no verificado',
    code: 'PHONE_NOT_VERIFIED',
    httpStatus: UNAUTHORIZED
  },
  NOT_AUTHENTICATED: {
    message: 'Usuario no ha iniciado sesion',
    code: 'NOT_AUTHENTICATED',
    httpStatus: UNAUTHORIZED
  },
  ONGOING_ORDERS_LIMIT_REACHED: {
    message: 'Solo puedes tener hasta 4 órdenes pendientes de entrega',
    code: 'ONGOING_ORDERS_LIMIT_REACHED',
    httpStatus: PRECONDITION_FAILED
  },
  INVALID_OTP_CODE: {
    message: 'Código de verificación inválido',
    code: 'INVALID_OTP_CODE',
    httpStatus: UNAUTHORIZED
  },
  OTP_CODE_REQUEST_WITHIN_TIME_THRESHOLD: {
    message: 'Por favor espere unos minútos antes de volver a solicitar el código',
    code: 'OTP_CODE_REQUEST_WITHIN_TIME_THRESHOLD',
    httpStatus: PRECONDITION_FAILED
  },
  OTP_CODE_MAX_ATTEMPTS_REACHED: {
    message: 'Número maximo de intentos alcanzado, por favor solicita un codigo nuevo',
    code: 'OTP_CODE_MAX_ATTEMPTS_REACHED',
    httpStatus: PRECONDITION_FAILED
  },
  PHONE_ALREADY_TAKEN: {
    message: 'Ese número ya se encuentra en uso.',
    code: 'PHONE_ALREADY_TAKEN',
    httpStatus: PRECONDITION_FAILED
  },
  STORE_IS_CLOSED: {
    message: 'La tienda ya esta cerrada',
    code: 'STORE_IS_CLOSED',
    httpStatus: PRECONDITION_FAILED
  }
}
