import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App, AppInterface } from '../entity/app.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppRepository {
    constructor(
        @InjectRepository(App)
        private репозиторий: Repository<App>
    ) {
    }

    сохранить(приложение: App): Promise<AppInterface> {
        return this.репозиторий.save(приложение);
    }

    найтиПоНазванию(название: string): Promise<AppInterface> {
        return this.репозиторий.findOneBy({
            title: название
        });
    }

    найтиПоКлючу(ключ: string): Promise<AppInterface> {
        return this.репозиторий.findOneBy({
            apiKey: ключ
        });
    }
}
