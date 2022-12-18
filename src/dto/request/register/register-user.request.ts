import { IsNotEmpty } from 'class-validator';

export class RegisterUserRequest {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;
}
