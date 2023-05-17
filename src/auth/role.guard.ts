import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JWT_SECRET } from 'src/shared/constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Check if Authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const accessToken = authHeader.slice(7); // Extract token from the header

    try {
      const { role } = await this.jwtService.verifyAsync(accessToken, {
        secret: JWT_SECRET,
      });

      if (role === 'ADMIN') {
        return true; // Allow access if the user has the 'ADMIN' role
      } else {
        return false; // Deny access if the user does not have the 'ADMIN' role
      }
    } catch (error) {
      throw new UnauthorizedException(); // Throw an exception if there's an error or the token is invalid
    }
  }
}
