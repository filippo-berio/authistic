import { Md5 } from 'ts-md5';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordEncoder {
    encode(value: string, salt: string): string {
        return Md5.hashStr(Md5.hashStr(value) + salt);
    }
}
