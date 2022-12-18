import { Injectable, Logger } from '@nestjs/common';
import { UserInterface } from '../entity/user.entity';
import { UidGenerator } from './uid.generator';
import { RedisService } from './redis.service';

@Injectable()
export class UserConfirmationSender {
    constructor(
        private logger: Logger,
        private uidGenerator: UidGenerator,
        private redis: RedisService
    ) {
    }

    sendConfirm(user: UserInterface) {
        const token = this.uidGenerator.generateFull();
        this.logger.debug('CONFIRM TOKEN IS ' + token);
        this.redis.setConfirmationToken(token, user.getId());
    }
}
