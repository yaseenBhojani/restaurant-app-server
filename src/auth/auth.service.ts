import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Login function that takes email and password as arguments and returns tokens and user credentials
  async login(email: string, password: string): Promise<any> {
    try {
      // Find user by email
      const user = await this.usersService.findByEmail(email);

      // Throw UnauthorizedException if user is not found
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Check if the password is valid
      const isPasswordValid = await bcrypt.compare(password, user.password);

      // Throw UnauthorizedException if password is invalid
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      // Generate access and refresh tokens
      const tokens = this.generateTokens(email, user.role);

      // Return the tokens and user credentials
      const userCred = {
        username: user.username,
        email: user.email,
        role: user.role,
      };

      return { tokens, userCred };
    } catch (error) {
      // Log error to console and throw an UnauthorizedException with a generic message
      console.error(error);
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    }
  }

  // Function that generates access and refresh tokens
  generateTokens(
    email: string,
    role: string,
  ): { accessToken: string; refreshToken: string } {
    try {
      // Create the access token
      const accessToken = this.jwtService.sign(
        { email, role },
        { expiresIn: '1d' },
      );

      // Create the refresh token
      const refreshToken = this.jwtService.sign(
        { email, role },
        { expiresIn: '7d' },
      );

      return { accessToken, refreshToken };
    } catch (error) {
      // Log error to console and throw an UnauthorizedException with a generic message
      console.error(error);
      throw new UnauthorizedException('Error generating tokens');
    }
  }

  // Function that extracts access and refresh tokens from the request headers
  extractTokensFromHeaders(request: Request): [string?, string?] {
    try {
      // Get the authorization header from the request headers
      const authHeader = request.headers.authorization;

      // If the authorization header is not present or does not start with 'Bearer', return undefined tokens
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return [undefined, undefined];
      }

      // Extract the access and refresh tokens from the authorization header
      const authTokens = authHeader.slice(7);
      const [accessToken, refreshToken] = authTokens.split(',');

      return [accessToken, refreshToken];
    } catch (error) {
      // Log error to console and throw an UnauthorizedException with a generic message
      console.error(error);
      throw new UnauthorizedException('Error extracting tokens');
    }
  }
}
