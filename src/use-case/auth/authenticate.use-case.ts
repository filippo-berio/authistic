import { ForbiddenException, Injectable } from '@nestjs/common';
import { RedisService } from '../../service/redis.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../repository/user.repository';
import { AccessTokenService } from '../../service/access-token.service';
import { TokenPairInterface } from '../../contract/token-pair.interface';
import { UseCaseInterface } from '../use-case.interface';

@Injectable()
export class AuthenticateUseCase implements UseCaseInterface {
    constructor(
        private redis: RedisService,
        private jwt: JwtService,
        private userRepository: UserRepository,
        private tokenService: AccessTokenService,
    ) {
    }

    async handle(accessToken: string, refreshToken: string): Promise<TokenPairInterface> {
        const user = await this.getUser(accessToken);

        if (!user.isConfirmed()) {
            throw new ForbiddenException('User is not confirmed');
        }

        const actualToken = await this.redis.getAccessToken(user.getApp().getId(), user.getId());
        const actualRefreshToken = await this.tokenService.getOrCreateRefreshToken(user);

        if (actualToken) {
            if (accessToken !== actualToken) {
                throw new ForbiddenException('Unexpected access token');
            }

            return {
                accessToken,
                refreshToken: actualRefreshToken.getToken()
            }
        }

        if (actualRefreshToken && actualRefreshToken.getToken() !== refreshToken) {
            throw new ForbiddenException('Unexpected refresh token');
        }

        const tokens = await this.tokenService.refreshAccessToken(user, actualRefreshToken);
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        }
    }

    private async getUser(accessToken: string) {
        const payload = this.jwt.decode(accessToken);
        if (!payload) {
            throw new ForbiddenException('Incorrect JWT');
        }

        const userId = parseInt(payload['userId']);
        return this.userRepository.find(userId);
    }
}
