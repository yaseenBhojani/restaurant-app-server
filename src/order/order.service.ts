import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateOrderDto } from '../dto/createOrderDto';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const createdOrder = new this.orderModel(createOrderDto);
      return createdOrder.save();
    } catch (error) {
      throw new Error(`Failed to create order. Error: ${error.message}`);
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      return this.orderModel.find().exec();
    } catch (error) {
      throw new Error(`Failed to get all orders. Error: ${error.message}`);
    }
  }

  async getOrdersByUserEmail(email: string): Promise<Order[]> {
    try {
      return this.orderModel.find({ email }).exec();
    } catch (error) {
      throw new Error(
        `Failed to get orders by user email. Error: ${error.message}`,
      );
    }
  }

  async getOrderById(orderId: string): Promise<Order> {
    try {
      return this.orderModel.findById(orderId).exec();
    } catch (error) {
      throw new Error(`Failed to get order by id. Error: ${error.message}`);
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    try {
      return this.orderModel
        .findByIdAndUpdate(orderId, { status }, { new: true })
        .exec();
    } catch (error) {
      throw new Error(`Failed to update order status. Error: ${error.message}`);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return this.orderModel.findByIdAndRemove(id).exec();
    } catch (error) {
      throw new Error(`Failed to delete order. Error: ${error.message}`);
    }
  }
}
