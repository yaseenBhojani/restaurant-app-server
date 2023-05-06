import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Order, OrderSchema } from './order.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/shared/constants';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/user/user.service';
import { UsersModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, AuthService, UsersService],
})
export class OrderModule {}
