import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/createOrderDto';
import { UpdateOrderDto } from 'src/dto/updateOrderDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  findOne(@Param('id') orderId: string) {
    return this.orderService.getOrderById(orderId);
  }

  @Get('user/email')
  @UseGuards(AuthGuard)
  async findByUserEmail(@Req() request) {
    const orders = await this.orderService.getOrdersByUserEmail(
      request.user.email,
    );
    return orders;
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  updateStatus(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrderStatus(orderId, updateOrderDto.status);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  delete(@Param('id') orderId: string) {
    return this.orderService.delete(orderId);
  }
}
