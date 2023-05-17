import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateUserDto } from '../dto/createUserDto';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Creates a new user.
   * @param createUserData The data for creating a user.
   * @returns The ID of the created user.
   */
  @HttpCode(HttpStatus.OK)
  @Post()
  async createUser(
    @Body() createUserData: CreateUserDto,
  ): Promise<{ id: string }> {
    try {
      const { username, email, password, role } = createUserData;
      return await this.userService.createUser(username, email, password, role);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
