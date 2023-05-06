import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateFoodDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly price?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly image?: string;
}
