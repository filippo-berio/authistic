import { Command, CommandRunner } from 'nest-commander';
import { AppService } from '../../service/app.service';
import { exit } from '@nestjs/cli/actions';

@Command({
    name: 'create-app'
})
export class CreateAppCommand extends CommandRunner {
    constructor(
        private appService: AppService
    ) {
        super();
    }

    async run(passedParam: string[], options) {
        let title = passedParam[0];
        let app = await this.appService.create(title);
        console.log('Created ', app);
        exit();
    }
}
