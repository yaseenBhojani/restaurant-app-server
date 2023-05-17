import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { UsersModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    // Import the required modules
    AuthModule,
    UsersModule,
    FoodModule,
    OrderModule,

    // Configure the MongooseModule with the MongoDB connection URI
    MongooseModule.forRoot(
      'mongodb+srv://yaseenBhojani:InexYMEfqosok5Sk@cluster0.h68vx2x.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
