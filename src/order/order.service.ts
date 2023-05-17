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

  /**
   * Creates a new order.
   * @param createOrderDto The data for creating an order.
   * @returns The created order.
   * @throws An error if there was a problem creating the order.
   */
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const createdOrder = new this.orderModel(createOrderDto);
      return createdOrder.save();
    } catch (error) {
      throw new Error(`Failed to create order. Error: ${error.message}`);
    }
  }

  /**
   * Retrieves all orders.
   * @returns An array of orders.
   * @throws An error if there was a problem retrieving the orders.
   */
  async getAllOrders(): Promise<Order[]> {
    try {
      return this.orderModel.find().exec();
    } catch (error) {
      throw new Error(`Failed to get all orders. Error: ${error.message}`);
    }
  }

  /**
   * Retrieves orders by user email.
   * @param email The email of the user.
   * @returns An array of orders belonging to the user.
   * @throws An error if there was a problem retrieving the orders.
   */
  async getOrdersByUserEmail(email: string): Promise<Order[]> {
    try {
      return this.orderModel.find({ email }).exec();
    } catch (error) {
      throw new Error(
        `Failed to get orders by user email. Error: ${error.message}`,
      );
    }
  }

  /**
   * Retrieves an order by its ID.
   * @param orderId The ID of the order.
   * @returns The found order.
   * @throws An error if the order with the specified ID was not found.
   */
  async getOrderById(orderId: string): Promise<Order> {
    try {
      const order = await this.orderModel.findById(orderId).exec();
      if (!order) {
        throw new Error(`Order with id ${orderId} not found`);
      }
      return order;
    } catch (error) {
      throw new Error(`Failed to get order by id. Error: ${error.message}`);
    }
  }

  /**
   * Updates the status of an order.
   * @param orderId The ID of the order.
   * @param status The new status of the order.
   * @returns The updated order.
   * @throws An error if the order with the specified ID was not found or if there was a problem updating its status.
   */
  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    try {
      const updatedOrder = await this.orderModel
        .findByIdAndUpdate(orderId, { status }, { new: true })
        .exec();
      if (!updatedOrder) {
        throw new Error(`Order with id ${orderId} not found`);
      }
      return updatedOrder;
    } catch (error) {
      throw new Error(`Failed to update order status. Error: ${error.message}`);
    }
  }

  /**
   * Deletes an order by its ID.
   * @param id The ID of the order.
   * @returns The deleted order.
   * @throws An error if the order with the specified ID was not found or if there was a problem deleting it.
   */
  async delete(id: string): Promise<any> {
    try {
      const deletedOrder = await this.orderModel.findByIdAndRemove(id).exec();
      if (!deletedOrder) {
        throw new Error(`Order with id ${id} not found`);
      }
      return deletedOrder;
    } catch (error) {
      throw new Error(`Failed to delete order. Error: ${error.message}`);
    }
  }
}
