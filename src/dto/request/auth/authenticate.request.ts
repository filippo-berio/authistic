import { IsNotEmpty } from 'class-validator';

export class AuthenticateRequest {
    @IsNotEmpty()
    accessToken: string;

    @IsNotEmpty()
    refreshToken: string;
}
