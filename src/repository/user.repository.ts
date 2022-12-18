import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserInterface } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { AppInterface } from '../entity/app.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
    }

    find(id: number): Promise<UserInterface> {
        return this.createQueryBuilder()
            .where('u.id = :id', {id})
            .getOne();
    }

    save(user: UserInterface): Promise<UserInterface> {
        return this.userRepository.save(user);
    }

    findByLogin(app: AppInterface, login: string): Promise<UserInterface> {
        return this.createQueryBuilder()
            .andWhere('a.id = :appId', {appId: app.getId()})
            .andWhere('u.login = :login', {login})
            .select('u')
            .getOne();
    }

    private createQueryBuilder() {
        return this.userRepository.createQueryBuilder('u')
            .innerJoinAndSelect('u.app', 'a');
    }
}
