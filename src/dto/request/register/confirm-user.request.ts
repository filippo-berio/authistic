import { IsNotEmpty } from 'class-validator';

export class ConfirmUserRequest {
    @IsNotEmpty()
    token: string;
}
