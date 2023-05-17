import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JWT_SECRET } from '../shared/constants';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;

      // Check if Authorization header is present and starts with 'Bearer '
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException();
      }

      const accessToken = authHeader.slice(7); // Extract token from the header

      // Verify and decode the access token
      const accessPayload = await this.jwtService.verifyAsync(accessToken, {
        secret: JWT_SECRET,
      });

      request.user = accessPayload; // Attach user payload to the request

      return true;
    } catch (error) {
      console.error(error);

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      const request = context.switchToHttp().getRequest();
      const refreshToken = request.headers['x-refresh-token'];

      if (refreshToken) {
        try {
          // Verify and decode the refresh token
          const refreshPayload = await this.jwtService.verifyAsync(
            refreshToken,
            {
              secret: JWT_SECRET,
            },
          );

          // Generate a new access token using the refresh token payload
          const newAccessToken = await this.jwtService.signAsync(
            { email: refreshPayload.email, role: refreshPayload.role },
            {
              secret: JWT_SECRET,
            },
          );

          request.user = refreshPayload; // Attach refresh payload to the request

          const authHeader = `Bearer ${newAccessToken}`;
          const refreshHeader = `Bearer ${refreshToken}`;

          const response = context.switchToHttp().getResponse();
          response.setHeader('Authorization', authHeader); // Set new access token in the response header
          response.setHeader('X-Refresh-Token', refreshHeader); // Set refresh token in the response header

          return true;
        } catch (error) {
          console.error(error);

          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    }
  }
}
