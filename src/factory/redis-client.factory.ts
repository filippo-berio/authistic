import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisClientFactory {
    constructor(
        @InjectRedis()
        private redis: number
    ) {
    }
    getClient() {

    }
}
