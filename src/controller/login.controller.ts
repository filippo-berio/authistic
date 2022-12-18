import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { LoginUseCase } from '../use-case/login/login.use-case';
import { LoginRequest } from '../dto/request/login/login.request';
import { AppKeyGuard } from '../middleware/guard/app-key.guard';
import { EncodePasswordInterceptor } from '../middleware/interceptors/encode-password.interceptor';
import { LoggerInterceptor } from '../middleware/interceptors/logger.interceptor';
import { CurrentApp } from '../middleware/decorator/current-app.decorator';
import { AppInterface } from '../entity/app.entity';

@Controller('login')
export class LoginController {
    constructor(
        private loginUseCase: LoginUseCase
    ) {
    }

    @Post()
    @UseGuards(AppKeyGuard)
    @UseInterceptors(EncodePasswordInterceptor, LoggerInterceptor)
    async login(
        @CurrentApp() app: AppInterface,
        @Body() body: LoginRequest,
    ) {
        return this.loginUseCase.handle(app, body.login, body.password);
    }
}
