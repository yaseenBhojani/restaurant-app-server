import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { Order, OrderSchema } from './order.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/user/user.service';
import { UsersModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/user.schema';
import { JWT_SECRET } from 'src/shared/constants';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: JWT_SECRET,
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, AuthService, UsersService],
})
export class OrderModule {}
