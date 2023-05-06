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

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException();
      }

      const accessToken = authHeader.slice(7);

      const accessPayload = await this.jwtService.verifyAsync(accessToken, {
        secret: JWT_SECRET,
      });

      request.user = accessPayload;

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
          const refreshPayload = await this.jwtService.verifyAsync(
            refreshToken,
            {
              secret: JWT_SECRET,
            },
          );

          const newAccessToken = await this.jwtService.signAsync(
            { email: refreshPayload.email, role: refreshPayload.role },
            {
              secret: JWT_SECRET,
            },
          );

          request.user = refreshPayload;

          const authHeader = `Bearer ${newAccessToken}`;
          const refreshHeader = `Bearer ${refreshToken}`;

          context
            .switchToHttp()
            .getResponse()
            .setHeader('Authorization', authHeader);
          context
            .switchToHttp()
            .getResponse()
            .setHeader('X-Refresh-Token', refreshHeader);

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
