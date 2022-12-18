import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../../service/user.service';
import { UserRepository } from '../../repository/user.repository';
import { RedisService } from '../../service/redis.service';
import { ConfirmUserEvent } from '../../event/user/confirm-user.event';
import { EventEmitter } from '../../service/event.emitter';
import { UseCaseInterface } from '../use-case.interface';

@Injectable()
export class ConfirmUserUseCase implements UseCaseInterface {
    constructor(
        private userService: UserService,
        private userRepository: UserRepository,
        private redisService: RedisService,
        private eventEmitter: EventEmitter,
    ) {
    }

    async handle(token: string) {
        const user = await this.findByConfirmationToken(token);
        if (user.isConfirmed()) {
            throw new ForbiddenException('User is confirmed');
        }

        this.eventEmitter.emit(
            new ConfirmUserEvent(
                user.getId()
            )
        );
    }

    private async findByConfirmationToken(token: string) {
        const userId = await this.redisService.getUserIdByConfirmationToken(token);
        return await this.userRepository.find(parseInt(userId));
    }
}
