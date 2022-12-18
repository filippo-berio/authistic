import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken, RefreshTokenInterface } from '../entity/refresh-token.entity';
import { Repository } from 'typeorm';
import { UserInterface } from '../entity/user.entity';

@Injectable()
export class RefreshTokenRepository {
    constructor(
        @InjectRepository(RefreshToken)
        private repository: Repository<RefreshToken>,
    ) {
    }

    async save(token: RefreshTokenInterface) {
        return this.repository.save(token);
    }

    async delete(token: RefreshTokenInterface) {
        return this.repository.remove([token as RefreshToken]);
    }

    async findByUser(user: UserInterface): Promise<RefreshTokenInterface> {
        return this.repository.createQueryBuilder('rt')
            .innerJoinAndSelect('rt.user', 'u')
            .where('u.id = :id', {id: user.getId()})
            .getOne();
    }
}
