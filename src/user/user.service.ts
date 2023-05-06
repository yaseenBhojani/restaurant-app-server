import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(
    username: string,
    email: string,
    password: string,
    role: string,
  ): Promise<{ id: string }> {
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with that email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      role,
    });

    try {
      const createdUser = await newUser.save();
      return { id: createdUser.id };
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      return user;
    } catch (error) {
      throw new Error('Error finding user by email');
    }
  }
}
