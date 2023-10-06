export interface ICredentials {
  token: string
  user: User
}

export enum UserType {
  admin = 'admin',
  user = 'user'
}

export type UserTypes =
  | 'admin'
  | 'user'

export interface User {
  id: string
  email: string
}

export interface CarAttributes {
  'Rodado': string | null
  'Tapizado': string | null
  'Aire acondicionado': boolean,
  'Calefaccion auxiliar': boolean,
  'Techo panoramico': boolean,
  'Velocidad crucero': boolean,
  'Bluetooth': boolean,
  'GPS': boolean,
  'Sensores de estacionamiento': boolean,
  'ABS': boolean,
  'Airbags': boolean,
  'Cierre centralizado': boolean,
  'Cobertor de caja': boolean,
  'Direccion asistida': boolean,
  'Inmovilizador': boolean,
  'Camara trasera': boolean,
  'Control de estabilidad': boolean,
  'Baranda antivuelco': boolean,
  'Caja de herramientas': boolean,
  'Estribos': boolean,
  'Espejo lateral electrico': boolean,
  'Llantas de aleacion': boolean,
  'Paquete deportivo': boolean,
  'Suspension deportiva': boolean,
}

export interface Image {
  id: string
  key: string
  order: number
  url: string
  date: Date
}

export interface AgencyCar {
  id: string
  make: string
  model: string
  color: string
  year: number
  price: number
  currency: string
  condition: string
  fuel?: string
  transmision?: string
  attributes: CarAttributes
  km?: number
  images: Image[]
  videoUrl?: string
}

export const defaultCarAttributes: CarAttributes = {
  Rodado: '',
  Tapizado: '',
  'Aire acondicionado': false,
  'Calefaccion auxiliar': false,
  'Techo panoramico': false,
  'Velocidad crucero': false,
  Bluetooth: false,
  GPS: false,
  'Sensores de estacionamiento': false,
  ABS: false,
  Airbags: false,
  'Cierre centralizado': false,
  'Cobertor de caja': false,
  'Direccion asistida': false,
  Inmovilizador: false,
  'Camara trasera': false,
  'Control de estabilidad': false,
  'Baranda antivuelco': false,
  'Caja de herramientas': false,
  Estribos: false,
  'Espejo lateral electrico': false,
  'Llantas de aleacion': false,
  'Paquete deportivo': false,
  'Suspension deportiva': false,
}

export interface AgencyCarImagesMap {
  'image-1'?: Image,
  'image-2'?: Image,
  'image-3'?: Image,
  'image-4'?: Image,
  'image-5'?: Image,
}

export interface Apartments {
  id: string
  city: string
  fullAddress: string
}

export interface ApartmentsRent {
  id: string
  cost: number
  startedAt: Date
  endedAt: Date
  city: string
  fullAddress: string
  clientId: string
}

export interface Expenses {
  id:string
  cost: number
  date: Date
  description: string
  apartment: Apartments
}
