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

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const accessToken = authHeader.slice(7);

    try {
      const { role } = await this.jwtService.verifyAsync(accessToken, {
        secret: JWT_SECRET,
      });

      if (role === 'ADMIN') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
