import {
  IsEmail,
  IsOptional,
  Length
} from 'class-validator'

export class UpdateMyProfileDto {
  @Length(2, 30, { message: 'El nombre debe poseer entre 2 y 30 caracteres' })
  fullName: string

  @IsOptional()
  @IsEmail(undefined, { message: 'Ingrese un email válido.' })
  email: string
}
