import { IsNotEmpty } from 'class-validator';

export class LoginRequest {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;
}
