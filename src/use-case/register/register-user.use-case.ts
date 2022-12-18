import { Injectable } from '@nestjs/common';
import { UserService } from '../../service/user.service';
import { AppInterface } from '../../entity/app.entity';
import { UserConfirmationSender } from '../../service/user-confirmation.sender';
import { UseCaseInterface } from '../use-case.interface';

@Injectable()
export class RegisterUserUseCase implements UseCaseInterface {
    constructor(
        private userService: UserService,
        private confirmationSender: UserConfirmationSender,
    ) {
    }

    async handle(app: AppInterface, login: string, password: string) {
        const user = await this.userService.create(app, login, password);
        this.confirmationSender.sendConfirm(user)
        return user;
    }
}
