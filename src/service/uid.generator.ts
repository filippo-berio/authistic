import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UidGenerator {
    generateFull(): string {
        return randomUUID();
    }

    generateShort(len = 12): string {
        return this.generateFull().split('-').pop().slice(0, len - 1);
    }
}
