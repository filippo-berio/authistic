import { Injectable } from '@nestjs/common';
import { UserInterface } from '../entity/user.entity';
import { UidGenerator } from './uid.generator';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import { RefreshToken, RefreshTokenInterface } from '../entity/refresh-token.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenPairInterface } from '../contract/token-pair.interface';

@Injectable()
export class AccessTokenService {
    constructor(
        private uidGenerator: UidGenerator,
        private refreshTokenRepository: RefreshTokenRepository,
        private jwtService: JwtService,
    ) {
    }

    async refreshAccessToken(user: UserInterface, refreshToken: RefreshTokenInterface): Promise<TokenPairInterface> {
        await this.refreshTokenRepository.delete(refreshToken);
        const accessToken = this.createAccessToken(user);
        const newRefreshToken = await this.createRefreshToken(user);
        return {
            accessToken,
            refreshToken: newRefreshToken.getToken()
        };
    }

    createAccessToken(user: UserInterface) {
        return this.jwtService.sign({
            userId: user.getId()
        });
    }

    async getOrCreateRefreshToken(user: UserInterface) {
        let refreshToken = await this.refreshTokenRepository.findByUser(user);
        refreshToken = refreshToken || await this.createRefreshToken(user);
        return refreshToken;
    }

    private async createRefreshToken(user: UserInterface) {
        const uid = this.uidGenerator.generateFull();
        const token = new RefreshToken(user, uid);
        return this.refreshTokenRepository.save(token);
    }
}
