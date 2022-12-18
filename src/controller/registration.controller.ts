import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { RegisterUserRequest } from '../dto/request/register/register-user.request';
import { RegisterUserUseCase } from '../use-case/register/register-user.use-case';
import { CurrentApp } from '../middleware/decorator/current-app.decorator';
import { AppKeyGuard } from '../middleware/guard/app-key.guard';
import { AppInterface } from '../entity/app.entity';
import { EncodePasswordInterceptor } from '../middleware/interceptors/encode-password.interceptor';
import { LoggerInterceptor } from '../middleware/interceptors/logger.interceptor';
import { ConfirmUserRequest } from '../dto/request/register/confirm-user.request';
import { ConfirmUserUseCase } from '../use-case/register/confirm-user.use-case';

@Controller('register')
export class RegistrationController {
    constructor(
        private registerUserUseCase: RegisterUserUseCase,
        private confirmUserUseCase: ConfirmUserUseCase,
    ) {
    }

    @Post()
    @UseGuards(AppKeyGuard)
    @UseInterceptors(EncodePasswordInterceptor, LoggerInterceptor)
    async register(
        @Body() body: RegisterUserRequest,
        @CurrentApp() app: AppInterface,
    ) {
        await this.registerUserUseCase.handle(app, body.login, body.password);
        return {
            success: true
        }
    }

    @Post('confirm')
    @UseInterceptors(LoggerInterceptor)
    async confirm(
        @Body() body: ConfirmUserRequest,
    ) {
        await this.confirmUserUseCase.handle(body.token);
        return {
            success: true
        }
    }
}
