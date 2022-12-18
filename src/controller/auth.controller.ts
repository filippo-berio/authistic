import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticateRequest } from '../dto/request/auth/authenticate.request';
import { AuthenticateUseCase } from '../use-case/auth/authenticate.use-case';
import { LoggerInterceptor } from '../middleware/interceptors/logger.interceptor';
import { AppKeyGuard } from '../middleware/guard/app-key.guard';

@Controller('authenticate')
export class AuthController {
    constructor(
        private authenticateUseCase: AuthenticateUseCase,
    ) {
    }

    @UseGuards(AppKeyGuard)
    @UseInterceptors(LoggerInterceptor)
    @Post()
    async authenticate(
        @Body() body: AuthenticateRequest
    ) {
        return await this.authenticateUseCase.handle(body.accessToken, body.refreshToken);
    }
}
