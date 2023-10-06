import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsUUID,
} from 'class-validator'

export class CreateExpenseDto {
  @IsNumber()
  @IsNotEmpty()
  cost: number

  @IsDateString()
  @IsNotEmpty()
  date: Date

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  @IsUUID()
  apartmentId: string
}

export class UpdateExpenseDto {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsOptional()
  @IsNumber()
  cost: number

  @IsOptional()
  @IsDateString()
  date?: Date

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsUUID()
  apartmentId?: string
}
