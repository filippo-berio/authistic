import { AppInterface } from '../entity/app.entity';
import { UserInterface } from '../entity/user.entity';

export interface RequestInterface {
    body: BodyInterface;
    headers: HeadersInterface;
    app: AppInterface;
    user: UserInterface;
}

interface HeadersInterface {
    authorization: string;
}

interface BodyInterface {
    login: string;
    password: string;
}
