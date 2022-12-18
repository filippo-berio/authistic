import { EventInterface } from '../event.interface';

export class ConfirmUserEvent implements EventInterface {
    static EVENT = 'user.confirm';

    constructor(
        public userId: number,
    ) {
    }

    getEvent(): string {
        return ConfirmUserEvent.EVENT;
    }
}
