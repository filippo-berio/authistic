import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppRepository } from '../../repository/app.repository';
import { RequestInterface } from '../request.interface';

@Injectable()
export class AppKeyGuard implements CanActivate {
    constructor(
        private appRepository: AppRepository
    ) {
    }

    async canActivate(context: ExecutionContext) {
        const request: RequestInterface = context.switchToHttp().getRequest();
        const bearer: string = request.headers['Authorization'] || request.headers['authorization'];
        if (!bearer || !bearer.startsWith('Bearer ')) {
            return false;
        }
        const key = bearer.split(' ').pop();
        const app = await this.appRepository.найтиПоКлючу(key);
        request.app = app;
        return !!app;
    }
}
