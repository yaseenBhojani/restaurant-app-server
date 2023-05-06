import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { CreateUserDto } from '../dto/createUserDto';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private authService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  createUser(@Body() createUserData: CreateUserDto) {
    const { username, email, password, role } = createUserData;
    return this.authService.createUser(username, email, password, role);
  }
}
