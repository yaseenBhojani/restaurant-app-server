import { Response } from 'express';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from '../dto/loginDto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login endpoint
  @HttpCode(HttpStatus.OK)
  @Post()
  async login(@Body() loginData: LoginDto, @Res() res: Response) {
    try {
      const { email, password } = loginData;
      const { tokens, userCred } = await this.authService.login(
        email,
        password,
      );

      // Set authorization and refresh token headers
      res.setHeader('Authorization', `Bearer ${tokens.accessToken}`);
      res.setHeader('X-Refresh-Token', `Bearer ${tokens.refreshToken}`);

      // Return tokens and user credentials in the response
      res.json({ ...tokens, userCred }).end();
    } catch (error) {
      console.error(error);

      // Return unauthorized status and error message
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' })
        .end();
    }
  }

  // Authentication check endpoint
  @Get()
  @UseGuards(AuthGuard)
  async isAuth(@Req() request) {
    return request.user;
  }
}
