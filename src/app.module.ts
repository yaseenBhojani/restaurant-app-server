import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { UsersModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://yaseenBhojani:InexYMEfqosok5Sk@cluster0.h68vx2x.mongodb.net/?retryWrites=true&w=majority',
    ),
    FoodModule,
    OrderModule,
  ],
})
export class AppModule {}
