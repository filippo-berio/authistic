import { Injectable } from '@nestjs/common';
import { RedisService } from '../../service/redis.service';
import { OnEvent } from '@nestjs/event-emitter';
import { LoginEvent } from '../../event/user/login.event';
import { UserRepository } from '../../repository/user.repository';

@Injectable()
export class LoginListener {
    constructor(
        private redis: RedisService,
        private userRepository: UserRepository,
    ) {
    }

    @OnEvent(LoginEvent.EVENT, {
        async: true
    })
    async onLogin(event: LoginEvent) {
        const user = await this.userRepository.find(event.userId);
        this.redis.setAccessToken(event.newAccessToken, user.getApp().getId(), user.getId());
    }
}
