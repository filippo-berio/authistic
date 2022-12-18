import { ForbiddenException, Injectable } from '@nestjs/common';
import { App } from '../entity/app.entity';
import { AppRepository } from '../repository/app.repository';
import { UidGenerator } from './uid.generator';

@Injectable()
export class AppService {
    constructor(
        private appRepository: AppRepository,
        private uidGenerator: UidGenerator
    ) {
    }

    async create(title: string) {
        let existing = await this.appRepository.найтиПоНазванию(title);
        if (existing) {
            throw new ForbiddenException('Имя уже занято');
        }
        const uuid = this.uidGenerator.generateShort();
        let app = new App(title, uuid);
        return await this.appRepository.сохранить(app);
    }
}
