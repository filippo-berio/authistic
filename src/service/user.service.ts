import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { AppInterface } from '../entity/app.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository
    ) {
    }

    async create(app: AppInterface, login: string, password: string) {
        let existing = await this.userRepository.findByLogin(app, login);
        if (existing) {
            throw new ForbiddenException('Пользователь уже существует');
        }
        return this.userRepository.save(new User(app, login, password));
    }
}
