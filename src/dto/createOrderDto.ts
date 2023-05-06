import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { OrderItemDto } from './orderItemDto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  zipCode: number;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  cardName: string;

  @IsNotEmpty()
  @IsNumber()
  cardNumber: number;

  @IsNotEmpty()
  @IsString()
  cvv: string;

  items: OrderItemDto;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty()
  @IsEnum(['Pending', 'Accepted', 'Rejected'])
  status: string = 'Pending';
}
