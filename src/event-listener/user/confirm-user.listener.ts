import { Injectable } from '@nestjs/common';
import { ConfirmUserEvent } from '../../event/user/confirm-user.event';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRepository } from '../../repository/user.repository';
import { AccessTokenService } from '../../service/access-token.service';

@Injectable()
export class ConfirmUserListener {
    constructor(
        private userRepository: UserRepository,
        private refreshTokenService: AccessTokenService,
    ) {
    }

    @OnEvent(ConfirmUserEvent.EVENT, {
        async: true
    })
    async handleConfirmUser(event: ConfirmUserEvent) {
        const user = await this.userRepository.find(event.userId);
        await this.refreshTokenService.getOrCreateRefreshToken(user);
        user.confirm();
        await this.userRepository.save(user);
    }
}
