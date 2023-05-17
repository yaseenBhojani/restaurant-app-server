import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  /**
   * Creates a new user.
   * @param username The username of the user.
   * @param email The email of the user.
   * @param password The password of the user.
   * @param role The role of the user.
   * @returns An object containing the ID of the created user.
   * @throws A ConflictException if a user with the provided email already exists.
   * @throws An error if there was a problem creating the user.
   */
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

  /**
   * Finds a user by their email.
   * @param email The email of the user.
   * @returns The found user or undefined if not found.
   * @throws An error if there was a problem finding the user by email.
   */
  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      return user;
    } catch (error) {
      throw new Error('Error finding user by email');
    }
  }
}
