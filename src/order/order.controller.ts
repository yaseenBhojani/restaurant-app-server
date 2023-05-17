import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/createOrderDto';
import { UpdateOrderDto } from '../dto/updateOrderDto';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderService.create(createOrderDto);
      return { order };
    } catch (error) {
      console.error('Failed to create order:', error);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  @Get()
  async findAll() {
    try {
      const orders = await this.orderService.getAllOrders();
      return { orders };
    } catch (error) {
      console.error('Failed to get all orders:', error);
      throw new InternalServerErrorException('Failed to get all orders');
    }
  }

  @Get(':id')
  async findOne(@Param('id') orderId: string) {
    try {
      const order = await this.orderService.getOrderById(orderId);
      return { order };
    } catch (error) {
      console.error(`Failed to get order by ID ${orderId}:`, error);
      throw new InternalServerErrorException('Failed to get order by ID');
    }
  }

  @Get('user/email')
  @UseGuards(AuthGuard)
  async findByUserEmail(@Req() request) {
    try {
      const orders = await this.orderService.getOrdersByUserEmail(
        request.user.email,
      );
      return { orders };
    } catch (error) {
      console.error('Failed to get orders by user email:', error);
      throw new InternalServerErrorException(
        'Failed to get orders by user email',
      );
    }
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard, RoleGuard)
  async updateStatus(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const order = await this.orderService.updateOrderStatus(
        orderId,
        updateOrderDto.status,
      );
      return { order };
    } catch (error) {
      console.error(`Failed to update order status for ID ${orderId}:`, error);
      throw new InternalServerErrorException('Failed to update order status');
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  async delete(@Param('id') orderId: string) {
    try {
      const order = await this.orderService.delete(orderId);
      return { order };
    } catch (error) {
      console.error(`Failed to delete order with ID ${orderId}:`, error);
      throw new InternalServerErrorException('Failed to delete order');
    }
  }
}
