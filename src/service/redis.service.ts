import { Injectable } from '@nestjs/common';
import { RedisService as NestjsRedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisService {
    constructor(
        private nestJsRedisService: NestjsRedisService
    ) {
    }

    setConfirmationToken(value: string, userId: number) {
        this.getClient().set('confirm-token:' + value, userId, 'EX', 5 * 24 * 60 * 60);
    }

    getUserIdByConfirmationToken(token: string) {
        return this.getClient().getdel('confirm-token:' + token);
    }

    setAccessToken(value: string, appId: number, userId: number) {
        this.getClient().set(`access-token-${appId}-${userId}`, value, 'EX', 2 * 60 * 60);
    }

    getAccessToken(appId: number, userId: number) {
        return this.getClient().get(`access-token-${appId}-${userId}`);
    }

    private getClient() {
        return this.nestJsRedisService.getClient();
    }
}
