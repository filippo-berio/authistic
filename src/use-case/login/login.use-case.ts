import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AppInterface } from '../../entity/app.entity';
import { UserRepository } from '../../repository/user.repository';
import { UserInterface } from '../../entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter } from '../../service/event.emitter';
import { LoginEvent } from '../../event/user/login.event';
import { AccessTokenService } from '../../service/access-token.service';
import { TokenPairInterface } from '../../contract/token-pair.interface';
import { UseCaseInterface } from '../use-case.interface';

@Injectable()
export class LoginUseCase implements UseCaseInterface {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private refreshTokenService: AccessTokenService,
        private eventEmitter: EventEmitter,
        private tokenService: AccessTokenService,
    ) {
    }

    async handle(app: AppInterface, login: string, password: string): Promise<TokenPairInterface> {
        const user = await this.userRepository.findByLogin(app, login);
        this.validateUser(user, password);

        const accessToken = this.tokenService.createAccessToken(user);
        const refreshToken = await this.refreshTokenService.getOrCreateRefreshToken(user);

        this.eventEmitter.emit(new LoginEvent(user.getId(), accessToken));

        return {
            accessToken,
            refreshToken: refreshToken.getToken(),
        }
    }

    private validateUser(user: UserInterface|null, inputPassword: string) {
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.getPassword() !== inputPassword) {
            throw new ForbiddenException('Wrong password');
        }

        if (!user.isConfirmed()) {
            throw new ForbiddenException('User is not confirmed');
        }
    }
}
