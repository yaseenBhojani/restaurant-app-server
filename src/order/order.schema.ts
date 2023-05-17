import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderItem } from 'src/dto/orderItemDto';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  cardName: string;

  @Prop({ required: true })
  cardNumber: string;

  @Prop({ required: true })
  cvv: string;

  @Prop({ required: true })
  items: OrderItem[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Accepted', 'Rejected'],
  })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
