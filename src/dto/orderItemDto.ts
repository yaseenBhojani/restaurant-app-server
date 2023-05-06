import { IsNotEmpty } from 'class-validator';

export type OrderItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  image: string;
};

export class OrderItemDto {
  @IsNotEmpty()
  foodItems: OrderItem[];
}
