import { EventInterface } from '../event.interface';

export class LoginEvent implements EventInterface {
    static EVENT = 'user.login';

    constructor(
        public userId: number,
        public newAccessToken: string,
    ) {
    }

    getEvent(): string {
        return LoginEvent.EVENT;
    }
}
