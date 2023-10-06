import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Max,
  MinLength,
  ValidateIf
} from 'class-validator'
import { CarAttributes } from '../types/types'

export class CreateAgencyCarDto {
  @IsString()
  @MinLength(1, { message: 'Ingrese una marca' })
  make: string

  @IsString()
  @MinLength(1, { message: 'Ingrese un modelo' })
  model: string

  @IsString()
  @MinLength(1, { message: 'Ingrese un color' })
  color: string

  @IsNumber()
  @IsInt({ message: 'Ingrese un año valido' })
  year: number

  @IsNumber()
  @IsInt({ message: 'Ingrese un precio valido' })
  @Max(2_147_483_640, { message: 'El precio no puede ser mayor a $2147483640' })
  price: number

  @IsOptional()
  @IsString()
  currency?: string

  @IsString()
  condition: string

  @IsOptional()
  @IsString()
  fuel: string

  @IsOptional()
  @IsString()
  transmision: string

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Max(9_999_999, { message: 'Los kms tienen que tener maximo 7 digitos' })
  km?: number

  @IsOptional()
  @ValidateIf((o) => o.videoUrl !== '')
  @IsUrl()
  videoUrl?: string

  @IsObject()
  attributes: CarAttributes
}

export class UpdateAgencyCarDto {
  @IsUUID()
  id: string

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Ingrese una marca' })
  make: string

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Ingrese un modelo' })
  model: string

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Ingrese un color' })
  color: string

  @IsOptional()
  @IsNumber()
  @IsInt({ message: 'Ingrese un año valido' })
  year: number

  @IsOptional()
  @IsNumber()
  @IsInt({ message: 'Ingrese un precio valido' })
  @Max(2_147_483_640, { message: 'El precio no puede ser mayor a $2147483640' })
  price: number

  @IsOptional()
  @IsString()
  currency?: string

  @IsOptional()
  @IsString()
  condition: string

  @IsOptional()
  @IsString()
  fuel: string

  @IsOptional()
  @IsString()
  transmision: string

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Max(9_999_999, { message: 'Los kms tienen que tener maximo 7 digitos' })
  km?: number

  @IsOptional()
  @ValidateIf((o) => o.videoUrl !== '')
  @IsUrl()
  videoUrl?: string

  @IsOptional()
  @IsObject()
  attributes: CarAttributes
}
