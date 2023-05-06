import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(['ADMIN', 'USER'])
  role: string;
}

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}

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

class OrderItemDto {
  @IsNotEmpty()
  foodId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty()
  @IsEnum(['Pending', 'Accepted', 'Rejected'])
  status: string = 'Pending';
}
